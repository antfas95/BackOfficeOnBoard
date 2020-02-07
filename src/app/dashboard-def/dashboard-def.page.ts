import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IncontroService } from '../services/incontro.service';
import { Incontro } from '../models/Incontro';
import { Utente } from '../models/Utente';
import { UtenteService } from '../services/utente.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { SelectuserService } from '../services/selectuser.service';


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
  utenti: Observable<Utente[]>;

  user: any;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, public router: Router, private navCTRL: NavController, private activated: ActivatedRoute, private iS: IncontroService, private authService: AuthenticationService, public userService: UtenteService, public selezionato: SelectuserService) {
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
    this.utenti = this.userService.getUsers();
    // this.count = this.iS.getIncontriInfo(this.emailAuth);
    // console.log ('Ecco il ritorno di riferimento: ' + this.count);
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

  async secgliOption(utente: Utente) {
    this.selezionato.setUtente(utente.email);
    console.log ('valore utente: ' + this.selezionato.getUtente());
    const confirm = this.alertCtrl.create({
      header: 'Scegli cosa vuoi fare per il cliente selezionato',
      buttons: [
        {
          text: 'Approvazione documenti',
          handler: () => {
            this.router.navigate(['approvazione']);
            return;
          }
        },
        {
          text: 'Elimina/Approva Utente',
          handler: data => {
            this.router.navigate(['eliminazione']);
            return;
            // Check description
            //this.motivazione = data.motivazione;
            //console.log ('Ecco la motivazione inserita: ' + this.motivazione);
          }
        },
        {
          text: 'Inserisci incontro',
          handler: data => {
            this.router.navigate(['incontro']);
            return;
            // Check description
            //this.motivazione = data.motivazione;
            //console.log ('Ecco la motivazione inserita: ' + this.motivazione);
          }
        },
        {
          text: 'Annulla',
          handler: data => {
            return;
            // Check description
            //this.motivazione = data.motivazione;
            //console.log ('Ecco la motivazione inserita: ' + this.motivazione);
          }
        },
      ]
    });
    (await confirm).present();
  }

  goBack() {
    this.logout();
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
    this.selezionato.setUtente('');
  }

  paginAnnunci() {
    this.router.navigate(['annuncio']);
    this.selezionato.setUtente('');
  }

  paginaIncontri() {
    this.router.navigate(['incontro']);
    this.selezionato.setUtente('');
  }

  approvaDomanda() {
    this.router.navigate(['approvazione']);
    this.selezionato.setUtente('');
  }

  eliminaUtente() {
    this.router.navigate(['eliminazione']);
    this.selezionato.setUtente('');
  }

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
    this.selezionato.setUtente('');
  }

  aggiungiReferente() {
    this.router.navigate(['add-referente']);
    this.selezionato.setUtente('');
  }

  eliminaReferente() {
    this.router.navigate(['elimina-referente']);
    this.selezionato.setUtente('');
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
    this.selezionato.setUtente('');
  }

  logout() {
    this.authService.logoutUser();
    this.selezionato.setUtente('');
    this.router.navigate(['home']);
  }
}
