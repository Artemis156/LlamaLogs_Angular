import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTooltip,
  ApexLegend,
  ApexTitleSubtitle,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  colors: string[];
  grid: ApexGrid;
};

@Component({
  selector: 'app-bodyweight-chart',
  templateUrl: './bodyweight-chart.component.html',
  styleUrls: ['./bodyweight-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class BodyweightChartComponent {
  public chartOptions: Partial<ChartOptions>;
  isDarkMode = false;
  help: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Reps',
          data: [12, 15, 14, 20, 18, 22, 19], // Mock-Reps pro Tag
          color: '#00ff88',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: false, // Menü ausblenden
        },
        animations: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      xaxis: {
        type: 'category',
        categories: [
          '2025-06-10',
          '2025-06-11',
          '2025-06-12',
          '2025-06-13',
          '2025-06-14',
          '2025-06-15',
          '2025-06-16',
        ],
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: 'Number of Reps',
          style: {
            fontWeight: 'normal', // nicht bold
            fontFamily: 'Arial, sans-serif', // Schriftart ändern
            color: '#fff', // Textfarbe anpassen
          },
        },
        labels: {
          style: {
            fontWeight: 'normal', // nicht bold
            fontFamily: 'Arial, sans-serif', // Schriftart ändern
            colors: '#fff', // Schriftfarbe weiß
          },
        },
      },
      tooltip: {
        enabled: true,
        shared: true, // nur ein Punkt pro Tooltip
        //intersect: false, // nur anzeigen, wenn direkt auf Datenpunkt geklickt oder gehovert wird
        followCursor: true,
        theme: 'light', // heller Tooltip-Hintergrund
      },
    };
  }

}
