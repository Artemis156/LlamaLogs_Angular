import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const DB = 'llamaLogsDB';

@Injectable({
  providedIn: 'root',
})
export class DatabaseWorkoutService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor() {}

  async initializPlugin() {
    this.db = await this.sqlite.createConnection(
      DB,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    let schema = `
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      note TEXT
      );
    `;

    await this.db.execute(schema);

    schema = `
        CREATE TABLE IF NOT EXISTS workout_exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          exercise_id INTEGER NOT NULL,
          sets INTEGER,
          reps INTEGER,
          duration REAL,
          distance REAL,
          calories REAL,
          note TEXT
        );
    `;

    await this.db.execute(schema);

    schema = `
        CREATE TABLE IF NOT EXISTS workout_exercise_sets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_exercise_id INTEGER NOT NULL,
          weight REAL NOT NULL,
          repetitions INTEGER NOT NULL
        );
    `;

    await this.db.execute(schema);
  }

  async addWorkout(date: string, note: string): Promise<number> {
    const res = await this.db.run(
      `INSERT INTO workouts (date, note) VALUES (?, ?)`,
      [date, note]
    );
    return res.changes?.lastId ?? -1;
  }

  async addBodyweightExercise(
    workoutId: number,
    exerciseId: number,
    reps: number,
    note: string
  ): Promise<number> {
    const res = await this.db.run(
      `INSERT INTO workout_exercises (workout_id, exercise_id, reps, note) VALUES (?, ?, ?, ?)`,
      [workoutId, exerciseId, reps, note]
    );
    return res.changes?.lastId ?? -1;
  }

async getLastWorkoutBodyweight() {
  const res = await this.db.query(
    `SELECT * FROM workout_exercises 
     WHERE workout_id = (SELECT MAX(workout_id) FROM workout_exercises) 
     AND reps IS NOT NULL`
  );
  return res.values ?? [];
}

async getLastWorkout() {
  try {
    const bodyweightData = await this.getLastWorkoutBodyweight();
    if (!bodyweightData || bodyweightData.length === 0) {
      console.log("Noch keine Workouts in der Datenbank gespeichert.");
      return null;
    }
    return bodyweightData;
  } catch (error) {
    console.error("Fehler beim Laden des letzten Workouts:", error);
    return null;
  }
}

    
}
