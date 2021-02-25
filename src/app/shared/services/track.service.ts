import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'
import { YouTubePlayer } from '@angular/youtube-player';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor() { }


  private tracks: TrackModel[] = [];

  progress: number = 0;




  addTrack(id, title, duration, thumbnail) {
    this.tracks.push({
      id,
      title,
      duration,
      thumbnail
    })


    console.log(this.tracks);

  }

  nextTrack() {
    if (this.tracks.length > 0) {
      return this.tracks.shift()
    }
  }

  removeTrack(index) {
    return this.tracks.splice(index, 1)
  }

  getPlaylist() {
    return this.tracks.slice(0, 10)
  }

  getCurrentTrack() {
    if (this.tracks.length > 0) {

      return this.tracks[ 0 ]

    }
  }

  setProgress(progress) {

    this.progress = progress
  }

  // skulle skapa en function som plockar all data jag vill ha
  getData() {

  }


}
