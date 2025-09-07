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

    const schema = `
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      description TEXT
    );
  `;

    await this.db.execute(schema);
    const result = await this.db.query(
      'SELECT COUNT(*) as count FROM exercises'
    );

    const count =
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
}
