import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carica-documenti',
  templateUrl: './carica-documenti.page.html',
  styleUrls: ['./carica-documenti.page.scss'],
})
export class CaricaDocumentiPage implements OnInit {

  public utente: boolean = false;

  constructor(public router: Router) {
   }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  caricaDocumento() {
    this.router.navigate(['caricaDocumento']);
  }
}