"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { vehicles as initialVehicles, addVehicle } from "@/lib/data";
import type { Vehicle } from "@/lib/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  number: z.string().min(1, "Vehicle number is required."),
  model: z.string().min(1, "Vehicle model is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function VehiclesManager() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = React.useState<Vehicle[]>(initialVehicles);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      model: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newVehicle = addVehicle(values);
      setVehicles((prev) => [newVehicle, ...prev]);
      toast({
        title: "Vehicle Added",
        description: `${values.number} has been added to your fleet.`,
      });
      form.reset();
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-4"
        >
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ABC-123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Toyota Corolla" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Vehicle
          </Button>
        </form>
      </Form>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Model</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    {vehicle.number}
                  </TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No vehicles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
