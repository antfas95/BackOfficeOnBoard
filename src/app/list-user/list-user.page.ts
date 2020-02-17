import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Utente } from '../models/Utente';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectuserService } from '../services/selectuser.service';
import { AlertController } from '@ionic/angular';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {

  utenti: Observable<Utente[]>;
  user: any;
  emailAuth: string;

  constructor(public userService: UtenteService, public alertCtrl: AlertController, private authService: AuthenticationService, public router: Router, public selezionato: SelectuserService) {
    this.user = this.authService.userDetails();
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
    this.utenti = this.userService.ritornoUtenti();
    // this.count = this.iS.getIncontriInfo(this.emailAuth);
    // console.log ('Ecco il ritorno di riferimento: ' + this.count);
   }

  ngOnInit() {
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
    this.router.navigate(['dashboard-def']);
  }

  logout() {
    this.authService.logoutUser();
    this.selezionato.setUtente('');
    this.router.navigate(['dashboard-def']);
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
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

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
    this.selezionato.setUtente('');
  }
}
