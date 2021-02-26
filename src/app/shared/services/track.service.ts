import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface'
import { YouTubePlayer } from '@angular/youtube-player';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor() { }


  private tracks: TrackModel[] = [];

  // progress property
  progress: number = 0;



  // add track to array, which will be visible in playlist
  addTrack(id, title, duration, thumbnail) {
    this.tracks.push({
      id,
      title,
      duration,
      thumbnail
    })


    console.log(this.tracks);

  }

  // play next track
  nextTrack() {
    if (this.tracks.length > 0) {
      return this.tracks.shift()
    }
  }

  // remove track
  removeTrack(index) {
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
