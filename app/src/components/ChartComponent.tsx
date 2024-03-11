"use client";

import { ChartData } from "chart.js";
import ChartJS from "chart.js/auto";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: ChartData;
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Détruire le graphique existant
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: data,
          options: {
            indexAxis: "y",
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Chart.js Horizontal Bar Chart",
              },
            },
          },
        });
      }
    }

    return () => {
      // Assurez-vous de détruire le graphique lors du démontage du composant
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
