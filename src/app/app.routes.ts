import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add_workout/select_exercise',
    loadComponent: () =>
      import('./add-workout/select-exercise/select-exercise.component').then(
        (m) => m.SelectExerciseComponent
      ),
  },
  {
    path: 'add_workout/add_bodyweight',
    loadComponent: () =>
      import('./add-workout/add-bodyweigth/add-bodyweigth.component').then(
        (m) => m.AddBodyweigthComponent
      ),
  },
  {
    path: 'add_workout/add_strength',
    loadComponent: () =>
      import('./add-workout/add-strength/add-strength.component').then(
        (m) => m.AddStrengthComponent
      ),
  },
  {
    path: 'add_workout/add_cardio',
    loadComponent: () =>
      import('./add-workout/add-cardio/add-cardio.component').then(
        (m) => m.AddCardioComponent
      ),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
