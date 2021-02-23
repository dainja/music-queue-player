import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { TrackModel } from '../models/track.interface';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyD_1wMyYsKsUMqjloX2cWCbaamym9rPZSI';

  private tracks: TrackModel[] = [];

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=3`;

    // const videoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${this.API_TOKEN}`;



    // försökte skapa en ny http get för att plocka VIDEO id, skicka en second call till en annan länk se nedan
    // const videoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${this.API_TOKEN}`;
    // denna callen ger info om duration som kan konverteras med koden längre ner
    // maxade min quota mitt i skiten xD

    // let array = [];

    // console.log(this.http.get(url)
    //   .subscribe((response: any) => {

    //     array.push(response.items)

    //     console.log(array);

    //     console.log(response.items);

    //     for (let i = 0; i < array.length; i++) {
    //       const element = array[ i ];
    //       console.log(element);


    //     }




    //   }));


    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      )

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
