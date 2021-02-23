import { Component } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';
import { Video } from "src/app/shared/models/search.interface";

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: [ './search-container.component.css' ]
})
export class SearchContainerComponent {


  inputTouched = false;
  loading = false;
  videos: Video[] = []

  constructor(private searchService: SearchService) { }

  async handleSearch(inputValue: string) {
    this.loading = true;
    const items = await this.searchService.getVideos(inputValue)
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
