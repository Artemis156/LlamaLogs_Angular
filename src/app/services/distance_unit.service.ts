import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistanceUnitService {
  private unitSubject = new BehaviorSubject<'km' | 'mi'>('km');
  distanceUnit$ = this.unitSubject.asObservable();

  constructor() {
    const savedUnit = localStorage.getItem('distanceUnit') as 'km' | 'mi';
    if (savedUnit) {
      this.unitSubject.next(savedUnit);
    }
  }

  setDistanceUnit(unit: 'km' | 'mi') {
    this.unitSubject.next(unit);
  }

  getCurrentUnit(): 'km' | 'mi' {
    return this.unitSubject.value;
  }
}
