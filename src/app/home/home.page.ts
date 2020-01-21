import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegistrazionePage } from '../registrazione/registrazione.page';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ReferenteService } from '../services/referente.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: string;
  pass: string;
  value: string;
  validations_form: FormGroup;
  errorMessage: string = '';

  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, private router: Router, private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, private refser: ReferenteService) {
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email è un campo obbligatorio' },
      { type: 'pattern', message: 'Gentilmente inserisci una mail valida.' }
    ],
    'password': [
      { type: 'required', message: 'Password è un campo obbligatorio'},
      { type: 'minlength', message: 'Password deve essere caratterizzata da almeno 5 caratteri' }
    ]
  };

  loginUser(value) {
    this.refser.verificaCorrettezzaLogin(value.email, value.password);
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/registrazione');
  }

  effettuaLogin() {
    console.log('Username inserito: ' + this.user + 'con password: ' + this.pass);
    console.log ('Mi trovo qui');
    this.router.navigate(['dashboard-def']);
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  registrati() {
    this.router.navigate(['registrazione']);
  }

  sezioneProva() {
    this.router.navigate(['prova-tutorial']);
  }
}