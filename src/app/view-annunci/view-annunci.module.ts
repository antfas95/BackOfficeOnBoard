import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewAnnunciPage } from './view-annunci.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAnnunciPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewAnnunciPage]
})
export class ViewAnnunciPageModule {}
