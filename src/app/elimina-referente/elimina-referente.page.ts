import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferenteService } from '../services/referente.service';
import { Referente } from '../models/Referente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elimina-referente',
  templateUrl: './elimina-referente.page.html',
  styleUrls: ['./elimina-referente.page.scss'],
})
export class EliminaReferentePage implements OnInit {

  ricercaFatta: boolean;
  valorericerca: string;
  items: Observable<Referente[]>;

  constructor(public router: Router, public uS: ReferenteService) {
    this.valorericerca = '';
    this.ricercaFatta = false;
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
}
