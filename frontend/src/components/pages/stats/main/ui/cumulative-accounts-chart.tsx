import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getMonthlyCumulativeRegistrations } from "@/services/AccountService";
import { Registration } from "@/types/utils/Registration";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Registrations",
  },
} satisfies ChartConfig;

export const CumulativeAccountsChart = () => {
  const [chartData, setChartData] = useState<Registration[]>([]);

  const fetchData = async () => {
    const data = await getMonthlyCumulativeRegistrations();
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
        <CardTitle>Cumulative user growth</CardTitle>
        <CardDescription>Shows the total number of users accumulated over the last 6 months.</CardDescription>
      </CardHeader>
      {chartData && chartData.length >= 0 && (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 16,
                right: 16,
                top: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="count"
                type="natural"
                stroke="hsl(var(--chart-line))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--chart-line))",
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
