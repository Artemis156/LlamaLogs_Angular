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
  date?: string; // nur für getLastExerciseByID
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private exercise: WritableSignal<Exercise[]> = signal([]);

  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.initializPlugin().then(() => {});
  }

  async initializPlugin(): Promise<void> {
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
      ('2023-10-03', 'Evening cardio session.');
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
      (1, 1, 4, 8, NULL, NULL, NULL, 'Increased weight.'),
      (2, 3, NULL, NULL, 30, 5, 300, 'Good endurance.'),
      (2, 5, NULL, NULL, 20, 8, 250, 'Challenging but manageable.');
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

    return;
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
    note?: string
  ): Promise<number> {
    const res = await this.db.run(
      `INSERT INTO workout_exercises (workout_id, exercise_id, reps, note) VALUES (?, ?, ?, ?)`,
      [workoutId, exerciseId, reps, note ?? null]
    );
    return res.changes?.lastId ?? -1;
  }

  async addCardioExercise(
    workoutId: number,
    exerciseId: number,
    duration: number,
    distance: number,
    calories?: number,
    note?: string
  ): Promise<number> {
    const res = await this.db.run(
      `INSERT INTO workout_exercises (workout_id, exercise_id, duration, distance, calories, note) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        workoutId,
        exerciseId,
        duration,
        distance,
        calories ?? null,
        note ?? null,
      ]
    );
    return res.changes?.lastId ?? -1;
  }

  async addStrengthExercise(
    workoutId: number,
    exerciseId: number,
    note?: string
  ): Promise<number> {
    const res = await this.db.run(
      `INSERT INTO workout_exercises (workout_id, exercise_id, note) VALUES (?, ?, ?)`,
      [workoutId, exerciseId, note ?? null]
    );
    return res.changes?.lastId ?? -1;
  }

  async addStrengthSet(
    workoutExerciseId: number,
    weight: number,
    repetitions: number
  ): Promise<void> {
    await this.db.run(
      `INSERT INTO workout_exercise_sets (workout_exercise_id, weight, repetitions) VALUES (?, ?, ?)`,
      [workoutExerciseId, weight, repetitions]
    );
  }

  async getLastWorkout(): Promise<WorkoutExercise[]> {
    await this.initialized;
    try {
      const res = await this.db.query(
        `
      SELECT we.*, e.name, e.type as category
      FROM workout_exercises we
      JOIN exercises e ON we.exercise_id = e.id
      JOIN workouts w ON we.workout_id = w.id
      WHERE w.date = (SELECT MAX(date) FROM workouts)
    `
      );
      const values = res.values as WorkoutExercise[] | undefined;

      if (!values || values.length === 0) {
        console.log('No exercises found for the last workout.');
        return [];
      }
      return values;
    } catch (error) {
      console.error('Error fetching last workout:', error);
      return [];
    }
  }

  async getLastExerciseByID(
    exerciseId: number
  ): Promise<WorkoutExercise | null> {
    const res = await this.db.query(
      `
      SELECT we.*, w.date, e.name, e.type as category
      FROM workout_exercises we
      JOIN exercises e ON we.exercise_id = e.id
      JOIN workouts w ON we.workout_id = w.id
      WHERE we.exercise_id = ?
      ORDER BY w.date DESC
      LIMIT 1
    `,
      [exerciseId]
    );
    const values = res.values as any[] | undefined;

    if (!values || values.length === 0) {
      console.log('No previous entries found for this exercise.');
      return null;
    } else {
      return values[0] as WorkoutExercise;
    }
  }

  async getLastSetsByWorkoutExerciseId(
    workoutExerciseId: number
  ): Promise<{ weight: number; repetitions: number }[]> {
    try {
      const res = await this.db.query(
        `
      SELECT weight, repetitions
      FROM workout_exercise_sets
      WHERE workout_exercise_id = ?
      ORDER BY id DESC
    `,
        [workoutExerciseId]
      );
      const values = res.values as
        | { weight: number; repetitions: number }[]
        | undefined;
      return values || [];
    } catch (error) {
      console.error('Error fetching last sets by workout exercise ID:', error);
      return [];
    }
  }

  async startWorkout(note: string = ''): Promise<number> {
    const date = new Date().toISOString().split('T')[0]; //(z.B. "2025-10-04")

    // WICHTIG: Sicherstellen, dass die Datenbank geöffnet ist, falls
    // der APP_INITIALIZER nicht richtig eingerichtet wurde.
    // Wenn der APP_INITIALIZER verwendet wird, ist dies nicht nötig.
    // await this.initialized; // Falls Sie die manuelle Initialisierungs-Promise verwenden

    try {
      const res = await this.db.run(
        `INSERT INTO workouts (date, note) VALUES (?, ?)`,
        [date, note]
      );

      const newWorkoutId = res.changes?.lastId ?? -1;

      if (newWorkoutId === -1) {
        console.error(
          'Failed to get the last inserted ID for the new workout.'
        );
      }

      return newWorkoutId;
    } catch (error) {
      console.error('Error starting new workout:', error);
      // Bei einem Fehler geben wir -1 oder eine andere Fehlerkennung zurück.
      return -1;
    }
  }
}
