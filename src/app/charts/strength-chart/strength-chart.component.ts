import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-strength-chart',
  templateUrl: './strength-chart.component.html',
  styleUrls: ['./strength-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class StrengthChartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {};
  weightUnit: 'kg' | 'lbs';
  help: any;

  constructor(private weightUnitService: WeightUnitService) {
    this.weightUnit = weightUnitService.getCurrentUnit();
    this.loadChartData();
  }

  loadChartData() {
    this.chartOptions = {
      series: [
        {
          name: `Avg Weight (${this.weightUnit})`,
          type: 'line',
          data: [60, 65, 63, 70, 68, 72, 75], // Durchschnittliches Gewicht
          color: '#00ff88',
        },
        {
          name: 'Total Reps',
          type: 'column',
          data: [30, 35, 33, 40, 38, 42, 45], // Gesamte Anzahl Reps
          color: '#ff0088',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [3, 0], // Linie hat Dicke 3, Säulen 0
        curve: 'straight',
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: [1, 0.7], // Linie durchsichtig, Säulen halbtransparent
      },
      xaxis: {
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
        axisTicks: {
          show: false,
        },
      },
      yaxis: [
        {
          title: {
            text: `Avg Weight (${this.weightUnit})`,
            style: {
              fontWeight: 'normal', // nicht bold
              fontFamily: 'Arial, sans-serif', // Schriftart ändern
              color: '#fff', // Textfarbe anpassen
              fontSize: '16px',
            },
          },
          min: 0,
          max: 100,
          labels: {
            formatter: (val) => `${val} ${this.weightUnit}`,
            style: {
              fontWeight: 'normal', // nicht bold
              fontFamily: 'Arial, sans-serif', // Schriftart ändern
              colors: '#fff', // Textfarbe anpassen
              fontSize: '14px',
            },
          },
        },
        {
          opposite: true,
          title: {
            text: 'Total Reps',
            style: {
              fontWeight: 'normal', // nicht bold
              fontFamily: 'Arial, sans-serif', // Schriftart ändern
              color: '#fff', // Textfarbe anpassen
              fontSize: '16px',
            },
          },
          min: 0,
          max: 60,
          labels: {
            style: {
              fontWeight: 'normal', // nicht bold
              fontFamily: 'Arial, sans-serif', // Schriftart ändern
              colors: '#fff', // Textfarbe anpassen
              fontSize: '14px',
            },
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val, { seriesIndex }) => {
            return seriesIndex === 0
              ? `${val} ${this.weightUnit}`
              : `${val} reps`;
          },
        },
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#fff',
        },
      },
      grid: {
        borderColor: '#e7e7e7',
      },
    };
  }

  ngOnInit() {
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
      console.log('Weight unit changed:', this.weightUnit);
      this.loadChartData();
    });
  }
}
