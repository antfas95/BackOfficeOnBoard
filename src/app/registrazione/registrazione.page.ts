import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../models/Utente';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  utente: Utente = {
    email: '',
    nome: '',
    cognome: '',
    codice_fiscale: '',
    sesso: '',
    cittàNascita: '',
    indirizzo: '',
  };
  
  codice_fiscale: string;
  nome: string;
  cognome: string;
  luogonascita: string;
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
      { type: 'minlength', message: 'La password deve essere di almeno 5 caratteri lunga' }
    ],
    'password2': [
      { type: 'required', message: 'Password è un campo obbligatorio' },
      { type: 'minlength', message: 'La password deve essere di almeno 5 caratteri lunga' }
    ],
    'nome' : [
      { type: 'required', message: 'Il nome è un campo obbligatorio' },
      { type: 'minlenght', message: 'Il nome deve essere di almeno 3 caratteri' }
    ],
    'cognome' : [
      { type: 'required', message: 'Il cognome è un campo obbligatorio' },
      { type: 'minlenght', message: 'Il cognome deve essere di almeno 3 caratteri' }
    ],
    'codfiscale': [
      { type: 'required', message: 'Codice Fiscale è un campo obbligatorio' },
      { type: 'pattern', message: 'Inserisci un codice fiscale valido' }
    ],
    'citta': [
      { type: 'required', message: 'La città è un campo obbligatorio' },
    ],
    'sesso': [
      { type: 'required', message: 'Il sesso è un campo obbligatorio' },
    ],
    'indirizzo': [
      { type: 'required', message: 'Indirizzo è un campo obbligatorio' },
    ],
  };

  // tslint:disable-next-line: max-line-length
  constructor(public router: Router, private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, public itemService: UtenteService) { }
  
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
      nome: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      cognome: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      codfiscale: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$')
      ])),
      citta: new FormControl('', Validators.compose([
      ])),
      sesso: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      indirizzo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    this.itemService.getUsers().subscribe(items => {
      console.log (items);
    });
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  addCliente() {
    this.utente.cittàNascita = this.cittanascita;
    console.log ('Ecco tutte le info: ' + this.utente.nome + this.utente.cognome + this.utente.email + this.utente.codice_fiscale + this.utente.indirizzo + this.utente.sesso + this.utente.cittàNascita);
    this.itemService.addCliente(this.utente);
    this.utente.nome = '';
    this.utente.cognome = '';
    this.utente.indirizzo = '';
    this.utente.codice_fiscale = '';
    this.utente.cittàNascita = '';
    this.utente.sesso = '';
    this.cittanascita = '';
    this.utente.email = '';
  }

  tryRegister(value) {
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Il tuo account è stato correttamente creato prova a loggarti';
       this.utente.cittàNascita = this.cittanascita;
       this.itemService.addCliente(this.utente);
       this.utente.nome = '';
       this.utente.cognome = '';
       this.utente.indirizzo = '';
       this.utente.codice_fiscale = '';
       this.utente.cittàNascita = '';
       this.utente.sesso = '';
       this.cittanascita = '';
       this.utente.email = '';
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  getCitta() {
    this.utente.cittàNascita = this.cittanascita;
    console.log('Mi trovo nel metodo ecco il valore ritornato: ' + this.utente.nome + this.utente.cognome + this.utente.cittàNascita);
  }
}