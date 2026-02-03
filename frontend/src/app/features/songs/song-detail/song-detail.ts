import { Component, computed, inject, Input, signal } from '@angular/core';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { httpResource } from '@angular/common/http';
import { CategoryDTO, SongDTO } from '../../../shared/models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-song-detail',
  imports: [Breadcrumbs, RouterLink, MatIconModule],
  templateUrl: './song-detail.html',
  styleUrl: './song-detail.css',
})
export class SongDetail {
  @Input() songId = signal('');
  private titleService = inject(Title);
  readonly breadcrumbs = computed(() => [
    { text: 'Songs', link: '/songs' },
    {
      text: this.song.value()?.title || this.songId(),
      link: `/categories/${this.songId()}`,
    },
  ]);
  song = httpResource<SongDTO>(() => `/api/songs/${this.songId()}`);
  songCategory = httpResource<CategoryDTO>(() => `/api/categories/${this.song.value()?.category}`);
  songAuthor = httpResource<CategoryDTO>(() => `/api/authors/${this.song.value()?.author}`);
  files = httpResource<string[]>(() => `/api/songs/${this.songId()}/files`);
  sortedFiles = computed(() => {
    document.title = this.song.value()?.title || '';
    const files = this.files.value();
    if (!files) return [];
    return [...files].sort((a, b) => a.localeCompare(b));
  });

  fileURI(uri: string) {
    return `/api/file?file=${encodeURIComponent(uri)}`;
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.titleService.setTitle(this.song.value()?.title || '');
    console.log(this.song.value()?.title);
    this.activatedRoute.params.subscribe((params) => {
      this.songId.set(params['id']);
    });
  }
}
