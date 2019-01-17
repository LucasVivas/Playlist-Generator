import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TrackService } from '../services/track.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.css']
})
export class AddTrackComponent implements OnInit {

  constructor(private trackService: TrackService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const artist = form.value['artist'];
    const time = form.value['time'];
    this.trackService.addTrack(name, artist, time);
    this.router.navigate(['add']);
  }

}
