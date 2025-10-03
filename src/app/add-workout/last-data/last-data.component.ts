import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Exercise } from 'src/app/services/database.service';

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
  time: number = 0;
  distance: number = 0;
  reps: number = 0;
  strengthData: { sets: { weight: number; repetitions: number }[] } = {
    sets: [],
  };
  hasData = false;
  @Input() exercise: Exercise | null = null;

  constructor(
    private weightUnitService: WeightUnitService,
    private distanceUnitService: DistanceUnitService,
    private dbService: DatabaseService
  ) {
    this.weightUnit = this.weightUnitService.getCurrentUnit();
    this.distanceUnit = this.distanceUnitService.getCurrentUnit();
  }

  async ngOnInit() {
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
    });

    this.distanceUnitService.distanceUnit$.subscribe((unit) => {
      this.distanceUnit = unit;
    });

    await this.loadLastData();
  }

  async loadLastData() {
    if (!this.exercise) return;

    const lastEntry = await this.dbService.getLastExerciseByID(
      this.exercise.id
    );

    if (!lastEntry) {
      this.hasData = false;
      return;
    }

    this.hasData = true;
    this.date = new Date(lastEntry.date? lastEntry.date : '');

  if (lastEntry.category === 'Cardio') {
    this.time = lastEntry.duration ?? 0;
    this.distance = lastEntry.distance ?? 0;
  } else if (lastEntry.category === 'Strength') {
    const sets = await this.dbService.getLastSetsByWorkoutExerciseId(lastEntry.id);
    this.strengthData.sets = sets;
  } else if (lastEntry.category === 'Bodyweight') {
    this.reps = lastEntry.reps ?? 0;
  }
  }
}
