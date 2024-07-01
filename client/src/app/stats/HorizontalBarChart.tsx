"use client";

import ChartJS from "chart.js/auto";
import { useEffect, useRef } from "react";

interface HorizontalBarChartProps {
  title: string;
  label: string;
  labels: string[];
  datas: number[];
}

export const HorizontalBarChart = ({ title, label, labels, datas }: HorizontalBarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        const height = labels.length * 20;
        chartRef.current.height = height;

        chartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: label,
                data: datas,
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
                display: true,
                text: title,
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
  }, [labels, datas]);

  return <canvas ref={chartRef} />;
};
