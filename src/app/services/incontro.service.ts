import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incontro } from '../models/Incontro';

@Injectable({
  providedIn: 'root'
})
export class IncontroService {

  itemsCollections: AngularFirestoreCollection<Incontro>;
  items: Observable<Incontro[]>;
  documentFire: AngularFirestoreDocument<Incontro>;

  public incontri: AngularFireList<Incontro>;
  email: string;

  constructor(public afDatabase: AngularFireDatabase, public afs: AngularFirestore) {
    console.log('Mi trovo nel metodo costruttore');
    this.email = 'prova';
    //this.incontri = this.afDatabase.list('/incontro');
    this.itemsCollections = this.afs.collection<Incontro>('users', ref => ref.orderBy('data', 'asc'));

    this.items = this.afs.collection('users').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Incontro;
        data.id = a.payload.doc.id;
        //console.log('Ecco il valore della a che mi serve: ' + data.id);
        return data;
      });
    })
  );
  }

  initVariabili(email: string) {
    this.email = email;
  }

  getIncontri() {
    this.items = this.afs.collection('users').doc(this.email).collection('incontro').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Incontro;
        data.id = a.payload.doc.id;
        //console.log('Ecco il valore della a che mi serve: ' + data.id);
        return data;
      });
    })
  );
    return this.items;
  }

  addIncontro(incontro: Incontro) {
    console.log ('Mi trovo nel metodo con i seguenti valori, referente: ' + incontro.emailReferente + 'utente: ' + incontro.emailUtente + 'indirizzo: ' + incontro.indirizzo + 'data: ' + incontro.data + 'ora' + incontro.ora);
    //const a = this.itemsCollections.add(incontro);
    this.itemsCollections.doc(this.email).collection('incontro').add(incontro).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
    /*
    a.then(function(id) {
      console.log(id.id);
    });
    console.log ('Ecco la a che viene generata: ' + a);
    return a;
    */
  }
}
