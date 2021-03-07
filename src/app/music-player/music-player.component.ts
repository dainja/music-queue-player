import {
  Component,
  DoCheck,
  HostListener,
  Injectable,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Subscription } from 'rxjs';
import { TrackModel } from '../shared/models/track.interface';
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: [ './music-player.component.css' ],
})
export class MusicPlayerComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild('ytIframe') ytPlayer: YouTubePlayer;

  // properties
  volume: number;
  volumeSubscription: Subscription;
  next: boolean;
  nextSubscription: Subscription;
  playAgain: boolean;
  playAgainSubscription: Subscription;
  pause: boolean;
  pauseSubscription: Subscription;

  // i am not using this at the moment because when in fullscreen, doubleclick to leave fullscreen doesn't work, only using the ESC key.
  fullScreen: boolean;
  fullScreenSubscription: Subscription;

  // create new interface of TrackModel
  tracks: TrackModel[] = [];

  // create new interface of TrackModel to show current track
  currentTrack: TrackModel;

  // greate property track duration
  trackDuration;


  // below responsiveness only works with hostlistener
  screenHeight: number;
  screenWidth: number;
  // responsive functions for iframe
  videoWidth() {
return document.getElementById('player-container').clientWidth
  }
  videoHeight() {
    return '300';
  }
  // hostlistener for listening to screensize changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        // console.log(this.screenHeight, this.screenWidth);
  }
  // imports
  constructor(
    private trackService: TrackService,
    private playerService: PlayerService
    ){  }

  // unsubscribes
  ngOnDestroy(): void {
    this.volumeSubscription.unsubscribe();
    this.nextSubscription.unsubscribe();
    this.playAgainSubscription.unsubscribe();
    this.pauseSubscription.unsubscribe();
  }

  // initiate the youtube iframe api
  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    console.log('API loaded');

    // volume subscription
    this.volumeSubscription = this.playerService.currentVolume.subscribe(
      (volume) => {
        this.volume = volume;

        if (this.ytPlayer) {
          // set the volume (mute/unmute)
          this.ytPlayer.setVolume(volume);
        }
      }
    );

    // next track subscription
    this.nextSubscription = this.playerService.nextPlaying.subscribe((next) => {
      this.next = next;

      if (this.ytPlayer) {
        if (this.tracks.length > 1) {
          // when track has ended go to next track in list (playerstate 0)
          this.trackService.nextTrack();

          // Wait for new track to load and play it
          setTimeout(() => {
            if (this.currentTrack) {
              this.ytPlayer.playVideo();
            }
          }, 100);
        }
      }
    });

    // rewind/play again subscription
    this.playAgainSubscription = this.playerService.playAgain.subscribe(
      (rewind) => {
        this.playAgain = rewind;

        if (this.ytPlayer) {
          // seek to beginning of track, this is better than playVideo() because it doesn't refresh the whole iframe, therefore saving calls to youtube api
          this.ytPlayer.seekTo(0, true);
        }
      }
    );

    // pause subscription
    this.pauseSubscription = this.playerService.pause.subscribe((pause) => {
      this.pause = pause;

      if (this.ytPlayer) {
        this.ytPlayer.pauseVideo();

        // if already paused, resume video
        if (this.ytPlayer.getPlayerState() == 2) {
          this.ytPlayer.playVideo();
        }
      }
    });

    // i am not using this at the moment because when in fullscreen, doubleclick to leave fullscreen doesn't work, only using the ESC key.
    this.fullScreenSubscription = this.playerService.fullscreen.subscribe(
      (fullScreen) => {
        this.fullScreen = fullScreen;

        if (this.ytPlayer) {
          this.playerService.toggleFullscreen();
        }
      }
    );
  }

  // detect changes
  ngDoCheck() {
    this.tracks = this.trackService.getPlaylist();
    this.currentTrack = this.trackService.getCurrentTrack();
  }

  // on my PC this only works in incognito, must have some extensions blocking youtube connection
  onStateChange({ data }) {
    //if track has ended (0) play next track
    if (data === YT.PlayerState.ENDED) {
      this.trackService.nextTrack();
    }

    // dynamic timer for the progressbar
    let mytimer;
    if (data == YT.PlayerState.PLAYING) {
      // get full duration from youtube api
      const playerTotalTime = this.ytPlayer.getDuration();

      // interval for .5 second check
      mytimer = setInterval(() => {
        // returns current time of track
        const playerCurrentTime = this.ytPlayer.getCurrentTime();

        // algorithm to convert and get track time
        const playerTimeDifference =
          (playerCurrentTime / playerTotalTime) * 100;

        // send difference to function in service
        this.trackService.setProgress(playerTimeDifference);
      }, 500);
    } else {
      // clear timer variable
      clearInterval(mytimer);
    }
  }
}
