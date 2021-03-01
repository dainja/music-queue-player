import { Component, DoCheck, EventEmitter, Injectable, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { YouTubePlayer } from '@angular/youtube-player';
import { Subscription } from 'rxjs';
import { TrackModel } from "../shared/models/track.interface";
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],

})
export class MusicPlayerComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild('ytIframe') ytPlayer: YouTubePlayer;

  volume: number;
  volumeSubscription: Subscription;
  next: boolean;
  nextSubscription: Subscription;
  playAgain: boolean;
  playAgainSubscription: Subscription;
  pause: boolean;
  pauseSubscription: Subscription;


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
  constructor(private trackService: TrackService,
    private playerService: PlayerService,
    private store: AngularFirestore
  ) {

  }
  ngOnDestroy(): void {
    this.volumeSubscription.unsubscribe()
    this.nextSubscription.unsubscribe()
    this.playAgainSubscription.unsubscribe()
    this.pauseSubscription.unsubscribe()

  }

  // initiate the youtube iframe api
  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    console.log('API loaded');

    //
    this.volumeSubscription = this.playerService.currentVolume.subscribe(volume => {
      this.volume = volume
      if (this.ytPlayer) {
        console.log('%c%s',
          'color: black; background: #ff968a; font-weight: bold; font-size: 20px', 'Track muted')
        this.ytPlayer.setVolume(volume)

      }

    })

    this.nextSubscription = this.playerService.nextPlaying.subscribe(next => {
      this.next = next

      if (this.ytPlayer) {
        if (this.tracks.length > 1) {
          console.log('%c%s',
            'color: black; background: #ffff85; font-weight: bold; font-size: 20px', 'Play next track')

          // when track has ended go to next track in list

          this.trackService.nextTrack();

          // Wait for new track to load
          setTimeout(() => {
            if (this.currentTrack) {
              this.ytPlayer.playVideo()
            }
          }, 100)

        }

      }
    })

    this.playAgainSubscription = this.playerService.playAgain.subscribe(rewind => {
      this.playAgain = rewind

      if (this.ytPlayer) {
        console.log('%c%s',
          'color: black; background: #ffccb6; font-weight: bold; font-size: 20px', 'Track replayed')

        this.ytPlayer.seekTo(0, true)
      }
    })

    this.pauseSubscription = this.playerService.pause.subscribe(pause => {
      this.pause = pause

      if (this.ytPlayer) {

        console.log('%c%s',
          'color: black; background: #abdee6; font-weight: bold; font-size: 20px', 'Track paused')
        this.ytPlayer.pauseVideo()



        if (this.ytPlayer.getPlayerState() == 2) {
          this.ytPlayer.playVideo()
          console.log('%c%s',
            'color: black; background: #b6cfb6; font-weight: bold; font-size: 20px', 'Track resumed')
        }
      }
    })


  }


  // detect changes
  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()
    this.currentTrack = this.trackService.getCurrentTrack()

  }

  onReady() {
    // console.log(this.ytPlayer.getPlayerState());

  }

  // on my PC this only works in incognito, must have something blocking it
  // state change of the player
  onStateChange({ data }) {



    // console.log('state changed', data);

    //if track has ended (0) play next track
    if (data === YT.PlayerState.ENDED) {

      this.trackService.nextTrack()
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








}
