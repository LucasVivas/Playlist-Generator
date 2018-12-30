import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.css']
})
export class PlaylistContentComponent implements OnInit {

  name: string = 'Playlist';
  description: string = 'Desciption';

  constructor(private playlistService: PlaylistService,
            private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.playlistService.getPlaylistById(+id).name;
    this.description = this.playlistService.getPlaylistById(+id).description;
  }

}
