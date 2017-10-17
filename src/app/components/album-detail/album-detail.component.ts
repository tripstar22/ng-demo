import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../services/app-http.service';
// import { MatDialogModule } from '@angular/material';

@Component({
  selector: 'tr-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  providers: [AppHttpService]
})
export class AlbumDetailComponent implements OnInit {

  photos: any;
  arrayPhotos: Array<any> = [];

  // specify event
  e: Event;

  constructor(private _appHttpService: AppHttpService) {
    this.albumDetailService();
  }

  albumDetailService() {
    this._appHttpService.requestData('http://jsonplaceholder.typicode.com/photos')
		.subscribe(
			data => {this.photos = data},
      error => console.log(error),
      () => this.getPhotos()
    );
  }

  getPhotos() {
    // get url path
    let path = window.location.pathname;
    // split to get sections of url path
    let pathArray = path.split('/');
    // get last section of path
    // associated with albumId in photos data
    let id = pathArray[2];
    // get heading
    const heading = document.getElementById('albumName');
    // dynamically add heading
    heading.innerHTML = 'Album' + ' ' + id; 
    // turn from string to number
    let idNum = parseInt(pathArray[2]);
    // console.log(id);
    // loop through photos data
    for (let i=0; i < this.photos.length; i++) {
      // check to see if albumIds match
      if (this.photos[i].albumId == idNum) {
        this.arrayPhotos.push(this.photos[i]);
      }
    }
  }

  // toggle image modal
  openImg(e) {
    // get event target
    let trgt = e.target;
    // get id of event target
    let photoId = trgt.id;
    // get modal wrap el
    const wrap = document.getElementById('wrapModal');
    // get photo title el
    const photoTitle = document.getElementById('titlePhoto');
    // get img el
    const photoSrc = document.getElementById('imgPhoto');
    // loop through array of currated photos in album
    for (let i=0; i < this.arrayPhotos.length; i++) {
      // if thumbnail id matches photo data
      // add title
      // add image src
      if (photoId == this.arrayPhotos[i].id) {
        photoTitle.innerHTML = this.arrayPhotos[i].title;
        photoSrc.setAttribute('src', this.arrayPhotos[i].url);
      }
    }
    // toggle class to make modal in view
    wrap.classList.toggle('hideMe');
    // prevent default anchor tag behavior
    e.preventDefault();
  }

  closeImg(e) {
    // get modal wrap el
    const wrap = document.getElementById('wrapModal');
    // check to see if has class that makes el visible
    if (wrap.classList.contains('hideMe')) {
      // do nothing
    } else {
      wrap.classList.add('hideMe');
      console.log('has class');
    }
    // prevent default anchor tag behavior
    e.preventDefault();
  }

  ngOnInit() {

  }

}
