import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../shared/models/search.interface';
import { TrackModel } from "../shared/models/track.interface";
import { TrackService } from '../shared/services/track.service';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],

})
export class MusicPlayerComponent implements OnInit {

  tracks: TrackModel[] = []
  currentTrack: TrackModel

  constructor(private trackService: TrackService) {

  }



  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    console.log(this.tracks);

  }


  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()
    console.log(this.tracks);

  }

}
