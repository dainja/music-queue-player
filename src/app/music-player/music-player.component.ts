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

  ;

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

  onStateChange({ data }) {

    console.log(data);


    // varför nedan kod ligger här är för att jag endast lyckades få tag på information här, försökte skapa en funktion i track-service men fick bara undefined.
    if (data == YT.PlayerState.PLAYING && data !== 0) {

      let duration = this.player.getDuration()

      let convertedDuration = this.formatTime(duration)



      if (convertedDuration.substring(0, 3) == '00:') {
        convertedDuration = convertedDuration.substring(3)
        console.log(convertedDuration);


      }


      console.log(convertedDuration);





    }

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
