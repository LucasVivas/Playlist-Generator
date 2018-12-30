import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlaylistService {

  playlistsSubject = new Subject<any[]>();

  private playlists = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor() { }

  emitplaylistSubject() {
    this.playlistsSubject.next(this.playlists.slice());
  }

  switchOnAll() {
      for(let playlist of this.playlists) {
        playlist.status = 'allumé';
      }
      this.emitplaylistSubject();
  }

  switchOffAll() {
      for(let playlist of this.playlists) {
        playlist.status = 'éteint';
        this.emitplaylistSubject();
      }
  }

  switchOnOne(i: number) {
      this.playlists[i].status = 'allumé';
      this.emitplaylistSubject();
  }

  switchOffOne(i: number) {
      this.playlists[i].status = 'éteint';
      this.emitplaylistSubject();
  }
  getPlaylistById(id: number) {
      const playlist = this.playlists.find(
        (s) => {
          return s.id === id;
        }
      );
      return playlist;
  }

  addPlaylist(name: string, status: string) {
    const playlistObject = {
      id: 0,
      name: '',
      status: ''
    };
    playlistObject.name = name;
    playlistObject.status = status;
    playlistObject.id = this.playlists[(this.playlists.length - 1)].id + 1;
    this.playlists.push(playlistObject);
    this.emitplaylistSubject();
  }

  // savePlaylistsToServer() {
  //   this.httpClient
  //     .put('https://httpclient-demo.firebaseio.com/playlists.json', this.playlists)
  //     .subscribe(
  //       () => {
  //         console.log('Enregistrement terminé !');
  //       },
  //       (error) => {
  //         console.log('Erreur ! : ' + error);
  //       }
  //     );
  // }
  //
  // getplaylistsFromServer() {
  // this.httpClient
  //   .get<any[]>('https://httpclient-demo.firebaseio.com/playlists.json')
  //   .subscribe(
  //     (response) => {
  //       this.playlists = response;
  //       this.emitplaylistSubject();
  //     },
  //     (error) => {
  //       console.log('Erreur ! : ' + error);
  //     }
  //   );
  // }

}
