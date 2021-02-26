import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { Video } from './shared/models/search.interface';
import { PlayerService } from './shared/services/player.service';
import { SearchService } from './shared/services/search.service';
import { TrackService } from './shared/services/track.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  title = 'party-queue';

  @ViewChild(MusicPlayerComponent) child;

  parent;



  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.parent = this.child
    console.log(this.parent.player);

  }



  inputTouched = false;
  loading = false;
  videos: Video[] = []
  product: any;

  constructor(private searchService: SearchService,
    public trackService: TrackService,
    public playerService: PlayerService,
  ) { }



  loggaService() {
    console.log(this.parent.ytPlayer);

  }


  // search handle for the search input
  async handleSearch(inputValue: string) {
    this.loading = true;
    const items: any = await this.searchService.getVideos(inputValue);
    this.videos = items.map(item => {
      return {
        title: item.snippet.title,
        videoId: item.id.videoId,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        channelId: item.snippet.channelId,
        channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedAt: new Date(item.snippet.publishedAt),
        thumbnail: item.snippet.thumbnails.high.url,
        duration: item.duration,
      }
    })
    this.inputTouched = true;
    this.loading = false;
  }


}
