import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { SelectuserService } from '../services/selectuser.service';

export interface MyData {
  id: string;
  name: string;
  user: string;
  filepath: string;
  size: number;
  date: string;
  approval: number;
  description: string;
  motivation?: string;
}

@Component({
  selector: 'app-approvazione',
  templateUrl: './approvazione.page.html',
  styleUrls: ['./approvazione.page.scss'],
})
export class ApprovazionePage implements OnInit {

  // Uploaded Image List
  images: Observable<MyData[]>;
  valorericerca: string;
  ricercafatta: boolean;
  utentePassato: string;

  private imageCollection: AngularFirestoreCollection<MyData>;

  emailAuth: string;
  user: any;
  motivazione: string;

  // tslint:disable-next-line: max-line-length
  constructor(public alertCtrl: AlertController, public router: Router, private storage: AngularFireStorage, private authService: AuthenticationService , private database: AngularFirestore, public selezionato: SelectuserService) {
    this.user = this.authService.userDetails();
    this.valorericerca = '';
    this.ricercafatta = false;
    this.utentePassato = this.selezionato.getUtente();

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
    //this.reload();
    if (this.utentePassato !== '') {
      this.valorericerca = this.utentePassato;
      this.effettuaRicerca();
      console.log ('Elemento passato: ' + this.valorericerca);
    }
  }

  reload() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.valorericerca = '';
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
    this.selezionato.setUtente('');
  }

  effettuaRicerca() {
    console.log ('Richiamato il metodo');
    if (this.valorericerca === '') {
      console.log ('Inserisci prima il filtro della ricerca e poi efferrua la query');
    } else {
      this.ricercafatta = true;
      this.imageCollection = this.database.collection<MyData>(this.valorericerca, ref => ref.where('approval', '==', 1));
      this.images = this.imageCollection.valueChanges();
    }
  }

  approvaDomanda(datoPassato: MyData) {
    datoPassato.approval = 3;
    // Set document id with value in database
    //.imageCollection = this.database.collection<MyData>(this.valorericerca, ref => ref.where('approval', '==', 0));
    this.imageCollection.doc(datoPassato.id).update(datoPassato).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
    this.presentRisposta ('Hai accettato il documento di: ' + datoPassato.user);
    //this.imageCollection = this.database.collection<MyData>(this.valorericerca);
  }

  async rigettaDomanda(datoPassato: MyData) {
    const confirm = this.alertCtrl.create({
      header: 'Rigetta domanda',
      message: 'Inserisci una motivazione al rigetto della domanda selezionata',
      inputs: [{
        name: 'motivazione',
        placeholder: 'Motivazione > 5 caratteri',
        value: '',
      },
    ],
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
            this.presentAlert('Domanda non rigettata');
            return;
          }
        },
        {
          text: 'SI',
          handler: data => {
            // Check description
            this.motivazione = data.motivazione;
            console.log ('Ecco la motivazione inserita: ' + this.motivazione);
            if (this.motivazione.length <= 5) {
              this.presentAlert('La lunghezza della descrizione non rispetta il formato');
              return;
            } else {
              datoPassato.approval = 2;
              datoPassato.motivation = this.motivazione;
              this.imageCollection.doc(datoPassato.id).update(datoPassato).then(resp => {
              console.log(resp);
              }).catch(error => {
              console.log('error ' + error);
              });
              this.presentRisposta ('Hai rigettato il documento di: ' + datoPassato.user);
            }
          }
        }
      ]
    });
    (await confirm).present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: 'Non hai inserito ' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  async presentRisposta(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }

  otherFunction() {
    this.presentAlert ('Funzione ancora non implementata');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['home']);
  }

  paginaRegistrazione() {
    this.router.navigate(['registrazione']);
  }

  paginaIncontri() {
    this.router.navigate(['incontro']);
  }

  caricaDocumenti() {
    this.router.navigate(['carica-documenti']);
  }

  modificaStato() {
    
  }
}
