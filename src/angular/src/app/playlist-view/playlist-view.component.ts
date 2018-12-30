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
    this.playlistSubscription = this.playlistService.playlistsSubject.subscribe(
      (playlists: any[]) => {
        this.playlists = playlists;
      }
    );
    this.playlistService.emitplaylistSubject();
  }

  onAllumer() {
    this.playlistService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos playlists ?')) {
      this.playlistService.switchOffAll();
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.playlistSubscription.unsubscribe();
  }

  onFetch() {
    this.playlistService.getplaylistsFromServer();
  }

  onSave() {
    this.playlistService.savePlaylistsToServer();
  }

}
