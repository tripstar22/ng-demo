import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../services/app-http.service';

@Component({
  selector: 'tr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AppHttpService]
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private _appHttpService: AppHttpService) {
    this.usersService();
  }

  usersService() {
		this._appHttpService.requestData('http://jsonplaceholder.typicode.com/users')
		.subscribe(
			data => {this.users = data},
			error => console.log(error),
			() => console.log('users subscribe complete')
		);
	}

  ngOnInit() {
  }

}
