import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'
import { YouTubePlayer } from '@angular/youtube-player';
import { AngularFirestore } from '@angular/fire/firestore';
import { Video } from '../models/search.interface';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  subscription: Subscription;

  constructor(private store: AngularFirestore) {
    const room = localStorage.getItem('room')
    if (room) {
      this.room = room
    }
    if (localStorage.getItem('host')) {
      this.host = true;
    }


   }


  private tracks: TrackModel[] = [];

  // progress property
  progress: number = 0;


  // add track to array, which will be visible in playlist
  addTrack(video: Video) {
    console.log('%c%s',
      'color: black; background: #b6cfb6; font-weight: bold; font-size: 20px', `${video.title} added to playlist`)
    const result = {
      id: video.videoId,
      title: video.title,
      duration: video.duration,
      thumbnail: video.thumbnail,
      added: Date.now()
    }
    this.store.collection(this.room).add(result)


    // ta bort när allt funkar
    // this.tracks.push({
    //   id,
    //   title,
    //   duration,
    //   thumbnail
    // })


    // console.log(this.tracks);

  }

  // play next track
  nextTrack() {
    if (this.tracks.length > 0) {
      this.removeTrack(this.tracks[0].refId)
    }
  }

  // remove track
  removeTrack(refId) {
    console.log('%c%s',
      'color: black; background: #ff968a; font-weight: bold; font-size: 20px', 'Track removed from playlist')

    this.store.collection(this.room).doc(refId).delete()
  }

  // get playlist
  getPlaylist() {
    return this.tracks.slice(0, 10)
  }


  // get current track
  getCurrentTrack() {
    if (this.tracks.length > 0) {

      return this.tracks[ 0 ]

    }
  }

  // set progress for the progress bar
  setProgress(progress) {

    this.progress = progress
  }

  room: string;
  host: boolean;

  createRoom(id){
this.host = true;
// this.room = Math.random().toString(36).substr(2, 5);
this.room = id
localStorage.setItem('room', this.room)
localStorage.setItem('host', 'host')
this.store.collection('playlists').add({room: this.room})
this.subscribePlaylist()
  }

  joinRoom(roomId){
this.room = roomId
this.host = false;
localStorage.setItem('room', this.room)
this.subscribePlaylist()
  }


leaveRoom(){
  this.room = undefined;
  this.host = false;
  localStorage.removeItem('room')
  localStorage.removeItem('host')
  this.subscription.unsubscribe()
  this.tracks = []
}


subscribePlaylist(){
  this.subscription = this.store.collection(this.room)
  .valueChanges({idField: 'refId'})
  .subscribe((docs: TrackModel[]) => {
    // loop through each item in the array and log value
    console.log('working getter', docs);
    this.tracks = docs.sort((a, b) => a.added - b.added)

  });
}



}
