import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightUnitService } from 'src/app/services/weight_unit.service';
import { DistanceUnitService } from 'src/app/services/distance_unit.service';
import { DatabaseService } from 'src/app/services/database.service';

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
  time: number = 0;
  distance: number = 0;
  reps: number = 0;
  strengthData: { sets: { weight: number; repetitions: number }[] } = {
    sets: [],
  };
  @Input() exercise: Equipment | null = null;

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
    const lastEntry = await this.dbService.getLastEntryByExercise(
      this.exercise.name
    );
    if (!lastEntry) return;
    this.date = new Date(lastEntry.date);
    if (lastEntry.type === 'cardio') {
      this.time = lastEntry.time;
      this.distance = lastEntry.distance;
    } else if (lastEntry.type === 'strength') {
      const sets = await this.dbService.getLastSetsByWorkoutExerciseId(
        lastEntry.id
      );
      this.strengthData.sets = sets;
    } else {
      this.reps = lastEntry.reps || 0;
    }
  }
}
