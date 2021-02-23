import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'
import { YouTubePlayer } from '@angular/youtube-player';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor() { }


  private tracks: TrackModel[] = [];





  addTrack(id, title) {
    this.tracks.push({
      id,
      title
    })


    console.log(this.tracks);

  }

  nextTrack() {
    if (this.tracks.length > 0) {
      return this.tracks.shift()
    }
  }

  getPlaylist() {
    return this.tracks.slice(0, 10)
  }

  getCurrentTrack() {
    if (this.tracks.length > 0) {

      return this.tracks[ 0 ]

    }
  }

  // skulle skapa en function som plockar all data jag vill ha
  getData() {

  }


}
