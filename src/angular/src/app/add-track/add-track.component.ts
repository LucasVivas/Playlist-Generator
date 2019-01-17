import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TrackComponent } from '../track/track.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  constructor(private trackComponent: TrackComponent,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const trackName = form.value['trackName'];
    const artist = form.value['artist'];
    const duration = form.value['duration'];
    this.trackComponent.addPlaylist(trackName, artist, duration);
    this.router.navigate(['add']);
  }

}
