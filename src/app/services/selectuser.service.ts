import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectuserService {

  // tslint:disable-next-line: variable-name
  public utente_selezionato: string;
  public referente_loggato: string;

  constructor() {
    this.utente_selezionato = '';
    this.referente_loggato = '';
  }

  getUtente() {
    return this.utente_selezionato;
  }

  setUtente(emailUtente: string) {
    this.utente_selezionato = emailUtente;
  }

  getReferenteLoggato() {
    return this.referente_loggato;
  }

  setReferenteLoggato(passato: string) {
    this.referente_loggato = passato;
  }
}
