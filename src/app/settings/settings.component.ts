import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeightUnitService } from '../services/weight_unit.service';
import { DistanceUnitService } from '../services/distance_unit.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SettingsComponent {
  darkMode = false;
  weightUnit: 'kg' | 'lbs' = 'kg';
  distanceUnit: 'km' | 'mi' = 'km';
  language: string = 'de';

  constructor(
    private weightUnitService: WeightUnitService,
    private distanceUnitService: DistanceUnitService,
  ) {

    this.weightUnit =
      (localStorage.getItem('weightUnit') as 'kg' | 'lbs') || 'kg';
    this.distanceUnit =
      (localStorage.getItem('distanceUnit') as 'km' | 'mi') || 'km';
    this.language = localStorage.getItem('language') || 'de';
  }

  saveUnitPreference(type: 'weight' | 'distance', value: string) {
    localStorage.setItem(type + 'Unit', value);
    this.weightUnitService.setWeightUnit(this.weightUnit);
    this.distanceUnitService.setDistanceUnit(this.distanceUnit);
  }

  changeLanguage(lang: string) {
    localStorage.setItem('language', lang);
    // Optional: reload translations here
  }

  weightSelect = {
    header: 'Select Weight Unit',
    subHeader: '',
    cssClass: 'custom-select-alert',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'custom-cancel-button',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
      {
        text: 'OK',
        handler: (value: any) => {
          console.log('OK clicked with value:', value);
        },
      },
    ],
  }

  distanceSelect = {
    header: 'Select Distance Unit',
    subHeader: '',
    cssClass: 'custom-select-alert',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'custom-cancel-button',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
      {
        text: 'OK',
        handler: (value: any) => {
          console.log('OK clicked with value:', value);
        },
      },
    ],
  }

  languageSelect = {
    header: 'Select Language',
    subHeader: '',
    cssClass: 'custom-select-alert',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'custom-cancel-button',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
      {
        text: 'OK',
        handler: (value: any) => {
          console.log('OK clicked with value:', value);
        },
      },
    ],
  }

}
