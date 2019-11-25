import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goback() {
    this.router.navigate(['home']);
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
  }

  paginaAnnuncio() {
    this.router.navigate(['annuncio']);
  }

  paginaInserisciIncontro() {
    this.router.navigate(['incontro']);
  }

  eliminaUtente() {
    this.router.navigate(['eliminazione']);
  }

  paginaApprovazione() {
    this.router.navigate(['approvazione']);
  }

  paginaCaricamento() {
    this.router.navigate(['carica-documenti']);
  }

  caricaDocumento() {
    this.router.navigate(['carica-documenti']);
  }
}
