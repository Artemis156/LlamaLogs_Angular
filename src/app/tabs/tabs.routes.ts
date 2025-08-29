import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('../statistics/statistics.component').then(
            (m) => m.StatisticsComponent
          ),
      },
      {
        path: 'add_workout',
        loadComponent: () =>
          import('../add-workout/add-workout.component').then(
            (m) => m.AddWorkoutComponent
          ),
      },
      {
        path: 'exercises',
        loadComponent: () =>
          import('../exercises/exercises.component').then(
            (m) => m.ExercisesComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
