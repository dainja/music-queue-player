import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

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

  constructor() { }
}
