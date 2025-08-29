import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  enableDark() {
    document.body.classList.add('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }

  disableDark() {
    document.body.classList.remove('dark');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }

  loadUserPreference() {
    const dark = localStorage.getItem('darkMode') === 'true';
    if (dark) {
      this.enableDark();
    } else {
      this.disableDark();
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }
}
