import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit, OnDestroy {

  playlists: any[];
  playlistSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    // TODO: alexlebg
    this.playlistService = getPlaylistsFromServer();
    this.playlistSubscription = this.playlistService.playlistsSubject.subscribe(
      (playlists: any[]) => {
        this.playlists = playlists;
      }
    );
    this.playlistService.emitplaylistSubject();
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
  }

  // onFetch() {
  //   this.playlistService.getPlaylistsFromServer();
  // }
  //
  // onSave() {
  //   this.playlistService.savePlaylistsToServer();
  // }

}
