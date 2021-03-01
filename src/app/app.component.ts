import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
export class AppComponent {
  title = 'party-queue';




  inputTouched = false;
  loading = false;
  videos: Video[] = []


  constructor(private searchService: SearchService,
    public trackService: TrackService,
    public playerService: PlayerService,
  ) { }





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
