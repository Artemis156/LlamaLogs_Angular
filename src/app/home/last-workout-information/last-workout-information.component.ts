import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import { DatabaseWorkoutService } from 'src/app/services/database_workout.service';
@Component({
  selector: 'app-last-workout-information',
  templateUrl: './last-workout-information.component.html',
  styleUrls: ['./last-workout-information.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class LastWorkoutInformationComponent implements OnInit {
  distanceUnit: 'km' | 'mi';

  exerciseData: any[] = [];

  constructor(
    private distanceUnitService: DistanceUnitService,
    private databaseWorkout: DatabaseWorkoutService
  ) {
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  ngOnInit() {
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    });
    this.loadLastWorkout();
  }

  async loadLastWorkout() {
    try {
      const data = await this.databaseWorkout.getLastWorkout();
      this.exerciseData = data ?? []; // falls null → leeres Array
      console.log('Last workout data:', this.exerciseData);
    } catch (error) {
      console.error('Error loading last workout:', error);
      this.exerciseData = [];
    }
  }
}
