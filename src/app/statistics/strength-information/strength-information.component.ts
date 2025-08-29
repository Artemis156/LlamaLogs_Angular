import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { barbellOutline } from 'ionicons/icons';
import { WeightUnitService } from 'src/app/services/weight_unit.service';

@Component({
  selector: 'app-strength-information',
  templateUrl: './strength-information.component.html',
  styleUrls: ['./strength-information.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class StrengthInformationComponent implements OnInit {
  weightUnit: 'kg' | 'lbs';
  constructor(private weightUnitService: WeightUnitService) {
    addIcons({ barbellOutline });
    this.weightUnit = this.weightUnitService.getCurrentUnit();
  }

  workouts = [
    {
      date: '2025-06-17',
      sets: [
        { repetitions: 10, weight: 50 },
        { repetitions: 8, weight: 55 },
      ],
    },
    {
      date: '2025-06-15',
      sets: [
        { repetitions: 12, weight: 45 },
        { repetitions: 10, weight: 50 },
        { repetitions: 8, weight: 55 },
      ],
    },
    {
      date: '2025-06-13',
      sets: [{ repetitions: 15, weight: 40 }],
    },
  ];

  ngOnInit() {
    this.weightUnitService.weightUnit$.subscribe((unit) => {
      this.weightUnit = unit;
    });
  }
}
