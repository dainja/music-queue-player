import { Component, OnInit, Input } from '@angular/core';
import { TrackService } from 'src/app/shared/services/track.service';
import { Video } from "../../../shared/models/search.interface";


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: [ './search-list.component.css' ]
})
export class SearchListComponent implements OnInit {

  @Input() videos: Video[];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
  }

  add(id, title) {
    this.trackService.addTrack(id, title)
  }
}
