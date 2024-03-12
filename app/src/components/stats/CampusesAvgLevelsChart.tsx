"use client";

import ChartJS from "chart.js/auto";
import { useEffect, useRef } from "react";

interface CampusesAvgLevelsChartProps {
  campusesNames: string[];
  campusesLevels: number[];
}

export const CampusesAvgLevelsChart = ({
  campusesNames,
  campusesLevels,
}: CampusesAvgLevelsChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const height = campusesNames ? campusesNames.length * 6 : 400;
        chartRef.current.height = height;

        chartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: campusesNames,
            datasets: [
              {
                label: "Average level",
                data: campusesLevels,
                backgroundColor: ["#7364D0"],
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Average level by campus",
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [campusesNames, campusesLevels]);

  return <canvas ref={chartRef} />;
};