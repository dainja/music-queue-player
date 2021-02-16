import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_TOKEN = 'AIzaSyD_1wMyYsKsUMqjloX2cWCbaamym9rPZSI';


  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const url = `${this.API_URL}?q=${query}&key=${this.API_TOKEN}&part=snippet&type=video&maxResults=10`;

    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      )
  }
}
