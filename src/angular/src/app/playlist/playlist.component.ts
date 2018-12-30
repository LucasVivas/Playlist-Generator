import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {

  @Input() playlistName: string;
  @Input() description: string;
  @Input() index: number;
  @Input() id: number;

  playlists: any[];

      constructor(private playlistService: PlaylistService) { }

      ngOnInit() {
      }

      getDescription() {
        return this.description;
      }

      onSwitchOn(){

      }

      onSwitchOff(){
        if(confirm('Are you sure you want to delete this playlist ?')) {
          
        } else {
          return null;
        }
      }

}
