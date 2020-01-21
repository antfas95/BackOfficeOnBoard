import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

export interface MyData {
  id: string;
  name: string;
  user: string;
  filepath: string;
  size: number;
  date: string;
  approval: number;
  description: string;
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

  private imageCollection: AngularFirestoreCollection<MyData>;

  emailAuth: string;
  user: any;

  constructor(public alertCtrl: AlertController, public router: Router, private storage: AngularFireStorage, private authService: AuthenticationService , private database: AngularFirestore) {
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
    //this.reload();
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
  }

  effettuaRicerca() {
    console.log ('Richiamato il metodo');
    if (this.valorericerca === '') {
      console.log ('Inserisci prima il filtro della ricerca e poi efferrua la query');
    } else {
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

  rigettaDomanda(datoPassato: MyData) {
    datoPassato.approval = 2;
    this.imageCollection.doc(datoPassato.id).update(datoPassato).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
    this.presentRisposta ('Hai rigettato il documento di: ' + datoPassato.user);
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
}
