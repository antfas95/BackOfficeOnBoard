import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectuserService {

  // tslint:disable-next-line: variable-name
  public utente_selezionato: string;

  constructor() {
    this.utente_selezionato = '';
  }

  getUtente() {
    return this.utente_selezionato;
  }

  setUtente(emailUtente: string) {
    this.utente_selezionato = emailUtente;
  }
}
