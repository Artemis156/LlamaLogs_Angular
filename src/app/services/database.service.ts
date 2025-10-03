import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const DB = 'llamaLogsDB';

export interface Exercise {
  id: number;
  name: string;
  type: string;
  description: string;
}

export interface Workout {
  id: number;
  date: string; // ISO Datum als Text
  note?: string; // optional
}

export type ExerciseCategory = 'Strength' | 'Cardio' | 'Bodyweight';

export interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: number;
  sets?: number;
  reps?: number;
  duration?: number;
  distance?: number;
  calories?: number;
  note?: string;
  // zusätzliche Felder aus JOIN
  name: string;
  category: ExerciseCategory;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private exercise: WritableSignal<Exercise[]> = signal([]);

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
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT
    );
  `;

    await this.db.execute(schema);
    let result = await this.db.query('SELECT COUNT(*) as count FROM exercises');

    let count =
      result.values && result.values.length > 0 ? result.values[0].count : 0;

    if (count === 0) {
      const initData = `
      INSERT INTO exercises (name, type, description) VALUES
      ('Barbell', 'Strength', 'Used for weightlifting exercises.'),
      ('Dumbbell', 'Strength', 'Used for free weight training.'),
      ('Treadmill', 'Cardio', 'Used for indoor running.'),
      ('Pull-up Bar', 'Bodyweight', 'Used for upper-body exercises.'),
      ('Stationary Bike', 'Cardio', 'Indoor cycling equipment.'),
      ('Resistance Bands', 'Bodyweight', 'Used for resistance training.');
    `;

      await this.db.execute(initData);
    }

    await this.loadExercises();

    schema = `
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      note TEXT
      );
    `;

    await this.db.execute(schema);
    result = await this.db.query('SELECT COUNT(*) as count FROM workouts');

    count =
      result.values && result.values.length > 0 ? result.values[0].count : 0;

    if (count === 0) {
      let initData = `
      INSERT INTO workouts (date, note) VALUES
      ('2023-10-01', 'Morning workout session.'),
      ('2023-10-02', 'Evening cardio session.');
    `;

      await this.db.execute(initData);
    }

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

    result = await this.db.query(
      'SELECT COUNT(*) as count FROM workout_exercises'
    );

    count =
      result.values && result.values.length > 0 ? result.values[0].count : 0;
    if (count === 0) {
      let initData = `
      INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, duration, distance, calories, note) VALUES
      (1, 4, 3, 10, 10, 10, 10, 'Felt strong today.');
    `;

      await this.db.execute(initData);
    }

    schema = `
        CREATE TABLE IF NOT EXISTS workout_exercise_sets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_exercise_id INTEGER NOT NULL,
          weight REAL NOT NULL,
          repetitions INTEGER NOT NULL
        );
    `;

    await this.db.execute(schema);

    return true;
  }

  getExercises(): Exercise[] {
    return this.exercise();
  }

  async loadExercises() {
    const res = await this.db.query('SELECT * FROM exercises');
    this.exercise.set((res.values as Exercise[]) || []);
  }

  async addExercise(ex: Omit<Exercise, 'id'>) {
    const insert = `
      INSERT INTO exercises (name, type, description) 
      VALUES (?, ?, ?);
    `;
    const values = [ex.name, ex.type, ex.description];
    await this.db.run(insert, values);
    await this.loadExercises();
  }

  async updateExercise(ex: Exercise) {
    const update = `
      UPDATE exercises 
      SET name = ?, type = ?, description = ? 
      WHERE id = ?;
    `;
    const values = [ex.name, ex.type, ex.description, ex.id];
    await this.db.run(update, values);
    await this.loadExercises();
  }

  async deleteExercise(id: number) {
    const del = `
      DELETE FROM exercises 
      WHERE id = ?;
    `;
    await this.db.run(del, [id]);
    await this.loadExercises();
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

  /*async getLastWorkout() {
    try {
      const bodyweightData = await this.getLastWorkoutBodyweight();
      if (!bodyweightData || bodyweightData.length === 0) {
        console.log('Noch keine Workouts in der Datenbank gespeichert.');
        return null;
      }
      return bodyweightData;
    } catch (error) {
      console.error('Fehler beim Laden des letzten Workouts:', error);
      return null;
    }
  }*/

  async getLastWorkout(): Promise<WorkoutExercise[]> {
    try {
      const res = await this.db.query(`
      SELECT we.*, e.name, e.type as category
      FROM workout_exercises we
      JOIN exercises e ON we.exercise_id = e.id
      WHERE we.workout_id = (SELECT MAX(workout_id) FROM workout_exercises)
    `);

      const values = res.values as WorkoutExercise[] | undefined;

      if (!values || values.length === 0) {
        console.log('Noch keine Workouts in der Datenbank gespeichert.');
        return [];
      }
      return values;
    } catch (error) {
      console.error('Fehler beim Laden des letzten Workouts:', error);
      return [];
    }
  }
}
