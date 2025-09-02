import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardioChartComponent } from 'src/app/charts/cardio-chart/cardio-chart.component';
import { StrengthChartComponent } from 'src/app/charts/strength-chart/strength-chart.component';
import { BodyweightChartComponent } from 'src/app/charts/bodyweight-chart/bodyweight-chart.component';
import { StrengthInformationComponent } from '../strength-information/strength-information.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-select',
  templateUrl: './exercise-select.component.html',
  styleUrls: ['./exercise-select.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    CardioChartComponent,
    StrengthChartComponent,
    BodyweightChartComponent,
    StrengthInformationComponent,
    FormsModule,
  ],
})
export class ExerciseSelectComponent implements OnInit {
  showSelect = false;
  selectedExercise: string | null = null;
  exerciseType: string = '';

  exercises = [
    { id: 'squat', name: 'Squat', type: 'Strength' },
    { id: 'bench', name: 'Bench Press', type: 'Strength' },
    { id: 'deadlift', name: 'Deadlift', type: 'Strength' },
    { id: 'run', name: 'Running', type: 'Cardio' },
  ];

  

  constructor(private exerciseService: ExerciseService) {}

  async ngOnInit(): Promise<void> {
    this.exercises = await this.exerciseService.getExercises();
  }

  openSelect() {
    this.showSelect = true;
  }

  closeSelect() {
    this.showSelect = false;
  }

  selectExercise(id: string) {
    this.selectedExercise = id;

    // alte Logik übernehmen
    const selected = this.exercises.find(e => e.id === this.selectedExercise);
    this.exerciseType = selected?.type || '';

    this.closeSelect();
  }

  getExerciseName(id: string | null) {
    return this.exercises.find(e => e.id === id)?.name;
  }
}
