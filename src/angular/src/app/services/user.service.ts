import { User } from '../models/User.model';
import { Subject } from 'rxjs/Subject';

export class UserService {
  private users: User[] = [new User('Alexandre',
                                    'CASANOVA--FRANGER',
                                    'alexandre.casanova--franger@etu.u-bordeaux.fr',
                                    'Electro',
                                    ['Paul Kalkbrenner', 'Etienne De Crecy']),
                           new User('Lucas',
                                    'VIVAS',
                                    'lucas.vivas@etu.u-bordeaux.fr',
                                    'Hip hop',
                                    ['Ghostmane', 'Oxmo Puccino'])];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
