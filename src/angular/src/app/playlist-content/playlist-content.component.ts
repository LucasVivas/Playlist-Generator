import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { TrackComponent } from '../track/track.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist-content',
  templateUrl: './playlist-content.component.html',
  styleUrls: ['./playlist-content.component.css']
})
export class PlaylistContentComponent implements OnInit {

  name: string = 'Playlist';
  description: string = 'Desciption';
  tracks: any[];
  trackSubscription: Subscription;

  constructor(private playlistService: PlaylistService,
            private route: ActivatedRoute, private trackComponent: TrackComponent) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.playlistService.getPlaylistById(+id).name;
    this.description = this.playlistService.getPlaylistById(+id).description;
    this.trackSubscription = this.trackComponent.trackSubject.subscribe(
      (tracks: any[]) => {
        this.tracks = tracks;
      }
    );
  }

  ngOnDestroy() {
    this.trackSubscription.unsubscribe();
  }

}
