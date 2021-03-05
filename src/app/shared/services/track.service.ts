import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Video } from '../models/search.interface';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  subscription: Subscription;
  room: string;
  host: boolean;

  tracks: TrackModel[] = [];


  constructor(private store: AngularFirestore) {

    // check if there is a room and if there is check if you are the host of that room and subscribe to the playlist of that room
    const room = localStorage.getItem('room');
    if (room) {
      this.room = room;

      if (localStorage.getItem('host-' + this.room)) {
        this.host = true;
      }
      this.subscribePlaylist();
    }
  }


  // progress property
  progress: number = 0;

  // add track to to firestore collection, which will be visible in playlist on the site
  addTrack(video: Video) {
    const result = {
      id: video.videoId,
      title: video.title,
      duration: video.duration,
      thumbnail: video.thumbnail,
      added: Date.now(),
    };
    this.store.collection(this.room).add(result);
  }

  // play next track
  nextTrack() {
    if (this.tracks.length > 0) {
      this.removeTrack(this.tracks[ 0 ].refId);
    }
  }

  // remove track
  removeTrack(refId) {
    this.store.collection(this.room).doc(refId).delete();
  }

  // get playlist
  getPlaylist() {
    return this.tracks.slice(0, 10);
  }

  // get current track
  getCurrentTrack() {
    if (this.tracks.length > 0) {
      return this.tracks[ 0 ];
    }
  }

  // set progress for the progress bar
  setProgress(progress) {
    this.progress = progress;
  }


  createRoom(id) {
    // make creator the host
    this.host = true;

    // set room name/id
    this.room = id;

    // save creators credentials in localStorage (will use firebase next time)
    localStorage.setItem('room', this.room);
    localStorage.setItem('host-' + this.room, 'host');

    // add custom playlist for that room
    this.store.collection('playlists').add({ room: this.room });

    // subscribe to the playlist
    this.subscribePlaylist();
  }

  joinRoom(roomId) {
    // join room
    this.room = roomId;

    // host false
    this.host = false;
    // check if localstorage has host credentials
    if (localStorage.getItem('host-' + this.room)) {
      this.host = true;
    }
    localStorage.setItem('room', this.room);
    this.subscribePlaylist();
  }

  leaveRoom() {
    this.room = undefined;
    this.host = false;
    localStorage.removeItem('room');

    this.subscription.unsubscribe();
    this.tracks = [];
  }

  subscribePlaylist() {
    this.subscription = this.store
      .collection(this.room)
      .valueChanges({ idField: 'refId' })
      .subscribe((docs: TrackModel[]) => {
        // sort after date added
        this.tracks = docs.sort((a, b) => a.added - b.added);
      });
  }
}
