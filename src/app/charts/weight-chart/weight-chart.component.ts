import { Component, ViewChild, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeightService } from '../../services/weight.service';
import { AddWeightComponent } from './add-weight/add-weight.component';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss'],
  standalone: true,
  imports: [
    NgApexchartsModule,
    ChartComponent,
    AddWeightComponent,
    IonicModule,
    CommonModule,
  ],
})
export class WeightChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};
  public weight: any[] = [];
  weightUnit: 'kg' | 'lbs';
  help: any;
  addWeightVisible = false;

  constructor(
    private weightService: WeightService,
    private weightUnitService: WeightUnitService
  ) {
    this.weightUnit = weightUnitService.getCurrentUnit();
    this.loadChartData();
  }

  loadChartData(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Weight',
          data: this.weight.map((item) => item.weight),
          color: '#00ff88',
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: ['#00ff88'],
      },
      title: {
        text: undefined,
      },
      grid: {
        show: true,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: this.weight.map((item) =>
          new Date(item.date).toLocaleDateString('de-DE')
        ),
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
          formatter: (val) => `${val} ${this.weightUnit}`,
          style: {
            colors: '#fff',
          },
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
      },
      tooltip: {
        enabled: true,
        shared: false,
        followCursor: true,
        intersect: false,
      },
    };
  }

  async ngOnInit(): Promise<void> {
    this.weight = await this.weightService.getWeight();
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
      this.loadChartData();
    });
  }

  openWeightModal(): void {
    this.addWeightVisible = true;
  }

  async saveWeight(data: { weight: number | null }): Promise<void> {
    const date = new Date().toISOString();
    const newWeight = {
      weight: data.weight,
      date: new Date(date).toISOString(),
    };
    //await this.weightService.addWeight(newWeight);
    console.log('Saving weight:', newWeight);
    this.weight = await this.weightService.getWeight();
    this.loadChartData();
    this.addWeightVisible = false;
  }
}
