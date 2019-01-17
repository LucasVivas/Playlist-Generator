import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../services/track.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.css']
})
export class PlaylistContentComponent implements OnInit {

  name: string = 'Name';
  artist: string = 'Artist';
  time: string = 'Time';
  playlistName: string = 'Playlist Name';
  description: string = 'Description';
  tracks: any[];
  trackSubscription: Subscription;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private trackService: TrackService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.playlistName = this.playlistService.getPlaylistById(+id).name;
    this.description = this.playlistService.getPlaylistById(+id).description;
    this.name = this.trackService.getTrackById(+id).name;
    this.artist = this.trackService.getTrackById(+id).artist;
    this.time = this.trackService.getTrackById(+id).time;
    this.trackSubscription = this.trackService.trackSubject.subscribe(
      (tracks: any[]) => {
        this.tracks = tracks;
      }
    );
  }

  ngOnDestroy() {
    this.trackSubscription.unsubscribe();
  }

}
