import { Component, OnInit } from '@angular/core';
import { Track } from '../track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  music1: Track = {
  id: 1,
  name: "casaOnTheBeach",
  artist: "alexTheBoss",
  album: "SoupeSpacial"
  }

  constructor() { }

  ngOnInit() {
  }

}
