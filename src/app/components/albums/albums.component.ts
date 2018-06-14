import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AppHttpService } from '../../services/app-http.service';

@Component({
  selector: 'tr-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [AppHttpService]
})
export class AlbumsComponent implements OnInit, AfterViewChecked {

  albums: any;
  users: any;
  photos: any;
  arrayAlbums: Array<any> = [];

  constructor(private _appHttpService: AppHttpService) {
    this.albumService();
    this.userService();
    this.photosService();
  }

  albumService() {
		this._appHttpService.requestData('https://jsonplaceholder.typicode.com/albums')
		.subscribe(
			data => {this.albums = data},
      error => console.log(error),
      () => this.albumsFilter()
    );
  }

  userService() {
		this._appHttpService.requestData('https://jsonplaceholder.typicode.com/users')
		.subscribe(
			data => {this.users = data},
      error => console.log(error),
      () => console.log()
    );
  }

  photosService() {
    this._appHttpService.requestData('https://jsonplaceholder.typicode.com/photos')
		.subscribe(
			data => {this.photos = data},
      error => console.log(error),
      () => console.log()
    );
  }
  
  albumsFilter() {
    // get url path
    let path = window.location.pathname;
    // loop through data 
    for (let i=0; i < this.albums.length; i++) {
      // get user id
      let user = this.albums[i].userId;
      // check if path and user id match
      if (path === "/" + user) {
        // push to album array
        this.arrayAlbums.push(this.albums[i]);
      } else {
       // do nothing
      }
    }
  }

  appendAlbumLinks() {
    // get all els with linkAlbum class
    const linkAlbums = document.querySelectorAll('.linkAlbum');
    // get user id
    let user = this.arrayAlbums[0].userId;
    // loop through linkAlbums array and assign href to each album
    for (let i=0; i < linkAlbums.length; i++) {
      linkAlbums[i].setAttribute('href', user + "/" + this.arrayAlbums[i].id);
    }
  }

  photosFilter() {
    // get img els
    const imgFeatured = document.querySelectorAll('.thumbnailFeatured');
    // loop through photos data
    for (let i=0; i < this.photos.length; i++) {
      // loop through array of curranted albums
      for (let j=0; j < this.arrayAlbums.length; j++) {
        // if album matches photo
        if (this.arrayAlbums[j].id === this.photos[i].albumId) {
          // set thumbnail
          imgFeatured[j].setAttribute('src', this.photos[i].thumbnailUrl);
        }
      }
    }
  }

  ngOnInit() {
    
  }

  ngAfterViewChecked() {
    this.appendAlbumLinks();
    this.photosFilter();
  }

}
