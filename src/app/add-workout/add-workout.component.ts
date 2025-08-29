import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { fitnessOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-workout',
  imports: [CommonModule, IonicModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent {
  constructor(private router: Router) {
    addIcons({ fitnessOutline });
  }

  @Output() start = new EventEmitter<void>();

  handleStartWorkout() {
    console.log('Workout started');
    // Database logic to add a new workout can be implemented here
    this.start.emit();
    this.router.navigate(['/add_workout/select_exercise']);
  }
}
