import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  colors?: string[];
  dataLabels?: any; // Added to allow dataLabels property
  tooltip?: any; // Added to allow tooltip property
  stroke?: any; // Optionally add stroke if used
  plotOptions?: any; // Added to allow plotOptions property
};

@Component({
  selector: 'app-last-workout',
  templateUrl: './last-workout.component.html',
  styleUrls: ['./last-workout.component.scss'],
  imports: [NgApexchartsModule, ChartComponent, IonicModule, CommonModule],
})
export class LastWorkoutComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  help: any;

  constructor() {
    this.chartOptions = {
      series: [40, 35, 25], // Mock-Daten: Cardio, Strength, Bodyweight
      chart: {
        type: 'pie',
        height: 250,
        background: 'transparent',
      },
      labels: ['Cardio', 'Strength', 'Bodyweight'],
      colors: ['#00ff2fff', '#00d4ff', '#ff00aa'],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          colors: ['#fff'],
        },
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.6,
        },
      },
      legend: {
        position: 'bottom',
        labels: {
        colors: '#fff'
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: '#000' // dünner, dunkler Rand für Glaseffekt
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 280
            },
            legend: {
              position: 'bottom'
            }
        }
      }
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15,
        }
      }
    }
  };
  }
}
