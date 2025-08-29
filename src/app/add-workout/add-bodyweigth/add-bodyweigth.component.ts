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
  ],
})
export class AddBodyweigthComponent {
  selectedEquipment: any;
  reps: number | null = null;

  constructor(private router: Router) {
    addIcons({ fitnessOutline });
    const nav = this.router.getCurrentNavigation();
    this.selectedEquipment = nav?.extras.state?.['equipment'] ?? null;
  }

  saveExercise = async (): Promise<boolean> => {
    // deine Speicherlogik hier
    console.log('Exercise saved:', this.selectedEquipment, this.reps);
    return true;
  };

  finishWorkout = async (): Promise<boolean> => {
    // deine Speicherlogik hier
    console.log('Workout finished:', this.selectedEquipment, this.reps);
    return true;
  };
}
