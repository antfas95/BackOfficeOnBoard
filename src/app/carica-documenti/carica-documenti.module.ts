import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CaricaDocumentiPage } from './carica-documenti.page';

const routes: Routes = [
  {
    path: '',
    component: CaricaDocumentiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CaricaDocumentiPage]
})
export class CaricaDocumentiPageModule {}
