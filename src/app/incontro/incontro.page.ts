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

@Component({
  selector: 'app-incontro',
  templateUrl: './incontro.page.html',
  styleUrls: ['./incontro.page.scss'],
})
export class IncontroPage implements OnInit {

  valorericerca: string;
  items: Observable<Utente[]>;
  referenti: Observable<Referente[]>;
  sedi: Observable<Indirizzi[]>;
  ricercaSede: boolean;
  ricercaFatta: boolean;
  utenti: Observable<Utente[]>;

  cityMeeting: string;

  incontro: Incontro = {
    emailUtente: '',
    emailReferente: '',
    data: '',
    ora: '',
    indirizzo: '',
  };

  constructor(public router: Router, public uS: UtenteService, public iS: IncontroService, public rS: ReferenteService, public indirizzoService: IndirizziService) {
    this.valorericerca = '';
    this.cityMeeting = '';
    this.ricercaSede = false;
    this.ricercaFatta = false;
  }

  ngOnInit() {
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
    }
  }

  aggiungiIncontro() {
    this.incontro.ora = this.incontro.data.toString().substring(11, 16);
    this.incontro.data = this.incontro.data.toString().substring(0, 10);
    console.log('Ora Incontro: ' + this.incontro.ora);
    const ritorno = this.iS.addIncontro(this.incontro);
    console.log ('Ecco il ritorno: ' + ritorno);
    //this.vistaAnnunciInseriti();
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

  effettuaProve() {
    console.log ('Ecco le sedi' + this.sedi + 'Ecco la città: ' + this.cityMeeting);
  }
}
