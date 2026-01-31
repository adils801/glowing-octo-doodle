import { HistoryTable } from "@/components/history-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fuelEntries } from "@/lib/data";

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Entry History</CardTitle>
        <CardDescription>
          View, filter, and manage all past fuel entries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HistoryTable initialEntries={fuelEntries} />
      </CardContent>
    </Card>
  );
}
