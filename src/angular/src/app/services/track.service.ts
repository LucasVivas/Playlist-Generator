import { Track } from '../models/track.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TrackService {

  trackSubject = new Subject<any[]>();

  private tracks: Track[] = [
    {
      id: 1,
      name: 'Serenity',
      artist: 'Popof',
      time: '3:30'
    },
    {
      id: 2,
      name: 'Serenity',
      artist: 'Popof',
      time: '3:30'
    },
    {
      id: 3,
      name: 'Serenity',
      artist: 'Popof',
      time: '3:30'
    },
  ];

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

      addTrack(name: string, artist: string, time: string){
        const trackObject = {
          id: 0,
          name: '',
          artist: '',
          time: ''
        };
        trackObject.id = this.tracks.length;
        trackObject.name = name;
        trackObject.artist = artist;
        trackObject.time = time;
        this.tracks.push(trackObject);
      }

}
