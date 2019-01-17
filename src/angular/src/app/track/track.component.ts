import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
@Injectable()
export class TrackComponent {

  @Input() trackName: string;
  @Input() artist: string;
  @Input() duration: string;
  @Input() index: number;

  trackSubject = new Subject<any[]>();
  tracks: any[];

      constructor() { }

      ngOnInit() {
      }

      getDuration() {
        return this.duration;
      }

      deleteTrack(id: number) {
        const index = this.tracks.indexOf(this.getTrackById(id));
        this.tracks.splice(index,1);
      }

      getTrackById(id: number) {
          const tracks = this.tracks.find(
            (s) => {
              return s.id === id;
            }
          );
          return tracks;
      }

      addPlaylist(trackName: string, artist: string, duration: string){
        const trackObject = {
          trackName: '',
          artist: '',
          duration: ''
        };
        trackObject.trackName = trackName;
        trackObject.artist = artist;
        trackObject.duration = duration;
        this.tracks.push(trackObject);
      }

}
