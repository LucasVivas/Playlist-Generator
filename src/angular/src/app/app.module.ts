import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TracksComponent } from './tracks/tracks.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { UserListComponent } from './user-list/user-list.component';
import { PlaylistContentComponent } from './playlist-content/playlist-content.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { PlaylistService } from './services/playlist.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'playlists', canActivate: [AuthGuard], component: PlaylistViewComponent },
  { path: 'playlists/:id', canActivate: [AuthGuard], component: PlaylistContentComponent },
  { path: 'edit', canActivate: [AuthGuard], component: EditPlaylistComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'users', component: UserListComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    TracksComponent,
    PlaylistComponent,
    UserListComponent,
    PlaylistContentComponent,
    NewUserComponent,
    FourOhFourComponent,
    EditPlaylistComponent,
    AuthComponent,
    PlaylistViewComponent,
    HeaderComponent,
    LeftbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PlaylistService,
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
