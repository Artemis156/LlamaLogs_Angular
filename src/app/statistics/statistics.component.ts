import { Component, OnInit } from '@angular/core';
import { WeightChartComponent } from '../charts/weight-chart/weight-chart.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LastWorkoutComponent } from '../charts/last-workout/last-workout.component';
import { ExerciseSelectComponent } from './exercise-select/exercise-select.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  imports: [
    WeightChartComponent,
    CommonModule,
    IonicModule,
    LastWorkoutComponent,
    ExerciseSelectComponent,
  ],
})
export class StatisticsComponent {


  constructor() {}




}
