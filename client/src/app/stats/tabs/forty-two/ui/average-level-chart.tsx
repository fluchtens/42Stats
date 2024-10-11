"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Campus } from "@/types/campus.interface";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { getCampuses } from "../services/forty-two.service";

const chartConfig = {
  averageLevel: {
    label: "Level",
    color: "hsl(var(--chart))",
  },
} satisfies ChartConfig;

export function AverageLevelChart() {
  const [campuses, setCampuses] = useState<Campus[]>([]);

  const fetchCampuses = async () => {
    const fetchedCampuses = await getCampuses();
    if (!fetchedCampuses || fetchedCampuses.length === 0) {
      return;
    }
    const sortedCampuses = fetchedCampuses.sort((a: Campus, b: Campus) => b.averageLevel - a.averageLevel);
    const newCampuses = sortedCampuses.map((campus, index) => ({ ...campus, displayName: `${index + 1}. ${campus.name}` }));
    setCampuses(newCampuses);
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Campuses average levels</CardTitle>
          <CardDescription>Ranking of campuses by average level.</CardDescription>
        </CardHeader>
        {campuses.length > 0 && (
          <CardContent>
            <ChartContainer config={chartConfig} className={`aspect-auto`} style={{ height: `${campuses.length + 15}rem` }}>
              <BarChart
                data={campuses}
                layout="vertical"
                margin={{
                  left: 120,
                }}
                barCategoryGap={2}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" dataKey="averageLevel" hide />
                <YAxis type="category" dataKey="name" tickLine={false} tickMargin={0} axisLine={false} hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="averageLevel" fill="var(--color-averageLevel)" radius={4}>
                  <LabelList dataKey="displayName" position="insideLeft" offset={-120} fontSize={12} width={200} className="fill-muted-foreground" />
                  <LabelList dataKey="averageLevel" position="right" offset={8} className="fill-muted-foreground" fontSize={11} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        )}
      </Card>
    </>
  );
}
