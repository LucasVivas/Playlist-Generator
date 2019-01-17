import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private users: User[] = [];
  userSubject = new Subject<User[]>();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  getUsers() {
    this.httpClient
      .get('http://localhost:8080/users/', this.httpOptions)
      .subscribe(
        (newUsers: User[]) => {
          this.users = newUsers;
          this.emitUsers();
          console.log('User got !');
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      )
  }

  addUser(user: User) {
    this.httpClient
      .post('http://localhost:8080/user/', user, this.httpOptions)
      .subscribe(
        (user: User) => {
          console.log('User added !');
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      );
  }
  deleteUser(userId: String) {
    this.httpClient
      .delete('http://localhost:8080/user/' + userId, this.httpOptions)
      .subscribe(
        () => {
          console.log('User deleted !');
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      );
  }

}
