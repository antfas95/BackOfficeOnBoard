import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferenteService } from '../services/referente.service';
import { Referente } from '../models/Referente';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-elimina-referente',
  templateUrl: './elimina-referente.page.html',
  styleUrls: ['./elimina-referente.page.scss'],
})
export class EliminaReferentePage implements OnInit {

  ricercaFatta: boolean;
  valorericerca: string;
  items: Observable<Referente[]>;

  emailAuth: string;
  user: any;

  constructor(public alertCtrl: AlertController, private authService: AuthenticationService, public router: Router, public uS: ReferenteService) {
    this.valorericerca = '';
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
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

  elimnaReferente() {
    alert('Referente eliminato con successo');
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  eliminaUtente(utente: Referente) {
    console.log('Provo a fare eliminazione, ecco il nome utente da eliminare: ' + utente.id);
    this.uS.eliminaUtente(utente);
    this.presentEliminazione ('Utente' + utente.email + 'Eliminato con successo');
  }

  effettuaRicerca() {
    if (this.valorericerca === '') {
      console.log('Ricerca non corretta inserisci qualcosa dentro la barra di ricerca');
    } else {
      this.ricercaFatta = true;
      console.log('Provo a fare la query: ' + this.valorericerca);
      this.items = this.uS.getReferenteByEmail(this.valorericerca);
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

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
  }

  paginaIncontri() {
    this.router.navigate(['incontro']);
  }

  approvaDomanda() {
    this.router.navigate(['approvazione']);
  }

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
  }
}
