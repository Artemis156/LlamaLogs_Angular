import { Component } from '@angular/core';
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
import { Exercise } from 'src/app/services/database.service';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-bodyweigth',
  templateUrl: './add-bodyweigth.component.html',
  styleUrls: ['./add-bodyweigth.component.scss'],
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
export class AddBodyweigthComponent {
  selectedEquipment: Exercise | null = null;
  reps: number | null = null;
  loading: boolean = false;

  constructor(
    private router: Router,
    private database: DatabaseService
  ) {
    addIcons({ fitnessOutline });
    const nav = this.router.getCurrentNavigation();
    this.selectedEquipment = nav?.extras.state?.['equipment'] ?? null;
  }

  saveExercise = async (): Promise<boolean> => {
    this.loading = true;
    try {
      await this.database.addBodyweightExercise(
        1, // Beispielhafte workout_id, sollte durch die tatsächliche ID ersetzt werden
        this.selectedEquipment ? this.selectedEquipment.id : 0,
        this.reps ? this.reps : 0
      );
      return true;
    } finally {
      this.loading = false;
    }
  };
}
