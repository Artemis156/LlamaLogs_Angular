import { Component } from '@angular/core';
import { CardioService } from 'src/app/services/cardio.service';
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
import { DistanceUnitService } from 'src/app/services/distance_unit.service';

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
};

@Component({
  selector: 'app-cardio-chart',
  templateUrl: './cardio-chart.component.html',
  styleUrls: ['./cardio-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class CardioChartComponent {
  public chartOptions: Partial<ChartOptions> = {};
  public cardioData: any[] = [];
  distanceUnit: 'km' | 'mi';
  help: any;

  constructor(private distanceUnitService: DistanceUnitService) {
    this.distanceUnit = distanceUnitService.getCurrentUnit();
    this.loadChart();
  }

  loadChart() {
    this.chartOptions = {
      series: [
        {
          name: `Distance (${this.distanceUnit})`,
          type: 'line',
          data: [5.2, 3.5, 7.0, 4.1, 6.3, 2.8, 5.7],
        },
        {
          name: 'Duration (min)',
          type: 'line',
          data: [32, 25, 48, 28, 42, 20, 35],
        },
        {
          name: 'Calories',
          type: 'column',
          data: [380, 250, 540, 310, 460, 190, 400],
        },
      ],
  colors: ['#39ff14', '#ff00f7', '#00fff7'], // Neon-Grün, Neon-Pink, Neon-Cyan
      chart: {
        height: 400,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [3, 3, 0],
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false, // DataLabels werden nicht angezeigt
      },
      xaxis: {
        categories: [
          '10.06',
          '11.06',
          '12.06',
          '13.06',
          '14.06',
          '15.06',
          '16.06',
        ],
        labels: {
          show: false,
        },
      },
      yaxis: [
        {
          title: {
            text: `Distance (${this.distanceUnit})`,
            style: { fontWeight: 'normal', color: '#fff', fontSize: '16px' },
          },
          labels: {
            style: { fontWeight: 'normal', colors: '#fff', fontSize: '14px' },
          },
        },
        {
          opposite: true,
          title: {
            text: 'Duration (min)',
            style: { fontWeight: 'normal', color: '#fff', fontSize: '16px' },
          },
          labels: {
            style: { fontWeight: 'normal', colors: '#fff', fontSize: '14px' },
          },
        },
        {
          show: false, // 👈 Versteckte Achse für Kalorien
        },
        // 👉 Keine Achse für Kalorien – wird intern skaliert, aber nicht angezeigt
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#fff',
        },
      },
    };
  }

  ngOnInit() {
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
      this.loadChart();
    });
  }
}
