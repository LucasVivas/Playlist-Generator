import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PlaylistService } from '../services/playlist.service'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {

  userId: string;
  authSubscription: Subscription;

  constructor(private playlistService: PlaylistService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.userAuth;
    this.authSubscription = this.authService.userAuthSubject.subscribe(
      (username) => {
        this.userId = username;
      }
    );
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const description = form.value['description'];
    const genre = form.value['genre'];
    this.playlistService.addPlaylistToServer(this.userId, name, description, genre);
    this.router.navigate(['/playlists']);
  }

}
