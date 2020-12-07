import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private firebaseStorage: AngularFireStorage) { }

  uploadAvatar(uid: string): void {
//     const storageRef = this.firebaseStorage.storage.ref();
//     const mountainsRef = storageRef.child('avatar.png');
//     const mountainImagesRef = storageRef.child('images/mountains.jpg');
//
// // While the file names are the same, the references point to different files
//     mountainsRef.name === mountainImagesRef.name;            // true
//     mountainsRef.fullPath === mountainImagesRef.fullPath;    // false
  }
}
