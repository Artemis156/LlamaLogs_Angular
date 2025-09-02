import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { fitnessOutline } from 'ionicons/icons';
import { LastWorkoutComponent } from "../charts/last-workout/last-workout.component";
import { LastWorkoutInformationComponent } from "./last-workout-information/last-workout-information.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, IonicModule, LastWorkoutComponent, LastWorkoutInformationComponent],
    encapsulation: ViewEncapsulation.None  // 👉 Styles wirken global

})
export class HomeComponent {
  constructor(private router: Router) {
    addIcons({ fitnessOutline });
  }

  startWorkout() {
    this.router.navigate(['tabs/add_workout']);
  }
}
