import { Component, DoCheck, OnInit } from '@angular/core';
import { TrackModel } from '../shared/models/track.interface';
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: [ './player-control.component.css' ],
})
export class PlayerControlComponent implements DoCheck {
  // properties
  volume = 1;
  pause = true;

  constructor(
    public trackService: TrackService,
    public playerService: PlayerService
  ) { }

  // new interface of TrackModel
  tracks: TrackModel[] = [];

  ngDoCheck() {
    this.tracks = this.trackService.getPlaylist();
  }

  // controller functions
  togglePause() {
    this.playerService.changePause(true);
    this.pause = this.pause ? false : true;
  }

  toggleVolume() {
    this.volume = this.volume ? 0 : 100;
    this.playerService.changeVolume(this.volume);
  }

  nextTrack() {
    this.playerService.changePlaying(true);
  }

  playAgain(boolean: boolean) {
    this.playerService.startOver(boolean);
  }

  toggleFullscreen(boolean: boolean) {
    this.playerService.changeFullscreen(boolean);
  }
}
