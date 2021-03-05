import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // create behavioursubjects
  private volumeSource = new BehaviorSubject(1);
  private nextSource = new BehaviorSubject(false);
  private playAgainSource = new BehaviorSubject(false);
  private pauseSource = new BehaviorSubject(false);
  private fullScreenSource = new BehaviorSubject(false);

  // as observables
  currentVolume = this.volumeSource.asObservable();
  nextPlaying = this.nextSource.asObservable();
  playAgain = this.playAgainSource.asObservable();
  pause = this.pauseSource.asObservable();
  fullscreen = this.fullScreenSource.asObservable();

  changeVolume(volume: number) {
    this.volumeSource.next(volume);
  }

  changePlaying(next: boolean) {
    this.nextSource.next(next);
  }

  startOver(rewind: boolean) {
    this.playAgainSource.next(rewind);
  }

  changePause(pause: boolean) {
    this.pauseSource.next(pause);
  }

  changeFullscreen(full: boolean) {
    this.fullScreenSource.next(full);
  }

  // i am not using this at the moment because when in fullscreen, doubleclick to leave fullscreen doesn't work, only using the ESC key.
  toggleFullscreen() {
    let elem = document.querySelector('iframe');

    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
