import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private users: User[] = [new User(//'Alexandre',
                                    //'CASANOVA--FRANGER',
                                    'acasanova',
                                    'alexandre.casanova--franger@etu.u-bordeaux.fr',
                                    'password'),
                                    //'Electro',
                                    //['Paul Kalkbrenner', 'Etienne De Crecy']),
                           new User(//'Lucas',
                                    //'VIVAS',
                                    'lvivas',
                                    'lucas.vivas@etu.u-bordeaux.fr',
                                    'password')];
                                    //'Hip hop',
                                    //['Ghostmane', 'Oxmo Puccino'])];
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) { }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
  };

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
    this.httpClient
      .post('http://localhost:8080/user/', user, this.httpOptions)
      .subscribe(
        () => {
          console.log('User added !');
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      );
  }

}
