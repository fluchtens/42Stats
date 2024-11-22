import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getCampusAccountCounts } from "@/services/AccountService";
import { CampusAccountCountDTO } from "@/types/utils/CampusAccountCountDTO";
import { useEffect, useState } from "react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

const colorPalette = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const chartConfig = {
  count: {
    label: "Accounts",
  },
} satisfies ChartConfig;

export const CampusAccountCountsChart = () => {
  const [chartData, setChartData] = useState<CampusAccountCountDTO[]>([]);

  const fetchData = async () => {
    const data = await getCampusAccountCounts();
    console.log(data);
    if (data) {
      setChartData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColorForCampus = (index: number) => {
    return colorPalette[index % colorPalette.length];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 campuses by accounts count</CardTitle>
        <CardDescription>Displays the top 5 campuses with the highest number of user accounts.</CardDescription>
      </CardHeader>
      {chartData && chartData.length >= 0 && (
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[22rem]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
              <Pie data={chartData} dataKey="count" label>
                <LabelList dataKey="campus" className="fill-background" stroke="none" fontSize={12} />
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getColorForCampus(index)} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};
