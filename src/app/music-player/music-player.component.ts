import { Component, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Video } from '../shared/models/search.interface';
import { TrackModel } from "../shared/models/track.interface";
import { TrackService } from '../shared/services/track.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],

})
export class MusicPlayerComponent implements OnInit {

  @ViewChild('player') player: YouTubePlayer;
  tracks: TrackModel[] = []
  currentTrack: TrackModel
  trackDuration;
  videoWidth() {
    return '400px'
  }
  videoHeight() {
    return '225px'
  }


  constructor(private trackService: TrackService) {

  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    console.log('API loaded'); // this is shown on the console.
    // console.log(this.tracks);


    // console.log(this.formatTime(302));




  }


  formatTime(number) {
    return this.trackDuration = new Date(number * 1000).toISOString().substr(11, 8)
    // .substring(3)



  }


  // onReady() {
  //   setTimeout(() => {
  //     console.log(this.player.getPlayerState());

  //   }, 100);

  // }



  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()
    this.currentTrack = this.trackService.getCurrentTrack()



  }

  // funkar endast i incognito
  onStateChange({ data }) {

    console.log(data);
    if (data === YT.PlayerState.ENDED) { //if track has ended (0) play next

      this.nextTrack()
    }

    let mytimer;
    if (data == YT.PlayerState.PLAYING) {


      const playerTotalTime = this.player.getDuration();

      mytimer = setInterval(() => {
        const playerCurrentTime = this.player.getCurrentTime();

        const playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;

        this.trackService.setProgress(playerTimeDifference)

      }, 1000);
    } else {

      clearInterval(mytimer);


    }


    // if (data == YT.PlayerState.PLAYING && data !== 0) {
    //   let duration = this.player.getDuration();

    //   let convertedDuration = this.formatTime(duration);

    //   if (convertedDuration.substring(0, 3) == '00:') {
    //     convertedDuration = convertedDuration.substring(3);
    //     console.log(convertedDuration);
    //   }

    //   console.log(convertedDuration);
    // }



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
