import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'registrazione', loadChildren: './registrazione/registrazione.module#RegistrazionePageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'annuncio', loadChildren: './annuncio/annuncio.module#AnnuncioPageModule' },
  { path: 'view-annunci', loadChildren: './view-annunci/view-annunci.module#ViewAnnunciPageModule' },
  { path: 'incontro', loadChildren: './incontro/incontro.module#IncontroPageModule' },
  { path: 'eliminazione', loadChildren: './eliminazione/eliminazione.module#EliminazionePageModule' },
  { path: 'approvazione', loadChildren: './approvazione/approvazione.module#ApprovazionePageModule' },
  { path: 'carica-documenti', loadChildren: './carica-documenti/carica-documenti.module#CaricaDocumentiPageModule' },
  { path: 'dashboard-def', loadChildren: './dashboard-def/dashboard-def.module#DashboardDefPageModule' },
  { path: 'add-referente', loadChildren: './add-referente/add-referente.module#AddReferentePageModule' },
  { path: 'elimina-referente', loadChildren: './elimina-referente/elimina-referente.module#EliminaReferentePageModule' },
  { path: 'prova-tutorial', loadChildren: './prova-tutorial/prova-tutorial.module#ProvaTutorialPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
