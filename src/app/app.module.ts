import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SearchInputComponent } from './search/components/search-input/search-input.component';
import { SearchListComponent } from './search/components/search-list/search-list.component';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { NgxY2PlayerModule } from "ngx-y2-player";
import { MusicPlaylistComponent } from './music-playlist/music-playlist.component';
import { PlayerControlComponent } from './player-control/player-control.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchListComponent,
    MusicPlayerComponent,
    MusicPlaylistComponent,
    PlayerControlComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    YouTubePlayerModule,
    NgxY2PlayerModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
