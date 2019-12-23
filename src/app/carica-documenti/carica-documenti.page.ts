import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../services/firebase-storage.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-carica-documenti',
  templateUrl: './carica-documenti.page.html',
  styleUrls: ['./carica-documenti.page.scss'],
})
export class CaricaDocumentiPage {

  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<MyData[]>;
  
  //File details  
  fileName: string;
  fileSize: number;
 
  //Status check 
  isUploading: boolean;
  isUploaded: boolean;
  private imageCollection: AngularFirestoreCollection<MyData>;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private firebaseStorage: FirebaseStorageService, private storage: AngularFireStorage, private database: AngularFirestore) {
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
  }
 
  uploadFile(event: FileList) {
    // The File object
    const file = event.item(0);
    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    // The storage path
    const path = `freakyStorage/${new Date().getTime()}_${file.name}`; 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' }; 
    //File reference
    const fileRef = this.storage.ref(path); 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata }); 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }
 
  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard-def']);
  }

  caricaDocumento() {
    this.router.navigate(['caricaDocumento']);
  }
}