import { Component, effect, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import {
  DatabaseService,
  WorkoutExercise,
} from 'src/app/services/database.service';

@Component({
  selector: 'app-last-workout-information',
  templateUrl: './last-workout-information.component.html',
  styleUrls: ['./last-workout-information.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class LastWorkoutInformationComponent implements OnInit {
  distanceUnit: 'km' | 'mi';
  exerciseData: WorkoutExercise[] = [];

  constructor(
    private distanceUnitService: DistanceUnitService,
    private database: DatabaseService
  ) {
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  async ngOnInit() {
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    });
    effect(() => {
      this.exerciseData = this.database.getLastWorkoutSignal()();
    });

    this.database.refreshLastWorkout();
  }

  /*async loadLastWorkout() {
    try {
      const data = await this.database.getLastWorkout();
      this.exerciseData = data;
      console.log('Last workout data:', this.exerciseData);
    } catch (error) {
      console.error('Error loading last workout:', error);
      this.exerciseData = [];
    }
  }*/
}
