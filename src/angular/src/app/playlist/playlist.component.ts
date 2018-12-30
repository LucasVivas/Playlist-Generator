import { Component, Input, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {

  @Input() playlistName: string;
  @Input() playlistStatus: string;
  @Input() index: number;
  @Input() id: number;

  playlists: any[];

      constructor(private playlistService: PlaylistService) { }

      ngOnInit() {
      }

      getStatus() {
        return this.playlistStatus;
      }

      getColor() {
        if(this.playlistStatus === 'allumé') {
          return 'green';
        } else if(this.playlistStatus === 'éteint') {
          return 'red';
        }
      }

      onSwitchOn(){
        this.playlistService.switchOnOne(this.index);
      }

      onSwitchOff(){
        this.playlistService.switchOffOne(this.index);
      }

}
