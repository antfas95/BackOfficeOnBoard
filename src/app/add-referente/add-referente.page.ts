import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-referente',
  templateUrl: './add-referente.page.html',
  styleUrls: ['./add-referente.page.scss'],
})

export class AddReferentePage implements OnInit {

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

  //Variabili utili per l'autentcicazione
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email è un campo obbligatorio' },
      { type: 'pattern', message: 'Inserisci una mail valida' }
    ],
    'password': [
      { type: 'required', message: 'Password è un campo obbligatorio' },
      { type: 'minlength', message: 'La password deve essere lunga almeno di 5 caratteri' }
    ],
    'password2': [
      { type: 'required', message: 'Conferma passwrod è un campo obbligatorio'},
      { type: 'minlength', message: 'Conferma password deve essere uguale alla password'}
    ]
  };

  // tslint:disable-next-line: max-line-length
  constructor(public router: Router, private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder) { }

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
      password2: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  tryRegister(value) {
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Il tuo account è stato correttamente creato prova a loggarti';
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     })
  }

  registrati() {
    //this.giorno = this.datanascita.getDay();
    console.log('Valore: ' + this.codice_fiscale + 'Sesso: ' + this.sesso + 'Città: ' + this.cittanascita);
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}