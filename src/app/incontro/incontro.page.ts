import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../models/Utente';
import { IncontroService } from '../services/incontro.service';
import { Incontro } from '../models/Incontro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-incontro',
  templateUrl: './incontro.page.html',
  styleUrls: ['./incontro.page.scss'],
})
export class IncontroPage implements OnInit {

  valorericerca: string;
  items: Observable<Utente[]>;
  
  utenti: Observable<Utente[]>;

  constructor(public router: Router, public uS: UtenteService, public iS: IncontroService) {
    this.valorericerca = '';
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  inseriscIncontro() {
    alert ('Incontro memorizzato con successo');
  }

  effettuaRicerca() {
    this.items = this.uS.getUserEmail(this.valorericerca);
  }
}