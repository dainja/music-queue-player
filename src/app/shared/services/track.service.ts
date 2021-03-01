import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'
import { YouTubePlayer } from '@angular/youtube-player';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private store: AngularFirestore) { }


  private tracks: TrackModel[] = [];

  // progress property
  progress: number = 0;
  result;


  // add track to array, which will be visible in playlist
  addTrack(id, title, duration, thumbnail) {
    console.log('%c%s',
      'color: black; background: #b6cfb6; font-weight: bold; font-size: 20px', `${title} added to playlist`)
    this.result = {
      id: id,
      title: title,
      duration: duration,
      thumbnail: thumbnail
    }
    this.store.collection('tracks').add(this.result)


    this.tracks.push({
      id,
      title,
      duration,
      thumbnail
    })


    // console.log(this.tracks);

  }

  // play next track
  nextTrack() {
    if (this.tracks.length > 0) {
      return this.tracks.shift()
    }
  }

  // remove track
  removeTrack(index) {
    console.log('%c%s',
      'color: black; background: #ff968a; font-weight: bold; font-size: 20px', 'Track removed from playlist')


    return this.tracks.splice(index, 1)
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


}
