import ApexCharts from 'apexcharts';
import '../../../globals.css';
// import {foreground, } from 'tailwind.config.mjs';

const root = document.documentElement;
const style = getComputedStyle(root);
const foreground = style.getPropertyValue('--foreground');
const mutedForeground = style.getPropertyValue('--muted-foreground').trim();
// alert("'" + mutedForeground + "'")

const chartData = {
    FOR: [45, 52, 38, 45, 19, 23, 52],
    AGAINST: [3, 2, 13, 4, 1, 0, 7],
    DATE: ["01 Jan","02 Jan","03 Jan","04 Jan","05 Jan","06 Jan","07 Jan"]
}

var options = {
    chart: {
        height: 160,
        type: "area",
        width: "100%",
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
            show: false,
        },
    },
    colors: ["#EDA13A", foreground],
    dataLabels: {
        enabled: false
    },
    fill: {
        type: "solid",
    },
    grid: {
        show: false,
    },
    legend: {
        show: false,
    },
    stroke: {
        curve: 'straight',
    },
    series: [
        {
            name: "FOR",
            data: chartData.FOR
        },
        {
            name: 'AGAINST',
            data: chartData.AGAINST
        }
    ],
    tooltip: {
        custom: function(series: any) {
            return (
                '<div class="arrow_box rounded-lg border bg-background p-2 shadow-sm">' +
                '<div class="grid grid-cols-2 gap-2">' +
                '<div class="flex flex-col">' +
                `<span style="font-size: 0.70rem; text-transform: uppercase; color: ${mutedForeground}">For</span>` +
                '<span class="font-bold">12</span>' +
                '</div>' +
                '<div class="flex flex-col">' +
                `<span style="font-size: 0.70rem; text-transform: uppercase; color: ${mutedForeground}">Against</span>` +
                `<span class="font-bold" style="color: ${mutedForeground}">0</span>` +
                '</div>' +
                '</div>' +
                '</div>'
          )
        }
    },
    xaxis: {
        categories: chartData.DATE,
    },
    yaxis: {
        show: false,
    },
};

if (document.getElementById("chart")) {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
} else {
    console.log('No chart element found');
}

