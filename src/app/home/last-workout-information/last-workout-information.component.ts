import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
@Component({
  selector: 'app-last-workout-information',
  templateUrl: './last-workout-information.component.html',
  styleUrls: ['./last-workout-information.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class LastWorkoutInformationComponent implements OnInit {
  distanceUnit: 'km' | 'mi';

  exerciseData = [
    {
      name: 'Running',
      category: 'Cardio',
      duration: 30,
      distance: 5,
      calories: 300,
    },
    {
      name: 'Bench Press',
      category: 'Strength',
      sets: 4,
      reps: 8,
    },
    {
      name: 'Push-ups',
      category: 'Bodyweight',
      reps: 20,
    },
  ];

  constructor(private distanceUnitService: DistanceUnitService) {
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  ngOnInit() {
    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    });
  }
}
