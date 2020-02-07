import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { SelectuserService } from '../services/selectuser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public selezionato: SelectuserService) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   loginUser(email: string, password: string) {
     console.log("Richiesta di login: " + email);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   logoutUser() {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          console.log('LOG Out');
          this.selezionato.setUtente('');
          this.selezionato.setReferenteLoggato('');
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails() {
    console.log('Login Success ' + firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }

  isLogged() {
    return firebase.auth();
  }
}
