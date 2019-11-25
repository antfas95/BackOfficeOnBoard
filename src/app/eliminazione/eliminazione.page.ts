import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminazione',
  templateUrl: './eliminazione.page.html',
  styleUrls: ['./eliminazione.page.scss'],
})
export class EliminazionePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  eliminaUtente() {
    alert ('Utente eliminato con successo');
  }
}