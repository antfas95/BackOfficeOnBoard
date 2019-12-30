import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Annunci } from '../models/Annunci';

@Injectable({
  providedIn: 'root'
})
export class AnnunciService {

  itemsCollections: AngularFirestoreCollection<Annunci>;
  items: Observable<Annunci[]>;
  documentFire: AngularFirestoreDocument<Annunci>;

  public annunci: AngularFireList<Annunci>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase) {
    this.annunci = afDatabase.list('/annunci');
    this.itemsCollections = afs.collection<Annunci>('annunci', ref => ref.orderBy('titolo', 'asc'));

    this.items = this.afs.collection('annunci').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Annunci;
        data.id = a.payload.doc.id;
        //console.log('Ecco il valore della a che mi serve: ' + data.id);
        return data;
      });
    })
  );
  }

  getAnnunci() {
    return this.items;
  }

  getAnnunci1() {
    return this.annunci;
  }

  addAnnuncio(annuncio: Annunci) {
    console.log('Mi trovo qui con questi valori: ' + annuncio.titolo + 'Cognome: ' + annuncio.descrizione);
    const a = this.itemsCollections.add(annuncio);

    a.then(function(id) {
      console.log(id.id);
    });
    console.log ('Ecco la a che viene generata: ' + a);
    return a;
  }

  deleteAnnuncio(annuncio: Annunci) {
    this.itemsCollections.doc(annuncio.id).delete();
  }
}
