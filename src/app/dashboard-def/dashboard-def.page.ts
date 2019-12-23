import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-def',
  templateUrl: './dashboard-def.page.html',
  styleUrls: ['./dashboard-def.page.scss'],
})
export class DashboardDefPage implements OnInit {

  idPassato: string;

  constructor(public router: Router, private navCTRL: NavController, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.idPassato = this.activated.snapshot.paramMap.get('email');
    console.log ('Ecco il parametro che è stato passato: ' + this.idPassato);
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
