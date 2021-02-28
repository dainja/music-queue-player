import { Injectable, } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {



  private volumeSource = new BehaviorSubject(1)
  private nextSource = new BehaviorSubject(false)
  private playAgainSource = new BehaviorSubject(false)
  private pauseSource = new BehaviorSubject(false)

  currentVolume = this.volumeSource.asObservable();
  nextPlaying = this.nextSource.asObservable();
  playAgain = this.playAgainSource.asObservable();
  pause = this.pauseSource.asObservable();

  changeVolume(volume: number) {
    this.volumeSource.next(volume)
  }

  changePlaying(next: boolean) {
    this.nextSource.next(next)
  }

  startOver(rewind: boolean) {
    this.playAgainSource.next(rewind)
  }
  changePause(pause: boolean) {
    this.pauseSource.next(pause)
  }



  constructor() { }
}
