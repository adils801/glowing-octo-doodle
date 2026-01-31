"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { fuelPrices as initialFuelPrices, updateFuelPrice } from "@/lib/data";
import { Bot, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFuelPriceSuggestion } from "@/app/actions";
import type { FuelType, FuelPrice } from "@/lib/types";

export function FuelPriceManager() {
  const [fuelPrices, setFuelPrices] = React.useState<FuelPrice[]>(initialFuelPrices);
  const { toast } = useToast();

  const handlePriceChange = (id: string, newPrice: string) => {
    const priceValue = parseFloat(newPrice);
    if (!isNaN(priceValue)) {
      setFuelPrices(
        fuelPrices.map((fp) => (fp.id === id ? { ...fp, price: priceValue } : fp))
      );
    }
  };

  const handleSaveChanges = (fuelType: FuelType, newPrice: number) => {
    updateFuelPrice(fuelType, newPrice);
    toast({
      title: "Prices Saved",
      description: `Price for ${fuelType} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fuel Price Management</CardTitle>
          <CardDescription>
            Update fuel prices and get AI-powered suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fuelPrices.map((fuel) => (
            <div
              key={fuel.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{fuel.name}</p>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={fuel.price.toFixed(2)}
                    onChange={(e) => handlePriceChange(fuel.id, e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <AiSuggestionDialog fuelType={fuel.name} onApplySuggestion={(newPrice) => handlePriceChange(fuel.id, newPrice.toString())} />
                <Button onClick={() => handleSaveChanges(fuel.name, fuel.price)} className="w-full sm:w-auto">Save</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function AiSuggestionDialog({ fuelType, onApplySuggestion }: { fuelType: FuelType; onApplySuggestion: (price: number) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<{ suggestedPrice: number; reasoning: string } | null>(null);

  const historicalData = JSON.stringify(
    [
      { date: "2024-07-01", price: 275.5 },
      { date: "2024-07-08", price: 277.0 },
      { date: "2024-07-15", price: 279.79 },
    ],
    null,
    2
  );
  const marketData = JSON.stringify(
    {
      crudeOilPrice: 82.5,
      regionalDemand: "High",
      competitorPricing: 280.5,
    },
    null,
    2
  );

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await getFuelPriceSuggestion({
        fuelType,
        historicalData: historicalData,
        currentMarketData: marketData,
      });
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      // toast should be used from the main component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Suggestion
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>AI Fuel Price Suggestion</DialogTitle>
          <DialogDescription>
            Get a price suggestion for {fuelType} based on market data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="historical-data">Historical Data (JSON)</Label>
                <Textarea id="historical-data" defaultValue={historicalData} readOnly className="h-40 font-mono text-xs"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="market-data">Current Market Data (JSON)</Label>
                <Textarea id="market-data" defaultValue={marketData} readOnly className="h-40 font-mono text-xs"/>
            </div>
        </div>
        {suggestion && (
          <Card className="bg-primary/10 border-primary/50">
            <CardHeader className="flex-row gap-4 items-start pb-4">
                <div className="p-2 bg-primary/20 rounded-full">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <CardTitle>AI Suggestion</CardTitle>
                    <CardDescription className="text-foreground/80">
                        Based on the data provided.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">${suggestion.suggestedPrice.toFixed(2)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{suggestion.reasoning}</p>
            </CardContent>
            <CardFooter>
                <Button variant="default" onClick={() => { onApplySuggestion(suggestion.suggestedPrice); setIsOpen(false); }}>
                    Apply Suggestion
                </Button>
            </CardFooter>
          </Card>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleGetSuggestion} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            Generate Suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
