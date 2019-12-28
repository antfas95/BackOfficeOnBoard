import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnunciService } from '../services/annunci.service';
import { Annunci } from '../models/Annunci';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annuncio',
  templateUrl: './annuncio.page.html',
  styleUrls: ['./annuncio.page.scss'],
})
export class AnnuncioPage implements OnInit {

  annunciAggiunti: boolean;
  annunci: Observable<Annunci[]>;

  annuncio: Annunci = {
    titolo: '',
    descrizione: ''
  };

  constructor(public router: Router, public annunciService: AnnunciService) {
    this.vistaAnnunciInseriti();
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  vistaAnnunci() {
    this.router.navigate(['view-annunci']);
  }

  aggiungiAnnuncio() {
    console.log('Ecco i valori che sono stati ritornati: ' + this.annuncio.titolo + ' ' + this.annuncio.descrizione + 'Provo ad aggiungerlo al Database');
    const ritorno = this.annunciService.addAnnuncio(this.annuncio);
    this.vistaAnnunciInseriti();
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
}
