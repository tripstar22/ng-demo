import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';
import { AlbumsComponent } from '../components/albums/albums.component';
import { AlbumDetailComponent } from '../components/album-detail/album-detail.component';

const APP_ROUTES: Routes = [
	{
		path: '',
		component: UsersComponent
    },
    {
        path: ':id',
        component: AlbumsComponent
    },
    {
        path: ':id/:album',
        component: AlbumDetailComponent
    }
];

// export const routing = RouterModule.forRoot(APP_ROUTES, { useHash: true });
export const routing = RouterModule.forRoot(APP_ROUTES);