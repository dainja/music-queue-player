import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: [ './player-control.component.css' ]
})
export class PlayerControlComponent implements OnInit {

  volume = 1;

  constructor(public trackService: TrackService,
    public playerService: PlayerService) { }

  ngOnInit(): void {
  }


  toggleVolume() {
    this.volume = this.volume ? 0 : 100
    this.playerService.changeVolume(this.volume)
  }

  nextTrack() {
    this.playerService.changePlaying(true)
  }

  playAgain(boolean: boolean) {


    this.playerService.startOver(boolean)
  }
}
