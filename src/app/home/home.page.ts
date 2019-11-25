import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrazionePage } from '../registrazione/registrazione.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: string;
  pass: string;

  constructor(private router: Router) {}

  effettuaLogin() {
    console.log('Username inserito: ' + this.user + 'con password: ' + this.pass);
    this.router.navigate(['dashboard-def']);
  }

  registrati() {
    this.router.navigate(['registrazione']);
  }
}