import { Subject } from 'rxjs/Subject';

export class AuthService {

  authSubject = new Subject<boolean>();

  isAuth = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            this.authSubject.next(this.isAuth);
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
    this.authSubject.next(this.isAuth);
  }

}
