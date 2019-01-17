import { Subject } from 'rxjs/Subject';

export class AuthService {

  authSubject = new Subject<boolean>();
  userAuthSubject = new Subject<string>();

  userAuth = "";
  isAuth = false;

  signIn(username, password) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            this.userAuth = username;
            this.authSubject.next(this.isAuth);
            this.userAuthSubject.next(this.userAuth);
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
    this.authSubject.next(this.isAuth);
    this.userAuthSubject.next("");
  }

}
