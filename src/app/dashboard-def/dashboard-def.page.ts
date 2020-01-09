import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IncontroService } from '../services/incontro.service';
import { Incontro } from '../models/Incontro';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-dashboard-def',
  templateUrl: './dashboard-def.page.html',
  styleUrls: ['./dashboard-def.page.scss'],
})
export class DashboardDefPage implements OnInit {

  emailAuth: string;

  idPassato: string;
  incontri: Observable<Incontro[]>;

  constructor(public router: Router, private navCTRL: NavController, private activated: ActivatedRoute, private iS: IncontroService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.emailAuth = this.authService.userDetails().email;
    console.log ('Ecco utente passato: ' + this.emailAuth);
    this.incontri = this.iS.getIncontriByReferenti(this.emailAuth);
    // this.idPassato = this.activated.snapshot.paramMap.get('email');
    // this.incontri = this.iS.getIncontriByReferenti('roberto.lagana@sella.it');
    // console.log ('Ecco il parametro che è stato passato: ' + this.idPassato);
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
