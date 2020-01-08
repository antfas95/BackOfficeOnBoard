import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utente } from '../models/Utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  itemsCollections: AngularFirestoreCollection<Utente>;
  items: Observable<Utente[]>;
  itemsSelct: Observable<Utente[]>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase) {
    this.itemsCollections = afs.collection<Utente>('users');
    //this.items = this.afs.collection('users').valueChanges();
    this.items = this.afs.collection('users').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Utente;
        data.id = a.payload.doc.id;
        return data;
      });
    })
  );
  }

  getUsers() {
    return this.items;
  }

  addCliente(utente: Utente) {
    console.log ('Mi trovo nel metodo di aggiunta con questa data di nascita: ' + utente.datanascita);
    console.log('Mi trovo qui con questi valori: ' + utente.nome + 'Cognome: ' + utente.cognome);
    const a = this.itemsCollections.add(utente);
    a.then(function(id) {
      console.log(id.id);
    });
    console.log ('Ecco la a che viene generata: ' + a);
    return a;
  }

  getUserEmail(email: string) {
    console.log('Mi trovo nel primo metodo');
    /*
    this.itemsCollections = this.afs.collection('users', ref => {
      return ref.orderBy('nome').where ('email', '==', email);
    });
    this.items = this.itemsCollections.valueChanges();
    return this.items;
    */
    this.itemsSelct = this.afs.collection('users', ref=> { return ref.orderBy('nome').where ('email', '==', email)}).snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Utente;
        data.id = a.payload.doc.id;
        return data;
      });
    })
  );
    return this.itemsSelct;
  }

  eliminaUtente(utente: Utente) {
    console.log ('Elimino utente: ' + utente.id);
    this.itemsCollections.doc(utente.id).delete();
  }
}