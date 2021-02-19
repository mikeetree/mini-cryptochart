import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';
import sampleData from '../sampleData';

const chartConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      label: "Closing price",
      borderColor: "#3e95cd",
      fill: false
    }]
  },
  options: {
    title: {
      text: 'BTC',
      display: true,
      position: 'top',
    },
  },
  scales: {
    options: {
      xAxes: [{
          type: "time",
          distribution: "linear"
        }],
    },
  },
};

export default function Cryptochart() {
  const chartRef = useRef(null);
  const [chart, setChart] = useState();
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setChart(new Chart(chartRef.current, chartConfig));
  }, []);

  useEffect(() => {
    if (!chart) {
      return;
    }

    for (const [time, value] of Object.entries(sampleData.bpi)) {
      chart.data.labels.push(time);
      chart.data.datasets[0].data.push({ x: time, y: value });
    }

    chart.update();

  }, [chart]);

  return (
    <div>
      <canvas
          id="cryptochart"
          ref={chartRef}
      />
      <span>Powered by <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a></span>
    </div>
  );
}
