"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getMonthlyRegistrations } from "@/services/account.service";
import { MonthlyRegistration } from "@/types/monthly-registration";
import { useEffect, useState } from "react";

export const description = "A line chart with dots";

const chartConfig = {
  registration: {
    label: "Registrations",
    color: "hsl(var(--chart))",
  },
} satisfies ChartConfig;

export const MonthlyRegistrationsChart = () => {
  const [monthlyRegistrations, setMonthlyRegistrations] = useState<MonthlyRegistration[]>([]);

  const fetchMonthlyRegistrations = async () => {
    const data = await getMonthlyRegistrations();
    if (data) {
      setMonthlyRegistrations(data);
    }
  };

  useEffect(() => {
    fetchMonthlyRegistrations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly user registrations</CardTitle>
        <CardDescription>Overview of user registrations over the last 12 months.</CardDescription>
      </CardHeader>
      {monthlyRegistrations && monthlyRegistrations.length >= 0 && (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={monthlyRegistrations}
              margin={{
                left: 15,
                right: 15,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="registration"
                type="natural"
                stroke="hsl(var(--chart))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart))",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};
