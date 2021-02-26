import { Injectable } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: YouTubePlayer

  logga() {
    console.log(this.player);

  }

  constructor() { }
}
