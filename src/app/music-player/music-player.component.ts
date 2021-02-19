import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Video } from '../shared/models/search.interface';
import { TrackModel } from "../shared/models/track.interface";
import { TrackService } from '../shared/services/track.service';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],

})
export class MusicPlayerComponent implements OnInit {

  @ViewChild('player') player: YouTubePlayer;
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
    this.currentTrack = this.trackService.getCurrentTrack()

  }

  onStateChange({ data }) {

    if (data === 0) { //if track has ended (0) play next

      this.nextTrack()
    }

  }

  nextTrack() {
    this.trackService.nextTrack();
    setTimeout(() => { // Wait for new track to load
      if (this.currentTrack) {
        this.player.playVideo()
      }
    }, 100)
  }
}
