import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Referente } from '../models/Referente';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SelectuserService } from '../services/selectuser.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenteService {

  itemsCollections: AngularFirestoreCollection<Referente>;
  items: Observable<Referente[]>;
  itemsSelct: Observable<Referente[]>;
  presenza: boolean;
  errorMessage: string = '';

  constructor(public selezionato: SelectuserService, public alertCtrl: AlertController, private router: Router, public afs: AngularFirestore, public afDatabase: AngularFireDatabase, public authService: AuthenticationService) {
    console.log('Eccomi mi trovo qui nel costruttore di colui che fornisce il servizio per i referenti');
    this.itemsCollections = afs.collection<Referente>('referenti');
    //this.items = this.afs.collection('users').valueChanges();
    this.items = this.afs.collection('referenti').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Referente;
        const id = a.payload.doc.id;
        return data;
      });
    })
  );
  }

  getReferenti() {
    return this.items;
  }

  addReferente(referente: Referente) {
    console.log('Mi trovo qui con questi valori: ' + referente.nome + 'Cognome: ' + referente.cognome);
    this.itemsCollections.doc(referente.email).set(referente).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  getReferenteByEmail(email: string) {
    console.log('Mi trovo nel primo metodo');
    this.itemsSelct = this.afs.collection('referenti', ref=> { return ref.orderBy('nome').where ('email', '==', email)}).snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Referente;
        data.id = a.payload.doc.id;
        return data;
      });
    })
  );
    return this.itemsSelct;
  }

  eliminaUtente(utente: Referente) {
    console.log ('Elimino utente: ' + utente.id);
    this.itemsCollections.doc(utente.id).delete();
  }

  verificaCorrettezzaLogin(email: string, password: string) {
    this.itemsCollections.doc(email).get().toPromise()
    .then(doc => {
        if (!doc.exists) {
          this.presentAlert ('Log in non avvenuta con successo, inserisci le giuste credenziali, non rilevato nel db');
          console.log ('Non ci sono incontriiiiiiiii');
          this.presenza = false;
        } else {
          console.log("HOME RICEVE: " + email);
          console.log("stauts: "+ this.authService.isLogged);
          this.authService.loginUser(email, password)
          .then(res => {
          console.log(res);
          this.errorMessage = '';
          console.log('login success: ' + email);
          this.selezionato.setReferenteLoggato(email);
          this.router.navigate(['dashboard-def']);
    }, err => {
      this.presentAlert ('Log in non avvenuta con successo, inserisci le giuste credenziali');
      this.errorMessage = err.message;
    })
          console.log ('Ci sono incontriiii');
          this.presenza = true;
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
        return false;
      });
    return this.presenza;
   }

   async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Compila il form correttamente',
      message: '' + message,
      buttons: ['Conferma']
    });
    alert.present();
  }
}
