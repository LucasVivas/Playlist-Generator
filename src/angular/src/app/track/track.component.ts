import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
@Injectable()
export class TrackComponent {

  @Input() id: number;
  @Input() name: string;
  @Input() artist: string;
  @Input() time: string;
  @Input() index: number;

      constructor(public trackService: TrackService) { }

      ngOnInit() {
      }

      gettime() {
        return this.time;
      }

      onDeleteTrack(id: number){
        if(confirm('Are you sure you want to delete this track ?')) {
          this.trackService.deleteTrack(id);
        } else {
          return null;
        }
      }

}
