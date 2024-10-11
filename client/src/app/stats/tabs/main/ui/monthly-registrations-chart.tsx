"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Registration } from "@/types/registration.interface";
import { useEffect, useState } from "react";
import { getMonthlyRegistrations } from "../services/main.service";

const chartConfig = {
  count: {
    label: "Registrations",
    color: "hsl(var(--chart))",
  },
} satisfies ChartConfig;

export const MonthlyRegistrationsChart = () => {
  const [chartData, setChartData] = useState<Registration[]>([]);

  const fetchData = async () => {
    const data = await getMonthlyRegistrations();
    if (data) {
      setChartData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly user registrations</CardTitle>
        <CardDescription>Overview of user registrations over the last 6 months.</CardDescription>
      </CardHeader>
      {chartData && chartData.length >= 0 && (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 15,
                right: 15,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="count"
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
