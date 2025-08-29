import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardioService {
  cardio: any;

  constructor() {}

  async getCardio(): Promise<any[]> {
    try {
      const response: Response = await fetch('assets/mock-data/cardio.json');
      this.cardio = await response.json();
      return this.cardio;
    } catch (error) {
      console.error('Fehler beim Laden der Übungen:', error);
      return [];
    }
  }
}
