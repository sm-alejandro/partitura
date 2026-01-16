import { Routes } from '@angular/router';
import { Songs } from './features/songs/songs';
import { Categories } from './features/categories/categories';
import { Authors } from './features/authors/authors';
import { Playlists } from './features/playlists/playlists';
import { CategoryDetail } from './features/categories/category-detail/category-detail';
import { SongDetail } from './features/songs/song-detail/song-detail';
import { AuthorDetail } from './features/authors/author-detail/author-detail';

export const routes: Routes = [
  { path: '', component: Songs },
  { path: 'songs', component: Songs },
  { path: 'songs/:id', component: SongDetail },
  { path: 'authors', component: Authors },
  { path: 'authors/:id', component: AuthorDetail },
  { path: 'categories', component: Categories },
  { path: 'categories/:id', component: CategoryDetail },
  { path: 'playlists', component: Playlists },
];
