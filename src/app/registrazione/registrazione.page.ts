import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  codice_fiscale: string;
  nome: string;
  cognome: string;
  luogonascita: string;
  sesso: string;
  cittanascita: string;
  username: string;
  password: string;
  confirmpassword: string;
  datanascita: Date;
  giorno: number;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  registrati() {
    //this.giorno = this.datanascita.getDay();
    console.log('Valore: ' + this.codice_fiscale + 'Sesso: ' + this.sesso + 'Città: ' + this.cittanascita);
  }
}
