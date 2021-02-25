import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN_ACC_ONE = 'AIzaSyD_1wMyYsKsUMqjloX2cWCbaamym9rPZSI';
  private API_TOKEN_ACC_TWO = 'AIzaSyBtEHwu7RvZvaeL4SL6Zy2Fov7IJGnukZw';

  private tracks: TrackModel[] = [];

  constructor(private http: HttpClient) { }

  async getVideos(query: string): Promise<any> {
    // Get videos from search

    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN_ACC_ONE}&part=snippet&type=video&maxResults=3`;

    const videos: any = await this.http.get(url).toPromise();

    const ids = videos.items.map(item => item.id.videoId).join(',');

    const videoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${this.API_TOKEN_ACC_ONE}`;

    const contentDetails: any = await this.http.get(videoURL).toPromise();


    const result = videos.items.map((video, index) => {
      video.duration = this.formatTime(contentDetails.items[ index ].contentDetails.duration)
      return video
    })

    // console.log('result', result)

    return result;

  }

  formatTime(time) {
    const seconds = this.convertYtTime(time)
    let convertedDuration = new Date(seconds * 1000).toISOString().substr(11, 8)
    if (convertedDuration.startsWith('00:')) {
      convertedDuration = convertedDuration.substring(3)
      // console.log(convertedDuration);
    }
    return convertedDuration
  }
  convertYtTime(duration) {
    var total = 0;
    var hours = duration.match(/(\d+)H/);
    var minutes = duration.match(/(\d+)M/);
    var seconds = duration.match(/(\d+)S/);
    if (hours) total += parseInt(hours[ 1 ]) * 3600;
    if (minutes) total += parseInt(minutes[ 1 ]) * 60;
    if (seconds) total += parseInt(seconds[ 1 ]);
    return total;
  }
}

