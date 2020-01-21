import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnunciService } from '../services/annunci.service';
import { Annunci } from '../models/Annunci';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-annuncio',
  templateUrl: './annuncio.page.html',
  styleUrls: ['./annuncio.page.scss'],
})
export class AnnuncioPage implements OnInit {

  annunciAggiunti: boolean;
  annunci: Observable<Annunci[]>;
  dataGenerata: Date;

  annuncio: Annunci = {
    titolo: '',
    descrizione: '',
    data: '',
    ora: ''
  };

  emailAuth: string;
  user: any;

  constructor(private authService: AuthenticationService, public alertCtrl: AlertController, public router: Router, public annunciService: AnnunciService) {
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
    this.vistaAnnunciInseriti();
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.dataGenerata = new Date ();
    console.log(this.dataGenerata.toISOString());
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  vistaAnnunci() {
    this.router.navigate(['view-annunci']);
  }

  aggiungiAnnuncio() {
    if (this.annuncio.titolo === '') {
      this.presentAlert ('il titolo');
    } else if (this.annuncio.data === '') {
      this.presentAlert ('la data');
    } else if (this.annuncio.descrizione === '') {
      this.presentAlert ('i dettagli');
    } else {
      this.annuncio.ora = this.annuncio.data.toString().substring(11, 16);
      this.annuncio.data = this.annuncio.data.toString().substring(0, 10);
      console.log('Ora annuncio: ' + this.annuncio.ora);
      this.presentAlertSuccess ('Annuncio inserito in maniera corretta');
      const ritorno = this.annunciService.addAnnuncio(this.annuncio);
      this.vistaAnnunciInseriti();
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

  vistaAnnunciInseriti() {
    this.annunci = this.annunciService.getAnnunci();
    if (this.annunci == null) {
      console.log ('Non ci sono annunci caricati');
      this.annunciAggiunti = false;
    } else {
      console.log ('Ecco la lista dei miei annunci che sono stati inseriti' + this.annunci);
      this.annunciAggiunti = true;
    }
  }

  elimanAnnuncio(annuncio: Annunci) {
    console.log('Ecco il titolo del documento da eliminare: ' + annuncio.titolo);
    this.annunciService.deleteAnnuncio(annuncio);
    this.vistaAnnunciInseriti();
  }

  ritornoData() {
    console.log ('Stampo la data: ' + this.annuncio.data.toString().substring(0, 10));
    console.log ('Stampo orario: ' + this.annuncio.data.toString().substring(11, 16));
    console.log ('Questa è la data inserita' + this.annuncio.data);
  }

  async presentAlert1(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Annuncio',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async presentAlertSuccess(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Annuncio',
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
