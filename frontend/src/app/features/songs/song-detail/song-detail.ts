import { Component, computed, inject, Input, signal } from '@angular/core';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { httpResource } from '@angular/common/http';
import { CategoryDTO, SongDTO } from '../../../shared/models';
import { API_URL } from '../../../shared/consts';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-song-detail',
  imports: [Breadcrumbs, RouterLink, MatIconModule],
  templateUrl: './song-detail.html',
  styleUrl: './song-detail.css',
})
export class SongDetail {
  @Input() songId = signal('');
  readonly breadcrumbs = computed(() => [
    { text: 'Songs', link: '/songs' },
    {
      text: this.song.value()?.title || this.songId(),
      link: `/categories/${this.songId()}`,
    },
  ]);
  song = httpResource<SongDTO>(() => `${API_URL}/songs/${this.songId()}`);
  songCategory = httpResource<CategoryDTO>(
    () => `${API_URL}/categories/${this.song.value()?.category}`
  );
  songAuthor = httpResource<CategoryDTO>(() => `${API_URL}/authors/${this.song.value()?.author}`);
  files = httpResource<string[]>(() => `${API_URL}/songs/${this.songId()}/files`);
  sortedFiles = computed(() => {
    const files = this.files.value();
    if (!files) return [];
    return [...files].sort((a, b) => a.localeCompare(b));
  });

  fileURI(uri: string) {
    return `${API_URL}/file?file=${encodeURIComponent(uri)}`;
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.songId.set(params['id']);
    });
  }
}
