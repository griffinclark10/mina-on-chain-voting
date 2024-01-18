import ApexCharts from 'apexcharts';
import '../../../globals.css';

import { VoteMetrics } from 'models';

const root = document.documentElement;
const style = getComputedStyle(root);
const foreground = style.getPropertyValue('--foreground');
const mutedForeground = style.getPropertyValue('--muted-foreground').trim();

function processData(data: Array<VoteMetrics>): { FOR: number[], AGAINST: number[], DATE: string[] } {
  const FOR: number[] = [], AGAINST: number[] = [], DATE: string[] = [];

  data.forEach(item => {
    FOR.push(item.FOR);
    AGAINST.push(item.AGAINST);
    DATE.push(item.DATE);
  });

  return { FOR, AGAINST, DATE };
}


function initChart() {
  const chartElement = document.getElementById('chart');
  if (chartElement) {
    const rawData = chartElement.getAttribute('data-chartdata');
    const parsedData = rawData ? JSON.parse(rawData) : [];
    const chartData = processData(parsedData);

    var options = {
      chart: {
        height: 160,
        type: 'area',
        width: '100%',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#EDA13A', foreground],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid'
      },
      grid: {
        show: false
      },
      legend: {
        show: false
      },
      stroke: {
        curve: 'straight'
      },
      series: [
        {
          name: 'FOR',
          data: chartData.FOR
        },
        {
          name: 'AGAINST',
          data: chartData.AGAINST
        }
      ],
      tooltip: {
        custom: function (series: any) {
          var dpi = series.dataPointIndex;
    
          return (
            '<div class="arrow_box rounded-lg border-input bg-background p-2 shadow-sm">' +
            '<div class="grid grid-cols-2 gap-2">' +
            '<div class="flex flex-col">' +
            `<span style="font-size: 0.70rem; text-transform: uppercase; color: ${mutedForeground}">For</span>` +
            '<span class="font-bold">' +
            series.series[0][dpi] +
            '</span>' +
            '</div>' +
            '<div class="flex flex-col">' +
            `<span style="font-size: 0.70rem; text-transform: uppercase; color: ${mutedForeground}">Against</span>` +
            `<span class="font-bold" style="color: ${mutedForeground}">` +
            series.series[1][dpi] +
            `</span>` +
            '</div>' +
            '</div>' +
            '</div>'
          );
        }
      },
      xaxis: {
        categories: chartData.DATE,
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        show: false
      }
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();
  } else {
    console.log('No chart element found');
  }
}

document.addEventListener('DOMContentLoaded', initChart);
