import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EliminaReferentePage } from './elimina-referente.page';

const routes: Routes = [
  {
    path: '',
    component: EliminaReferentePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EliminaReferentePage]
})
export class EliminaReferentePageModule {}
