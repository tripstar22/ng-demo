import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

// routing
import { routing } from './routing/app.routing';

// http service
import { AppHttpService } from './services/app-http.service';

// angular material 
import { MatListModule, MatCardModule  } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AlbumsComponent,
    AlbumDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    MatListModule,
    MatCardModule
  ],
  providers: [
    AppHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
