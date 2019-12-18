import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage) { }

  //Ottieni dall'archivio
  public ottieniCloudStorage(nomeArchivio: string, data: any) {
    return this.storage.upload(nomeArchivio, data);
  }

  //Riferimento dell'archivio
  public referenciaCloudStorage(nomeArchivio: string) {
    return this.storage.ref(nomeArchivio);
  }
}