import { Component } from '@angular/core';
import { TrackModel } from '../shared/models/track.interface';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: [ './music-playlist.component.css' ]
})
export class MusicPlaylistComponent {



  tracks: TrackModel[] = []

  constructor(private trackService: TrackService) { }


  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()

  }
}