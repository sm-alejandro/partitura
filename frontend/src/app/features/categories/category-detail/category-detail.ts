import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Breadcrumb, CategoryDTO, SongDTO } from '../../../shared/models';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-detail',
  imports: [Breadcrumbs, RouterLink, MatIconModule],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.css',
})
export class CategoryDetail {
  categoryId = signal('');
  category = httpResource<CategoryDTO>(() => `/api/categories/${this.categoryId()}`);
  songs = httpResource<SongDTO[]>(() => `/api/categories/${this.categoryId()}/songs`);
  sortedSongs = computed(() => {
    const songs = this.songs.value();
    if (!songs) return [];
    console.log(songs);
    return [...songs].sort((a, b) => a.slug.localeCompare(b.slug));
  });
  readonly breadcrumbs = computed(() => [
    { text: 'Categories', link: '/categories' },
    {
      text: this.category.value()?.name || this.categoryId(),
      link: `/categories/${this.categoryId()}`,
    },
  ]);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId.set(params['id']);
    });
  }
}
