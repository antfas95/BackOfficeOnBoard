import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { ReferenteService } from '../services/referente.service';
import { Referente } from '../models/Referente';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-referente',
  templateUrl: './add-referente.page.html',
  styleUrls: ['./add-referente.page.scss'],
})

export class AddReferentePage implements OnInit {

  datanascita: Date;
  referente: Referente = {
    email: '',
    nome: '',
    cognome: '',
    datanascita: '',
    codice_fiscale: '',
    sesso: '',
    cittàNascita: '',
    indirizzo: '',
  };

  codice_fiscale: string;
  nome: string;
  cognome: string;
  luogonascita: string;
  sesso: string;
  cittanascita: string;
  username: string;
  password: string;
  password1: string;
  confirmpassword: string;
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
    ],
    'nome' : [
      { type: 'required', message: 'Il nome è un campo obbligatorio' },
      { type: 'minlenght', message: 'Il nome deve essere di almeno 3 caratteri' }
    ],
    'cognome' : [
      { type: 'required', message: 'Il cognome è un campo obbligatorio' },
      { type: 'minlenght', message: 'Il cognome deve essere di almeno 3 caratteri' }
    ],
    'nascita': [
      { type: 'required', message: 'La città è un campo obbligatorio' },
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

  emailAuth: string;
  user: any;
  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, public router: Router, private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, public itemService: ReferenteService) {
    this.user = this.authService.userDetails();

    if (this.user) {
        // User is signed in.
        console.log ('Utente loggato');
        this.emailAuth = this.authService.userDetails().email;
      } else {
        console.log ('Utente non loggato ');
        this.reload();
        //this.authService.logoutUser();
        //this.router.navigate(['home']);
        // No user is signed in.
    }
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  ngOnInit() {
    /*
    var user = firebase.auth().currentUser;
    if (user) {
      this.emailAuth = this.authService.userDetails().email;
      console.log ("Ecco emailAutenticazione: " + this.emailAuth);
      console.log ('Ecco la stringa che viene ritornata: ' + this.authService.userDetails());
      console.log ('Utente loggato');
      console.log ('Ecco utente passato: ' + this.emailAuth);
      this.incontri = this.iS.getIncontriByReferenti(this.emailAuth);
      this.count = this.iS.getIncontriInfo(this.emailAuth);
    } else {
      this.router.navigate(['home']);
      console.log ('Utente non loggato');
    }
    */
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
      nascita: new FormControl('', Validators.compose([
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
    this.itemService.getReferenti().subscribe(items => {
      console.log (items);
    });
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  addReferente() {
    console.log ('Ecco la data di nascita: ' + this.datanascita);
    this.referente.cittàNascita = this.cittanascita;
    this.referente.datanascita = this.datanascita.toString().substring(0, 10);
    // tslint:disable-next-line: max-line-length
    console.log ('Ecco tutte le info: ' + this.referente.nome + this.referente.cognome + this.referente.email + this.referente.codice_fiscale + this.referente.indirizzo + this.referente.sesso + this.referente.cittàNascita);
    this.itemService.addReferente(this.referente);
    this.referente.nome = '';
    this.referente.cognome = '';
    this.referente.indirizzo = '';
    this.referente.codice_fiscale = '';
    this.referente.cittàNascita = '';
    this.referente.sesso = '';
    this.cittanascita = '';
    this.referente.email = '';
  }

  tryRegister(value) {
    if (this.password === this.password1) {
      this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Il tuo account è stato correttamente creato prova a loggarti';
       this.referente.cittàNascita = this.cittanascita;
       this.referente.datanascita = this.datanascita.toString().substring(0, 10);
       this.itemService.addReferente(this.referente);
       this.presentAggiunta ('Aggiunto con successo il referente: ' + this.referente.email);
       this.referente.nome = '';
       this.referente.cognome = '';
       this.referente.indirizzo = '';
       this.referente.codice_fiscale = '';
       this.referente.cittàNascita = '';
       this.referente.sesso = '';
       this.cittanascita = '';
       this.referente.email = '';
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     });
    } else {
      this.passwordNonCombaciano('passward e conferma passward non combaciano');
    }
  }

  registrati() {
    //this.giorno = this.datanascita.getDay();
    console.log('Valore: ' + this.codice_fiscale + 'Sesso: ' + this.sesso + 'Città: ' + this.cittanascita);
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  otherFunction() {
    this.presentAlert ('Funzione ancora non implementata');
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Funzionalità mancante',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async passwordNonCombaciano(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async presentAggiunta(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Aggiunta referente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
  }

  paginaIncontri() {
    this.router.navigate(['incontro']);
  }

  approvaDomanda() {
    this.router.navigate(['approvazione']);
  }

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
  }
}