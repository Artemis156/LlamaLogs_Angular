// src/app/services/refresh.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private refresh$ = new Subject<void>();

  // Observable, das Komponenten abonnieren können
  public get onRefresh(): Observable<void> {
    return this.refresh$.asObservable();
  }

  // Methode, die von anderen Komponenten aufgerufen wird, um das Event auszulösen
  public notifyRefresh(): void {
    this.refresh$.next();
  }
}