import { httpResource } from '@angular/common/http';
import { Component, computed, inject, OnInit, Query, signal } from '@angular/core';
import { Breadcrumb, SongDTO } from '../../shared/models';
import { API_URL } from '../../shared/consts';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-songs',
  imports: [Breadcrumbs, MatIcon, RouterLink],
  templateUrl: './songs.html',
  styleUrl: './songs.css',
})
export class Songs implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  search = signal('');
  breadcrumbs: Breadcrumb[] = [{ text: 'Songs', link: '/songs' }];
  songs = httpResource<SongDTO[]>(() => `${API_URL}/songs`);

  sortedSongs = computed(() => {
    const songs = this.songs.value();
    if (!songs) return [];
    const sorted = songs.filter((s) => s.slug).sort((a, b) => a.slug.localeCompare(b.slug));
    if (this.search && this.search() != '')
      return sorted.filter(
        (s) =>
          s.slug.toLowerCase().includes(this.search().toLowerCase()) ||
          s.title.toLowerCase().includes(this.search().toLowerCase()) ||
          s.folder.toLowerCase().includes(this.search().toLowerCase()),
      );
    return sorted;
  });

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.search.set(queryParams['search'] || '');
    });
  }
}
