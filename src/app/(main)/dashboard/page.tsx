"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { fuelEntries } from "@/lib/data"
import { Fuel, Droplets, Gauge } from "lucide-react"

export default function DashboardPage() {
  const totalCost = fuelEntries.reduce((sum, entry) => sum + entry.amount, 0)
  const totalLiters = fuelEntries.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  )
  const validAverages = fuelEntries.filter(entry => entry.average !== null && entry.average > 0);
  const overallAverage = validAverages.length > 0
    ? validAverages.reduce((sum, entry) => sum + entry.average!, 0) / validAverages.length
    : 0

  const chartData = fuelEntries
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(-7)
    .map(entry => ({
      name: entry.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      Liters: entry.quantity,
    }))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fuel Cost</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Total expenditure on fuel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fuel Volume</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalLiters.toLocaleString()} L
            </div>
            <p className="text-xs text-muted-foreground">
              Total volume of fuel consumed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overallAverage.toFixed(2)} km/L
            </div>
            <p className="text-xs text-muted-foreground">
              Average fuel efficiency across all vehicles
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Fuel Consumption</CardTitle>
            <CardDescription>
              A look at fuel quantity from the last 7 entries.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => `${value} L`}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar
                  dataKey="Liters"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
