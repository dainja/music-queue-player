import { Component } from '@angular/core';
import { TrackModel } from '../shared/models/track.interface';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: [ './music-playlist.component.css' ],
})
export class MusicPlaylistComponent {
  // new interface of TrackModel
  tracks: TrackModel[] = [];

  constructor(public trackService: TrackService) { }

  // detect changes on playlist
  ngDoCheck() {
    this.tracks = this.trackService.getPlaylist();
  }
}
