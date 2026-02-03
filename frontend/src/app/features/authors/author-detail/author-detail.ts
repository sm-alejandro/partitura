import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthorDTO, SongDTO } from '../../../shared/models';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-author-detail',
  imports: [Breadcrumbs, MatIconModule, RouterLink],
  templateUrl: './author-detail.html',
  styleUrl: './author-detail.css',
})
export class AuthorDetail {
  authorId = signal('');
  author = httpResource<AuthorDTO>(() => `/api/authors/${this.authorId()}`);
  songs = httpResource<SongDTO[]>(() => `/api/authors/${this.authorId()}/songs`);
  sortedSongs = computed(() => {
    const songs = this.songs.value();
    if (!songs) return [];
    console.log(songs);
    return [...songs].sort((a, b) => a.slug.localeCompare(b.slug));
  });
  readonly breadcrumbs = computed(() => [
    { text: 'Authors', link: '/authors' },
    {
      text: this.author.value()?.name || this.authorId(),
      link: `/authors/${this.authorId()}`,
    },
  ]);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.authorId.set(params['id']);
    });
  }
}
