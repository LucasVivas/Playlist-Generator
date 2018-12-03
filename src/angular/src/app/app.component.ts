import { Component, OnInit } from '@angular/core';
import { Track } from './track';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Playlist-Generator';
  music1: Track = {
    id: 1,
    name: "casaOnTheBeach",
    artist: "alexTheBoss",
    album: "SoupeSpacial"
  }
  constructor() {

  }

  ngOnInit() {

  }
}
