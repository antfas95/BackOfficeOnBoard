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

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase) {
    this.incontri = afDatabase.list('/incontro');
    this.itemsCollections = afs.collection<Incontro>('incontro', ref => ref.orderBy('data', 'asc'));

    this.items = this.afs.collection('incontro').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Incontro;
        data.id = a.payload.doc.id;
        //console.log('Ecco il valore della a che mi serve: ' + data.id);
        return data;
      });
    })
  );
  }

  getIncontri() {
    return this.items;
  }

  addIncontro(incontro: Incontro) {
    console.log ('Mi trovo nel metodo con i seguenti valori, referente: ' + incontro.emailReferente + 'utente: ' + incontro.emailUtente + 'indirizzo: ' + incontro.indirizzo + 'data: ' + incontro.data + 'ora' + incontro.ora);
    const a = this.itemsCollections.add(incontro);

    a.then(function(id) {
      console.log(id.id);
    });
    console.log ('Ecco la a che viene generata: ' + a);
    return a;
  }
}
