import React from 'react';
import styles from './diagramblock.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  layout: {
    padding: {
      bottom: 13,
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'rgba(153, 153, 153, 1)',
        font: {
          size: 24,
          family: 'SF UI Display'
        },

      },
      backgroundColor: 'rgba(236, 236, 236, 1)',
      backdropPadding: 10,
    },
    y: {
      position: {
        x: 6,
      },
      grid: {
        borderWidth: 0,
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      }
    },
  }
};

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const dataSet = [1000, 726, 926, 168, 425, 224, 787];

export const data = {
  labels,
  datasets: [
    {
      data: dataSet,
      backgroundColor: 'rgba(234, 137, 121, 1)',
      hoverBackgroundColor: 'rgba(238, 115, 93, 1)',
      // hoverBackgroundColor: 'rgba(220, 62, 34, 1)'
    },
  ],
};

export function DiagramBlock() {
  return (
    <div className={styles.diagramBlock}>
      <Bar options={options} data={data} />
    </div>
  );
}
