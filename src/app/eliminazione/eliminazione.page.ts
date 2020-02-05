import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../models/Utente';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-eliminazione',
  templateUrl: './eliminazione.page.html',
  styleUrls: ['./eliminazione.page.scss'],
})
export class EliminazionePage implements OnInit {

  presenza: boolean;

  ricercaFatta: boolean;
  valorericerca: string;
  items: Observable<Utente[]>;
  utente: Utente;

  emailAuth: string;
  user: any;

  constructor(public alertCtrl: AlertController, private authService: AuthenticationService, public router: Router, public uS: UtenteService) {
    this.valorericerca = '';
    this.ricercaFatta = false;
    this.presenza = false;

    this.user = this.authService.userDetails();

    if (this.user) {
        // User is signed in.
        console.log ('Utente loggato');
        this.emailAuth = this.authService.userDetails().email;
      } else {
        console.log ('Utente non loggato ');
        this.reload();
        //this.authService.logoutUser();
        //this.router.navigate(['home']);
        // No user is signed in.
    }
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
    this.ricercaFatta = false;
  }

  eliminaUtente(utente: Utente) {
    console.log('Provo a fare eliminazione, ecco il nome utente da eliminare: ' + utente.id);
    this.uS.eliminaUtente(utente);
    this.presentEliminazione ('Utente ' + utente.email +  ' eliminato correttamente');
  }

  effettuaRicerca() {
    if (this.valorericerca === '') {
      //this.presentAlert ('Nulla nel campo della ricerca');
      console.log('Ricerca non corretta inserisci qualcosa dentro la barra di ricerca');
    } else {
      console.log('Provo a fare la query: ' + this.valorericerca);
      this.items = this.uS.getUserEmail(this.valorericerca);
      this.presenza = this.uS.getUtentePresenzaDb(this.valorericerca);
      console.log ('Valore della presenza: ' + this.presenza);
      if (this.presenza === false) {
        this.presentAlert('La ricerca non ha portato nessun risultato');
        this.ricercaFatta = false;
      } else {
        this.ricercaFatta = true;
      }
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async presentEliminazione(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Elimina utente',
      message: '' + message,
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

  async modificaUtente(utente: Utente) {
    const confirm = this.alertCtrl.create({
      header: 'Assunzione utente',
      message: 'Sei sicuro di voler assumere: ' + utente.email,
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
            this.presentAlert('Domanda non rigettata');
            return;
          }
        },
        {
          text: 'SI',
          handler: data => {
            this.uS.modificaUtente(utente);
          }
        }
      ]
    });
    (await confirm).present();
  }
}