import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehiclesManager } from "@/components/vehicles-manager";
import { DriversManager } from "@/components/drivers-manager";

export default function DatabasePage() {
  return (
    <Tabs defaultValue="vehicles" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="drivers">Drivers</TabsTrigger>
      </TabsList>
      <TabsContent value="vehicles">
        <Card>
          <CardHeader>
            <CardTitle>Manage Vehicles</CardTitle>
            <CardDescription>
              Add, view, and manage your fleet of vehicles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VehiclesManager />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="drivers">
        <Card>
          <CardHeader>
            <CardTitle>Manage Drivers</CardTitle>
            <CardDescription>
              Add, view, and manage your drivers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DriversManager />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
