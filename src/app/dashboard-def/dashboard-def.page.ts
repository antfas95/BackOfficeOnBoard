import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IncontroService } from '../services/incontro.service';
import { Incontro } from '../models/Incontro';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard-def',
  templateUrl: './dashboard-def.page.html',
  styleUrls: ['./dashboard-def.page.scss'],
})
export class DashboardDefPage implements OnInit {

  count: boolean;

  emailAuth: string;

  idPassato: string;
  incontri: Observable<Incontro[]>;

  user: any;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, public router: Router, private navCTRL: NavController, private activated: ActivatedRoute, private iS: IncontroService, private authService: AuthenticationService) {
    this.user = this.authService.userDetails();
    this.count = false;

    if (this.user) {
        // User is signed in.
        console.log ('Utente loggato');
        this.emailAuth = this.authService.userDetails().email;
      } else {
        console.log ('Utente non loggato ');
        this.authService.logoutUser();
        this.router.navigate(['home']);
        // No user is signed in.
      }
    this.reload();
   }

   reload() {
    console.log ('Mi trovo nel reload' + this.emailAuth);
    this.incontri = this.iS.getIncontriByReferenti(this.emailAuth);
    this.count = this.iS.getIncontriInfo(this.emailAuth);
    console.log ('Ecco il ritorno di riferimento: ' + this.count);
   }

  ngOnInit() {

    /*
      this.emailAuth = this.authService.userDetails().email;
      console.log ("Ecco emailAutenticazione: " + this.emailAuth);
      console.log ('Ecco la stringa che viene ritornata: ' + this.authService.userDetails());
      console.log ('Utente loggato');
      console.log ('Ecco utente passato: ' + this.emailAuth);
      this.incontri = this.iS.getIncontriByReferenti(this.emailAuth);
      this.count = this.iS.getIncontriInfo(this.emailAuth);
    */

    /*
    if (this.authService.userDetails().toJSON === null) {
      console.log ('Errore email non presente');
      this.router.navigate(['home']);
    } else {
      console.log ('Trovata email di riferimento');
      this.emailAuth = this.authService.userDetails().email;
    }
    */
    // this.idPassato = this.activated.snapshot.paramMap.get('email');
    // this.incontri = this.iS.getIncontriByReferenti('roberto.lagana@sella.it');
    // console.log ('Ecco il parametro che è stato passato: ' + this.idPassato);
  }

  ngOnDestroy(){

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

  altreFunzioni() {
    this.presentAlert ('Funzione ancora non implementata');
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: 'Non hai inserito ' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  otherFunction() {
    this.presentAlert ('Funzione ancora non implementata');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }
}
