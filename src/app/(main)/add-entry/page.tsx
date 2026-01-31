import { AddEntryForm } from "@/components/add-entry-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddEntryPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Fuel Entry</CardTitle>
          <CardDescription>
            Fill in the details below to log a new fuel transaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddEntryForm />
        </CardContent>
      </Card>
    </div>
  );
}
