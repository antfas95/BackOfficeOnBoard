import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../models/Utente';
import { Referente } from '../models/Referente';
import { ReferenteService } from '../services/referente.service';
import { IncontroService } from '../services/incontro.service';
import { Incontro } from '../models/Incontro';
import { Indirizzi } from '../models/Indirizzi';
import { IndirizziService } from '../services/indirizzi.service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-incontro',
  templateUrl: './incontro.page.html',
  styleUrls: ['./incontro.page.scss'],
})
export class IncontroPage implements OnInit {

  varifica: boolean;
  emailAuth: string;
  valorericerca: string;
  items: Observable<Utente[]>;
  referenti: Observable<Referente[]>;
  sedi: Observable<Indirizzi[]>;
  ricercaSede: boolean;
  ricercaFatta: boolean;
  utenti: Observable<Utente[]>;
  incontri: Observable<Incontro[]>;

  cityMeeting: string;

  incontro: Incontro = {
    emailUtente: '',
    emailReferente: '',
    data: '',
    ora: '',
    indirizzo: '',
  };

  user: any;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, public router: Router, public uS: UtenteService, public iS: IncontroService, public rS: ReferenteService, public indirizzoService: IndirizziService, private authService: AuthenticationService) {
    this.valorericerca = '';
    this.cityMeeting = '';
    this.ricercaSede = false;
    this.ricercaFatta = false;
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
    //this.reload();
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
   }

  ngOnInit() {
    // Funziona solo se effettuo la sessione
    // this.emailAuth = this.authService.userDetails().email;
    console.log ('Valore dal servizio di autenticazione: ' + this.authService.userDetails().email);
    if (this.authService.userDetails().email !== null ) {
      //this.router.navigate(['home']);
      console.log('Ecco errore di riferimento');
    } else {
      console.log ('Valore selezionato giustamente');
      this.emailAuth = this.authService.userDetails().email;
    }
    console.log ('Cerco di prendere il valore utente autenticato nel sistema: ' + this.emailAuth);
    console.log ('Effettuo la query');
    this.ricercaFatta = false;
    this.ricercaSede = false;
    this.referenti = this.rS.getReferenti();
    this.sedi = this.indirizzoService.getSedi();
    console.log ('Ecco gli utenti che sono stati ritornati' + this.sedi);

    if (this.cityMeeting !==  '') {
      console.log('Ecco il valore che è stato inserito: ');
    }
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  inseriscIncontro() {
    alert ('Incontro memorizzato con successo');
  }

  effettuaRicerca() {
    if (this.valorericerca === '') {
      console.log ('Mi trovo nel metodo di controllo');
    } else {
      this.incontro.emailUtente = this.valorericerca;
      this.ricercaFatta = true;
      this.items = this.uS.getUserEmail(this.valorericerca);
      this.iS.initVariabili(this.valorericerca);
    }
  }

  aggiungiIncontro() {
    if (this.valorericerca === '') {
      this.presentAlert("l'utente al quale aggiungere un nuovo incontro");
    } else if (this.incontro.emailReferente === '') {
      this.presentAlert('il referente');
    } else if (this.incontro.data === '') {
      this.presentAlert('la data');
    }  else {
      this.incontro.ora = this.incontro.data.toString().substring(11, 16);
      this.incontro.data = this.incontro.data.toString().substring(0, 10);
      console.log('Ora Incontro: ' + this.incontro.ora);
      const ritorno = this.iS.addIncontro(this.incontro, this.emailAuth);
      console.log ('Ecco il ritorno: ' + ritorno);
      this.presentAlertSuccess ('Incontro inserito in maniera corretta');
    }
    // this.vistaAnnunciInseriti();
  }

  ricercaIndirizzi() {
    console.log ('Mi trovo nel metodo: ' + this.cityMeeting);
    if (this.cityMeeting === '') {
      console.log ('Deve essere ancora inserito un valore');
    } else {
      console.log ('Ecco il valore della riceca: ' + this.cityMeeting);
      this.ricercaSede = true;
      this.sedi = this.indirizzoService.getSediProvincia(this.cityMeeting);
      console.log ('Ecco le sedi di ritorno: ' + this.sedi);
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: 'Non hai inserito ' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  effettuaProve() {
    this.incontri = this.iS.getIncontri();
    console.log ('Ecco le sedi' + this.sedi + 'Ecco la città: ' + this.cityMeeting);
  }

  async presentAlert1(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: 'Non hai inserito ' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async presentAlertSuccess(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  otherFunction() {
    this.presentAlert1 ('Funzione ancora non implementata');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }
}
