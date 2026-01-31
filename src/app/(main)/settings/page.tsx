import { FuelPriceManager } from "@/components/fuel-price-manager";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage application settings and fuel prices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FuelPriceManager />
      </CardContent>
    </Card>
  );
}
