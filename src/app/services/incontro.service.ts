import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
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

  constructor(public afs: AngularFirestore) {
    this.items = this.afs.collection('annunci').snapshotChanges().pipe( map (changes => {
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
}