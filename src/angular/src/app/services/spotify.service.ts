import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSongOnSpotify(name, artist) {

    this.httpClient
      .get('https://api.spotify.com/v1/search?q=track%3Atiger%20album%3Aarrival%20artist%3Aabba&type=track', this.httpOptions)
      .subscribe(
        (newUsers) => {
          console.log('User got !');
        },
        (error) => {
          console.log('Erreur ! : ');
          console.log(error);
        }
      )
  }
}
