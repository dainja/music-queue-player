import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '../models/track.interface';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // auth codes
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN_ACC_ONE = 'AIzaSyD_1wMyYsKsUMqjloX2cWCbaamym9rPZSI';
  private API_TOKEN_ACC_TWO = 'AIzaSyBtEHwu7RvZvaeL4SL6Zy2Fov7IJGnukZw';

  // new interface of TrackModel
  private tracks: TrackModel[] = [];

  // import httpclient for calls
  constructor(private http: HttpClient) { }

  // get videos from search
  async getVideos(query: string): Promise<any> {

    // create correct URL with value from search input
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN_ACC_TWO}&part=snippet&type=video&maxResults=10`;

    // send url with data from search input to get response with tracks
    const videos: any = await this.http.get(url).toPromise();

    // get the video ids from first call and put them in array
    const ids = videos.items.map(item => item.id.videoId).join(',');

    // create url with video ids
    const videoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${this.API_TOKEN_ACC_TWO}`;

    // send second url with ids to get metadata for the tracks
    // we have to send this to get for example duration of track
    const contentDetails: any = await this.http.get(videoURL).toPromise();

    // create new array and get duration of track, convert time to readable numbers
    const result = videos.items.map((video, index) => {
      video.duration = this.formatTime(contentDetails.items[ index ].contentDetails.duration)
      return video
    })

    return result;

  }



  // convert this to seconds
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

  // youtube api returns a string, example 'PT48S'
  // take youtube time and convert to seconds, example '302'
  // after seconds convert to readable numbers, example 05:02
  formatTime(time) {
    const seconds = this.convertYtTime(time)
    let convertedDuration = new Date(seconds * 1000).toISOString().substr(11, 8)
    if (convertedDuration.startsWith('00:')) {
      convertedDuration = convertedDuration.substring(3)
    }
    return convertedDuration
  }
}

