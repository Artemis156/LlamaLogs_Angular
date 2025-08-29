import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightUnitService {
  private unitSubject = new BehaviorSubject<'kg' | 'lbs'>('kg');
  weightUnit$ = this.unitSubject.asObservable();

  constructor() {
    const savedUnit = localStorage.getItem('weightUnit') as 'kg' | 'lbs';
    if (savedUnit) {
      this.unitSubject.next(savedUnit);
    }
  }

  setWeightUnit(unit: 'kg' | 'lbs') {
    this.unitSubject.next(unit);
  }

  getCurrentUnit(): 'kg' | 'lbs' {
    return this.unitSubject.value;
  }
}
