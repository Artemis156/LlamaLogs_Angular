import { Component, OnInit } from '@angular/core';
import { ExerciseNameComponent } from '../exercise-name/exercise-name.component';
import { Router } from '@angular/router';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import { LastDataComponent } from '../last-data/last-data.component';
import { NextButtonComponent } from '../next-button/next-button.component';
import { FinishButtonComponent } from '../finish-button/finish-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  fitnessOutline,
  addCircleOutline,
  removeCircleOutline,
} from 'ionicons/icons';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-strength',
  templateUrl: './add-strength.component.html',
  styleUrls: ['./add-strength.component.scss'],
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
export class AddStrengthComponent implements OnInit {
  selectedEquipment: any;
  workoutId: number = 0;
  weightUnit: 'kg' | 'lbs' = 'kg';
  strengthSets = [{ weight: '', reps: '' }];
  inputFocused = false;
  private focusTimeout: any;
  loading: boolean = false;

  constructor(
    private router: Router,
    private weightUnitService: WeightUnitService,
    private database: DatabaseService
  ) {
    addIcons({ fitnessOutline, addCircleOutline, removeCircleOutline });
    const nav = this.router.getCurrentNavigation();
    this.selectedEquipment = nav?.extras.state?.['equipment'] ?? null;
    this.workoutId = nav?.extras.state?.['workoutId'] ?? 0;
  }

  ngOnInit() {
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
    });
  }

  addSet() {
    this.strengthSets.push({ weight: '', reps: '' });
  }

  removeSet() {
    if (this.strengthSets.length > 1) {
      this.strengthSets.pop();
    }
  }

  handleFocus() {
    clearTimeout(this.focusTimeout);
    this.inputFocused = true;
  }

  handleBlur() {
    this.focusTimeout = setTimeout(() => {
      this.inputFocused = false;
    }, 150);
  }

  isExerciseInputValid(): boolean {
    return (
      this.strengthSets?.length > 0 &&
      this.strengthSets.every(
        (set) =>
          set.weight != null &&
          parseFloat(set.weight) > 0 &&
          set.reps != null &&
          parseInt(set.reps, 10) > 0
      )
    );
  }

  saveExercise = async (): Promise<boolean> => {
    this.loading = true;
    try {
      const workout_exercise_id = await this.database.addStrengthExercise(
        this.workoutId,
        this.selectedEquipment ? this.selectedEquipment.id : 0,
        this.strengthSets.length,
        this.strengthSets.reduce((total, set) => total + parseInt(set.reps, 10), 0)
      );
      for (const set of this.strengthSets) {
        await this.database.addStrengthSet(
          workout_exercise_id,
          parseFloat(set.weight),
          parseInt(set.reps, 10)
        );
      }
    } finally {
      this.loading = false;
    }
    this.strengthSets = [{ weight: '', reps: '' }];
    return true;
  };
}
