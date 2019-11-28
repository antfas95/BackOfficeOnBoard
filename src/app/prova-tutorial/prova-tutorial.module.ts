import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProvaTutorialPage } from './prova-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: ProvaTutorialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProvaTutorialPage]
})
export class ProvaTutorialPageModule {}
