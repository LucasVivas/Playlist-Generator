import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlaylistService {

  playlistsSubject = new Subject<any[]>();

  private playlists = [
    {
      id: 1,
      name: 'Chill house',
      description: 'Relaxing electro playlist'
    },
    {
      id: 2,
      name: 'Inde',
      description: 'For hipsters'
    },
    {
      id: 3,
      name: 'Dubstep',
      description: 'Who likes to party ?'
    }
  ];

  constructor() { }

  emitplaylistSubject() {
    this.playlistsSubject.next(this.playlists.slice());
  }

  // switchOnAll() {
  //     for(let playlist of this.playlists) {
  //       playlist.description = 'allumé';
  //     }
  //     this.emitplaylistSubject();
  // }
  //
  // switchOffAll() {
  //     for(let playlist of this.playlists) {
  //       playlist.description = 'éteint';
  //       this.emitplaylistSubject();
  //     }
  // }
  //
  // switchOnOne(i: number) {
  //     this.playlists[i].description = 'allumé';
  //     this.emitplaylistSubject();
  // }
  //
  // switchOffOne(i: number) {
  //     this.playlists[i].description = 'éteint';
  //     this.emitplaylistSubject();
  // }

  getPlaylistById(id: number) {
      const playlist = this.playlists.find(
        (s) => {
          return s.id === id;
        }
      );
      return playlist;
  }

  addPlaylist(name: string, description: string) {
    const playlistObject = {
      id: 0,
      name: '',
      description: ''
    };
    playlistObject.name = name;
    playlistObject.description = description;
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
