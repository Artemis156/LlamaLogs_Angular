import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { barbell, bodyOutline, fitnessOutline } from 'ionicons/icons';
import { ExerciseService } from '../../services/exercises.service';
import { Router } from '@angular/router';
import { FinishButtonComponent } from '../finish-button/finish-button.component';

@Component({
  selector: 'app-select-exercise',
  imports: [FormsModule, IonicModule, CommonModule, FinishButtonComponent],
  templateUrl: './select-exercise.component.html',
  styleUrls: ['./select-exercise.component.scss'],
})
export class SelectExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {
    addIcons({ fitnessOutline, barbell, bodyOutline });
  }

  async ngOnInit(): Promise<void> {
    this.exercises = await this.exerciseService.getExercises();
  }

  searchText = '';
  isFocused = false;
  selectedEquipment: any = null;
  exercises: any[] = [];

  get filteredEquipment() {
    return this.exercises.filter((item) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getIconName(type: string): string {
    switch (type) {
      case 'Strength':
        return 'barbell';
      case 'Cardio':
        return 'fitness-outline';
      case 'Bodyweight':
        return 'body-outline';
      default:
        return 'fitness-outline';
    }
  }

  selectEquipment(item: any) {
    this.selectedEquipment = item;
    console.log('Selected equipment:', item);
    this.isFocused = false;
    switch (item.type) {
      case 'Strength':
        this.router.navigate(['/add_workout/add_strength'], {
          state: { equipment: item },
        });
        break;
      case 'Cardio':
        this.router.navigate(['/add_workout/add_cardio'], {
          state: { equipment: item },
        });
        break;
      case 'Bodyweight':
        this.router.navigate(['/add_workout/add_bodyweight'], {
          state: { equipment: item },
        });
        break;
      default:
        console.error('Unknown equipment type:', item.type);
        break;
    }
  }

  clearFocus() {
    this.isFocused = false;
  }

  saveExercise = async (): Promise<boolean> => {
    // deine Speicherlogik hier
    console.log('Exercise saved:', this.selectedEquipment);
    return true;
  };
}
