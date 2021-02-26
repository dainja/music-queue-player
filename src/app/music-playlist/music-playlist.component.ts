import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrackModel } from '../shared/models/track.interface';
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: [ './music-playlist.component.css' ]
})
export class MusicPlaylistComponent {

  // new interface of TrackModel
  tracks: TrackModel[] = []



  constructor(private trackService: TrackService) { }





  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()

  }
}
