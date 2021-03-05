import { Component, Input } from '@angular/core';
import { TrackService } from 'src/app/shared/services/track.service';
import { Video } from '../../../shared/models/search.interface';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: [ './search-list.component.css' ],
})
export class SearchListComponent {
  // new interface of Video model
  @Input() videos: Video[];

  constructor(private trackService: TrackService) { }

  // add to playlist function
  add(video: Video) {
    this.trackService.addTrack(video);
  }
}
