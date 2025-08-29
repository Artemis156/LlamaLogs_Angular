import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeightService {
  weight: any;

  constructor() {}

  async getWeight(): Promise<any[]> {
    try {
      const response: Response = await fetch('assets/mock-data/weight.json');
      this.weight = await response.json();
      return this.weight;
    } catch (error) {
      console.error('Fehler beim Laden der Übungen:', error);
      return [];
    }
  }
}
