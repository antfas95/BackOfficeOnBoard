import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elimina-referente',
  templateUrl: './elimina-referente.page.html',
  styleUrls: ['./elimina-referente.page.scss'],
})
export class EliminaReferentePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  elimnaReferente() {
    alert('Referente eliminato con successo');
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }
}
