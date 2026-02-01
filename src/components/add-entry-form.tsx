"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import { fuelPrices, fuelEntries, addFuelEntry, vehicles, drivers } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  date: z.date({ required_error: "A date is required." }),
  slipNumber: z.string().min(1, "Slip number is required."),
  vehicleNumber: z.string().min(1, "Vehicle is required."),
  driverName: z.string().min(1, "Driver is required."),
  fuelType: z.enum(["Petrol", "Diesel", "HOBC"], {
    required_error: "Fuel type is required.",
  }),
  quantity: z.coerce.number().min(0.1, "Quantity must be positive."),
  meterReading: z.coerce.number().min(1, "Meter reading is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function AddEntryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      slipNumber: "",
      vehicleNumber: "",
      driverName: "",
      quantity: 0,
      meterReading: 0,
    },
  });

  const watchQuantity = form.watch("quantity");
  const watchFuelType = form.watch("fuelType");
  const watchVehicleNumber = form.watch("vehicleNumber");
  const watchMeterReading = form.watch("meterReading");

  const pricePerLiter = React.useMemo(() => {
    return fuelPrices.find((f) => f.name === watchFuelType)?.price ?? 0;
  }, [watchFuelType]);

  const amount = React.useMemo(() => {
    return watchQuantity * pricePerLiter;
  }, [watchQuantity, pricePerLiter]);

  const { previousMeterReading, average } = React.useMemo(() => {
    const lastEntry = fuelEntries
      .filter((e) => e.vehicleNumber === watchVehicleNumber)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    const prevReading = lastEntry?.meterReading ?? 0;

    if (
      prevReading > 0 &&
      watchMeterReading > prevReading &&
      watchQuantity > 0
    ) {
      const avg = (watchMeterReading - prevReading) / watchQuantity;
      return { previousMeterReading: prevReading, average: avg };
    }
    return { previousMeterReading: prevReading, average: null };
  }, [watchVehicleNumber, watchMeterReading, watchQuantity]);

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    const newEntry = {
      date: values.date,
      slipNumber: values.slipNumber,
      vehicleNumber: values.vehicleNumber,
      driverName: values.driverName,
      fuelType: values.fuelType,
      pricePerLiter,
      quantity: values.quantity,
      amount,
      meterReading: values.meterReading,
      average,
    };

    // Simulate API call
    setTimeout(() => {
      addFuelEntry(newEntry);
      toast({
        title: "Entry Saved",
        description: "Your fuel entry has been successfully saved.",
      });
      setIsSubmitting(false);
      router.push("/history");
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slipNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slip No.</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., SN-12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.number}>
                        {vehicle.number} ({vehicle.model})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.name}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fuelPrices.map((fuel) => (
                      <SelectItem key={fuel.id} value={fuel.name}>
                        {fuel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (Liters)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Fuel Price (per Liter)</FormLabel>
              <Input
                readOnly
                value={`$${pricePerLiter.toFixed(2)}`}
                className="font-semibold"
              />
            </FormItem>
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <Input
                readOnly
                value={`$${amount.toFixed(2)}`}
                className="text-lg font-bold text-primary"
              />
              <FormDescription>Auto-calculated: Quantity × Price</FormDescription>
            </FormItem>
            <FormField
              control={form.control}
              name="meterReading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meter Reading (km)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                  {previousMeterReading > 0 && (
                    <FormDescription>
                      Previous reading: {previousMeterReading.toLocaleString()} km
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormItem>
            <FormLabel>Average (km/L)</FormLabel>
            <Input
              readOnly
              value={average ? average.toFixed(2) : "N/A"}
              className="font-semibold"
            />
            <FormDescription>
              Auto-calculated: (Current - Previous Reading) / Quantity
            </FormDescription>
          </FormItem>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Entry
        </Button>
      </form>
    </Form>
  );
}
