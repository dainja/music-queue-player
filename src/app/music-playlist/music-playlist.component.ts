import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { TrackModel } from '../shared/models/track.interface';
import { PlayerService } from '../shared/services/player.service';
import { TrackService } from '../shared/services/track.service';

@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: [ './music-playlist.component.css' ]
})
export class MusicPlaylistComponent {

  // new interface of TrackModel
  tracks: TrackModel[] = []
  trakks: Observable<any[]>;


  constructor(private trackService: TrackService,
    private store: AngularFirestore) { }


  ngOnInit(): void {
    this.store.collection('tracks')
      .valueChanges()
      .subscribe(docs => {
        // loop through each item in the array and log value
        console.log(docs);


      });
    // exempel på crud firebase
    // https://bezkoder.com/angular-11-firestore-crud-angularfirestore/#AngularFireStore_for_creategetupdatedelete_Collection
  }


  ngDoCheck() {

    this.tracks = this.trackService.getPlaylist()

  }
}
