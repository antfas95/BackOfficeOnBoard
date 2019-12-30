import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../models/Utente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eliminazione',
  templateUrl: './eliminazione.page.html',
  styleUrls: ['./eliminazione.page.scss'],
})
export class EliminazionePage implements OnInit {

  ricercaFatta: boolean;
  valorericerca: string;
  items: Observable<Utente[]>;
  utente: Utente;

  constructor(public router: Router, public uS: UtenteService) {
    this.valorericerca = '';
    this.ricercaFatta = false;
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
  }

  effettuaRicerca() {
    if (this.valorericerca === '') {
      console.log('Ricerca non corretta inserisci qualcosa dentro la barra di ricerca');
    } else {
      this.ricercaFatta = true;
      console.log('Provo a fare la query: ' + this.valorericerca);
      this.items = this.uS.getUserEmail(this.valorericerca);
    }
  }
}