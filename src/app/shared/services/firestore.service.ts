import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  ref = this.store.collection('tracks')

  constructor(private store: AngularFirestore) { }

  getBoards(): Observable<any> {
    return new Observable((observer) => {
      this.ref.valueChanges((querySnapshot) => {
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            id: doc.id,
            title: data.title,
            thumbnail: data.thumbnail,
            duration: data.duration
          });
        });
        observer.next(boards);
      });
    });
  }

}
