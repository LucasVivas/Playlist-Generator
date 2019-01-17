import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PlaylistService {

  playlistsSubject = new Subject<any[]>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };

  private playlists = [];

  constructor(private httpClient: HttpClient) { }

  emitplaylistSubject() {
    this.playlistsSubject.next(this.playlists.slice());
  }

  getplaylistsFromServer(user_id: string) {
    this.httpClient
      .get<any[]>('http://localhost:8080/playlists/' + user_id, this.httpOptions)
      .subscribe(
        (response: any[]) => {
          this.playlists = response;
          this.emitplaylistSubject();
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      );
  }

  getPlaylistById(id: number) {
    const playlist = this.playlists.find(
      (s) => {
        return s.id === id;
      }
    );
    return playlist;
  }

  addPlaylist(name: string, description: string, globalMusicalGenre: string) {
    const playlistObject = {
      id: 0,
      name: '',
      description: '',
      globalMusicalGenre: ''
    };
    playlistObject.name = name;
    playlistObject.description = description;
    playlistObject.id = this.playlists.length;
    playlistObject.globalMusicalGenre = globalMusicalGenre;
    this.playlists.push(playlistObject);
    // this.savePlaylistsToServer(user_id);
    this.emitplaylistSubject();
  }

  deletePlaylist(id: number) {
    const index = this.playlists.indexOf(this.getPlaylistById(id));
    this.playlists.splice(index, 1);
    // this.savePlaylistsToServer(user_id);
    this.emitplaylistSubject();
  }

  savePlaylistsToServer(user_id: string) {
    this.httpClient
      .put('http://localhost:8080/playlists/' + user_id, this.playlists)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
