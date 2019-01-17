import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      username: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // musicalGenre: ['', Validators.required],
      // artists: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      // formValue['firstName'],
      // formValue['lastName'],
      formValue['username'],
      formValue['mail'],
      formValue['password'],
      // formValue['musicalGenre'],
      // formValue['artists'] ? formValue['artists'] : []
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getArtists(): FormArray {
    return this.userForm.get('artists') as FormArray;
  }

  onAddArtist() {
    const newArtistControl = this.formBuilder.control(null, Validators.required);
    this.getArtists().push(newArtistControl);
  }

}
