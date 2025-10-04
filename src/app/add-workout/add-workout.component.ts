import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { fitnessOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-workout',
  imports: [CommonModule, IonicModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent {
  constructor(private router: Router, private database: DatabaseService) {
    addIcons({ fitnessOutline });
  }

  @Output() start = new EventEmitter<void>();
  @Output() workoutId = new EventEmitter<number>();

  async handleStartWorkout() {
    console.log('Workout started');
    const workoutId = await this.database.startWorkout();
    this.start.emit();
    this.workoutId.emit(workoutId);
    this.router.navigate(['/add_workout/select_exercise'], {
      state: { workoutId: workoutId },
    });
  }
}
