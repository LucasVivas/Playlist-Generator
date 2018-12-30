import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PlaylistService } from '../services/playlist.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {

  defaultStatus = 'éteint';

  constructor(private playlistService: PlaylistService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.playlistService.addPlaylist(name, status);
    this.router.navigate(['/playlists']);
  }

}
