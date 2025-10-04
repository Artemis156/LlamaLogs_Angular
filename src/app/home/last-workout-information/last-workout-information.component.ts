import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import {
  DatabaseService,
  WorkoutExercise,
} from 'src/app/services/database.service';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-last-workout-information',
  templateUrl: './last-workout-information.component.html',
  styleUrls: ['./last-workout-information.component.scss'],
  imports: [IonicModule, CommonModule, SpinnerComponent],
})
export class LastWorkoutInformationComponent implements OnInit {
  distanceUnit: 'km' | 'mi';
  exerciseData: WorkoutExercise[] = [];
  loading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private distanceUnitService: DistanceUnitService,
    private database: DatabaseService,
    private refreshService: RefreshService
  ) {
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  async ngOnInit() {
    this.subscriptions.push(
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    }));

    this.subscriptions.push(
    this.refreshService.onRefresh.subscribe(() => {
      this.loadLastWorkout();
    }));
    
    await this.loadLastWorkout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async loadLastWorkout() {
    this.loading = true;
    try {
      this.exerciseData = await this.database.getLastWorkout();
    } catch (error) {
      this.exerciseData = [];
    } finally {
      this.loading = false;
    }
  }
}
