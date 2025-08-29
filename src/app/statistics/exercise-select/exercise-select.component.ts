import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercises.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardioChartComponent } from 'src/app/charts/cardio-chart/cardio-chart.component';
import { StrengthChartComponent } from 'src/app/charts/strength-chart/strength-chart.component';
import { BodyweightChartComponent } from 'src/app/charts/bodyweight-chart/bodyweight-chart.component';
import { StrengthInformationComponent } from "../strength-information/strength-information.component";

@Component({
  selector: 'app-exercise-select',
  templateUrl: './exercise-select.component.html',
  styleUrls: ['./exercise-select.component.scss'],
  imports: [CommonModule, IonicModule, CardioChartComponent, StrengthChartComponent, BodyweightChartComponent, StrengthInformationComponent],
})
export class ExerciseSelectComponent implements OnInit {
  exercises: any[] = [];
  selectedExercise: number | null = null;
  exerciseType: string = '';


  constructor(private exerciseService: ExerciseService) {}

  selectOptions = {
    header: 'Choose Exercise',
    subHeader: '',
    cssClass: 'custom-select-alert',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'custom-cancel-button',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
      {
        text: 'OK',
        handler: (value: any) => {
          console.log('OK clicked with value:', value);
        },
      },
    ],
  };

  async ngOnInit(): Promise<void> {
    this.exercises = await this.exerciseService.getExercises();
  }

onExerciseChange(event: any) {
  this.selectedExercise = event.detail.value;

  const selected = this.exercises.find(e => e.id === this.selectedExercise);
  this.exerciseType = selected?.type || '';
}
}
