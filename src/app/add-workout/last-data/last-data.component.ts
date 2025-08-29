import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';

type Equipment = {
  name: string;
  type: string;
  description?: string;
};

@Component({
  selector: 'app-last-data',
  templateUrl: './last-data.component.html',
  styleUrls: ['./last-data.component.scss'],
  imports: [CommonModule],
})
export class LastDataComponent implements OnInit {
  weightUnit: 'kg' | 'lbs';
  distanceUnit: 'km' | 'mi';
  date: Date = new Date();
  time: number = 30;
  distance: number = 5;
  reps: number = 15;
  strengthData = {
    sets: [
      { weight: 20, repetitions: 12 },
      { weight: 25, repetitions: 10 },
      { weight: 30, repetitions: 8 },
    ],
  };
  @Input() exercise: Equipment | null = null;

  constructor(private weightUnitService: WeightUnitService, private distanceUnitService: DistanceUnitService) {
    this.weightUnit = this.weightUnitService.getCurrentUnit();
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  ngOnInit() {
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
    });

    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    })
  }
}
