import { Component, OnInit } from '@angular/core';
import { ExerciseNameComponent } from '../exercise-name/exercise-name.component';
import { Router } from '@angular/router';
import { LastDataComponent } from '../last-data/last-data.component';
import { NextButtonComponent } from '../next-button/next-button.component';
import { FinishButtonComponent } from '../finish-button/finish-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { fitnessOutline } from 'ionicons/icons';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { DatabaseService } from 'src/app/services/database.service';



@Component({
  selector: 'app-add-cardio',
  templateUrl: './add-cardio.component.html',
  styleUrls: ['./add-cardio.component.scss'],
  imports: [
    ExerciseNameComponent,
    LastDataComponent,
    NextButtonComponent,
    FinishButtonComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    SpinnerComponent,
  ],
})
export class AddCardioComponent implements OnInit{
  selectedEquipment: any;
  workoutId: number = 0;
  duration: number | null = null;
  distance: number | null = null;
  calories: number | null = null;
  distanceUnit: 'km' | 'mi' = 'km';
  loading: boolean = false;

  constructor(
    private router: Router,
    private distanceUnitService: DistanceUnitService,
    private database: DatabaseService
  ) {
    addIcons({ fitnessOutline });
    const nav = this.router.getCurrentNavigation();
    this.selectedEquipment = nav?.extras.state?.['equipment'] ?? null;
    this.workoutId = nav?.extras.state?.['workoutId'] ?? 0;
  }

    ngOnInit() {
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    });
  }

  isValidCardio(): boolean {
    return (
      this.duration !== null &&
      this.duration > 0 &&
      this.distance !== null &&
      this.distance > 0
    );
  }

  saveExercise = async (): Promise<boolean> => {
    this.loading = true;
    try {
      await this.database.addCardioExercise(
        this.workoutId,
        this.selectedEquipment ? this.selectedEquipment.id : 0,
        this.duration ? this.duration : 0,
        this.distance ? this.distance : 0
      );
      return true;
    } finally {
      this.loading = false;
    }
  };
}
