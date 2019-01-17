import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit, OnDestroy {

  playlists: any[];
  playlistSubscription: Subscription;
  authSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  constructor(private playlistService: PlaylistService, private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.userAuthSubject.subscribe(
      (userId: string) => {
        this.playlistService.getplaylistsFromServer(userId);
      }
    );
    this.playlistSubscription = this.playlistService.playlistsSubject.subscribe(
      (playlists: any[]) => {
        this.playlists = playlists;
      }
    );
    this.playlistService.emitplaylistSubject();
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  // onFetch() {
  //   this.playlistService.getPlaylistsFromServer();
  // }
  //
  // onSave() {
  //   this.playlistService.savePlaylistsToServer();
  // }

}
