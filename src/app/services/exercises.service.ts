import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercises: any;

  constructor() {}

  async getExercises(): Promise<any[]> {
    try {
      const response: Response = await fetch('assets/mock-data/exercises.json');
      this.exercises = await response.json();
      return this.exercises;
    } catch (error) {
      console.error('Fehler beim Laden der Übungen:', error);
      return [];
    }
  }

  async getExerciseById(id: number): Promise<any | null> {
    try {
      const response: Response = await fetch('assets/mock-data/exercises.json');
      const exercises = await response.json();
      return exercises.find((exercise: any) => exercise.id === id) || null;
    } catch (error) {
      console.error('Fehler beim Laden der Übung:', error);
      return null;
    }
  }
}
