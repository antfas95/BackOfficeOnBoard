import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-def',
  templateUrl: './dashboard-def.page.html',
  styleUrls: ['./dashboard-def.page.scss'],
})
export class DashboardDefPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['home']);
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
  }

  paginAnnunci() {
    this.router.navigate(['annuncio']);
  }

  paginaIncontri() {
    this.router.navigate(['incontro']);
  }

  approvaDomanda() {
    this.router.navigate(['approvazione']);
  }

  eliminaUtente() {
    this.router.navigate(['eliminazione']);
  }

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
  }

  aggiungiReferente() {
    this.router.navigate(['add-referente']);
  }

  eliminaReferente() {
    this.router.navigate(['elimina-referente']);
  }
}
