import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Referente } from '../models/Referente';

@Injectable({
  providedIn: 'root'
})
export class ReferenteService {

  itemsCollections: AngularFirestoreCollection<Referente>;
  items: Observable<Referente[]>;
  itemsSelct: Observable<Referente[]>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase) {
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
}
