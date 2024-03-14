"use client";

import ChartJS from "chart.js/auto";
import { useEffect, useRef } from "react";

interface HorizontalBarChartProps {
  label: string;
  campusesNames: string[];
  campusesLevels: number[];
}

export const HorizontalBarChart = ({
  label,
  campusesNames,
  campusesLevels,
}: HorizontalBarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const height = campusesNames.length * 20;
        chartRef.current.height = height;

        chartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: campusesNames,
            datasets: [
              {
                label: label,
                data: campusesLevels,
                backgroundColor: ["#7364D0"],
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
                position: "top",
                labels: {
                  color: "#a1a1aa",
                },
              },
              title: {
                display: false,
                text: "Chart Title",
                color: "#a1a1aa",
              },
            },
            scales: {
              y: {
                ticks: {
                  color: "#a1a1aa",
                },
              },
              x: {
                ticks: {
                  color: "#a1a1aa",
                },
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
