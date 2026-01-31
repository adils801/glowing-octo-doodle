"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Download, Loader2, Search, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { FuelEntry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface HistoryTableProps {
  initialEntries: FuelEntry[];
}

export function HistoryTable({ initialEntries }: HistoryTableProps) {
  const { toast } = useToast();
  const [entries, setEntries] = React.useState(initialEntries);
  const [vehicleFilter, setVehicleFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<DateRange | undefined>();
  const [isSyncing, setIsSyncing] = React.useState(false);

  const filteredEntries = React.useMemo(() => {
    return entries
      .filter((entry) =>
        entry.vehicleNumber
          .toLowerCase()
          .includes(vehicleFilter.toLowerCase())
      )
      .filter((entry) => {
        if (!dateFilter?.from) return true;
        const from = dateFilter.from;
        const to = dateFilter.to ?? from;
        const entryDate = entry.date;
        return entryDate >= from && entryDate <= to;
      });
  }, [entries, vehicleFilter, dateFilter]);

  const handleSyncToSheets = () => {
    setIsSyncing(true);
    toast({
      title: "Syncing to Google Sheets...",
      description: "This may take a moment.",
    });

    // In a real app, this would be a POST request to your Google Apps Script URL
    // const appsScriptUrl = "YOUR_GOOGLE_APPS_SCRIPT_URL";
    // fetch(appsScriptUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(filteredEntries),
    // })

    // Simulating the API call
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: "Sync Successful",
        description: `${filteredEntries.length} entries synced to Google Sheets.`,
      });
    }, 2000);
  };

  const clearFilters = () => {
    setVehicleFilter("");
    setDateFilter(undefined);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter by vehicle..."
              className="pl-8 sm:w-[300px]"
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full md:w-[300px] justify-start text-left font-normal",
                  !dateFilter && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter?.from ? (
                  dateFilter.to ? (
                    <>
                      {format(dateFilter.from, "LLL dd, y")} -{" "}
                      {format(dateFilter.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateFilter.from, "LLL dd, y")
                  )
                ) : (
                  <span>Filter by date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateFilter?.from}
                selected={dateFilter}
                onSelect={setDateFilter}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          {(vehicleFilter || dateFilter) && (
            <Button variant="ghost" onClick={clearFilters}>
              <XIcon className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
        <Button
          onClick={handleSyncToSheets}
          disabled={isSyncing}
          className="w-full md:w-auto"
        >
          {isSyncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Sync to Sheets
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Fuel Type</TableHead>
              <TableHead className="text-right">Qty (L)</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Avg (km/L)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {format(entry.date, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {entry.vehicleNumber}
                  </TableCell>
                  <TableCell>{entry.driverName}</TableCell>
                  <TableCell>{entry.fuelType}</TableCell>
                  <TableCell className="text-right">
                    {entry.quantity.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${entry.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {entry.average ? entry.average.toFixed(2) : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
