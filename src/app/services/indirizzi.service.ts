import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Indirizzi } from '../models/Indirizzi';

@Injectable({
  providedIn: 'root'
})
export class IndirizziService {

  itemsCollections: AngularFirestoreCollection<Indirizzi>;
  items: Observable<Indirizzi[]>;
  documentFire: AngularFirestoreDocument<Indirizzi>;

  itemsSelct: Observable<Indirizzi[]>;

  public sedi: AngularFireList<Indirizzi>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase) {
    this.sedi = afDatabase.list('/indirizzi');
    this.itemsCollections = afs.collection<Indirizzi>('indirizzi', ref => ref.orderBy('Indirizzo', 'asc'));

    this.items = this.afs.collection('indirizzi').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Indirizzi;
        data.id = a.payload.doc.id;
        //console.log('Ecco il valore della a che mi serve: ' + data.id);
        return data;
      });
    })
  );
  }

  getSedi() {
    return this.items;
  }

  aggiungiSede(sede: Indirizzi) {
    //console.log('Mi trovo qui con questi valori: ' + annuncio.titolo + 'Cognome: ' + annuncio.descrizione);
    const a = this.itemsCollections.add(sede);

    a.then(function(id) {
      console.log(id.id);
    });
    console.log ('Ecco la a che viene generata: ' + a);
    return a;
  }

  deleteSede(sede: Indirizzi) {
    this.itemsCollections.doc(sede.id).delete();
  }

  getSediProvincia(provincia: string) {
    console.log('Mi trovo nel primo metodo');
    /*
    this.itemsCollections = this.afs.collection('users', ref => {
      return ref.orderBy('nome').where ('email', '==', email);
    });
    this.items = this.itemsCollections.valueChanges();
    return this.items;
    */
    this.itemsSelct = this.afs.collection('indirizzi', ref=> { return ref.orderBy('Indirizzo').where ('Provincia', '==', provincia)}).snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Indirizzi;
        data.id = a.payload.doc.id;
        return data;
      });
    })
  );
    return this.itemsSelct;
  }
}
