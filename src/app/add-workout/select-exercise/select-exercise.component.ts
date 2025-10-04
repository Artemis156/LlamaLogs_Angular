import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { barbell, bodyOutline, fitnessOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FinishButtonComponent } from '../finish-button/finish-button.component';
import { DatabaseService } from 'src/app/services/database.service';
import { SpinnerComponent } from 'src/app/spinner/spinner.component';

@Component({
  selector: 'app-select-exercise',
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    FinishButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './select-exercise.component.html',
  styleUrls: ['./select-exercise.component.scss'],
})
export class SelectExerciseComponent implements OnInit {

  workoutId: number = 0;

  constructor(private database: DatabaseService, private router: Router) {
    addIcons({ fitnessOutline, barbell, bodyOutline });
    this.workoutId = this.router.getCurrentNavigation()?.extras.state?.['workoutId'] ?? 0;
  }

  async ngOnInit(): Promise<void> {
    await this.loadExercises();
  }

  async loadExercises(): Promise<void> {
    this.loading = true;
    try {
      this.exercises = await this.database.getExercises();
    } finally {
      this.loading = false;
    }
  }

  searchText = '';
  isFocused = false;
  selectedEquipment: any = null;
  exercises: any[] = [];
  loading: boolean = false;

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

  
  async selectEquipment(item: any) {
    this.selectedEquipment = item;
    console.log('Selected equipment:', item);
    this.isFocused = false;

    this.loading = true; // Spinner anzeigen während Navigation vorbereitet wird
    try {
      switch (item.type) {
        case 'Strength':
          await this.router.navigate(['/add_workout/add_strength'], {
            state: { equipment: item , workoutId: this.workoutId},
          });
          break;
        case 'Cardio':
          await this.router.navigate(['/add_workout/add_cardio'], {
            state: { equipment: item , workoutId: this.workoutId},
          });
          break;
        case 'Bodyweight':
          await this.router.navigate(['/add_workout/add_bodyweight'], {
            state: { equipment: item , workoutId: this.workoutId},
          });
          break;
        default:
          console.error('Unknown equipment type:', item.type);
          break;
      }
    } finally {
      this.loading = false; // Spinner ausblenden
    }
  }

  clearFocus() {
    this.isFocused = false;
  }

  saveExercise = async (): Promise<boolean> => {
    return true;
  };
}
