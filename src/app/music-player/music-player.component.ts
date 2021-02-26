import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { TrackModel } from "../shared/models/track.interface";
import { TrackService } from '../shared/services/track.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],

})
export class MusicPlayerComponent implements OnInit {

  @ViewChild('ytIframe') ytPlayer: YouTubePlayer;



  // create new interface of TrackModel
  tracks: TrackModel[] = []

  // create new interface of TrackModel to show current track
  currentTrack: TrackModel

  // greate property track duration
  trackDuration;

  // functions to return dimensions, will be used for responsiveness later
  videoWidth() {
    return '400px'
  }
  videoHeight() {
    return '225px'
  }

  // import trackservice
  constructor(private trackService: TrackService) {

  }

  // initiate the youtube iframe api
  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    console.log('API loaded');

  }

  // detect changes
  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()
    this.currentTrack = this.trackService.getCurrentTrack()

  }

  onReady() {
    console.log(this.ytPlayer.getPlayerState());

  }

  // on my PC this only works in incognito, must have something blocking it
  // state change of the player
  onStateChange({ data }) {



    console.log('state changed', data);

    //if track has ended (0) play next track
    if (data === YT.PlayerState.ENDED) {

      this.nextTrack()
    }

    // dynamic timer for the progressbar
    let mytimer;
    if (data == YT.PlayerState.PLAYING) {

      // get full duration from youtube api
      const playerTotalTime = this.ytPlayer.getDuration();

      // interval for 1 second check
      mytimer = setInterval(() => {

        // returns current time of track
        const playerCurrentTime = this.ytPlayer.getCurrentTime();

        // algorithm to convert and get track time
        const playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;

        // send difference to function in service
        this.trackService.setProgress(playerTimeDifference)

      }, 1000);
    } else {

      // clear timer variable
      clearInterval(mytimer);

    }

  }



  // when track has ended go to next track in list
  nextTrack() {
    this.trackService.nextTrack();

    // Wait for new track to load
    setTimeout(() => {
      if (this.currentTrack) {
        this.ytPlayer.playVideo()
      }
    }, 100)
  }


}
