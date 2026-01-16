import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { API_URL } from '../../shared/consts';
import { Breadcrumb, CategoryDTO } from '../../shared/models';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  imports: [Breadcrumbs, MatIconModule, RouterLink],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
})
export class Authors {
  breadcrumbs: Breadcrumb[] = [{ text: 'Authors', link: '/authors' }];
  authors = httpResource<CategoryDTO[]>(() => `${API_URL}/authors`);
  sortedAuthors = computed(() => {
    const authors = this.authors.value();
    if (!authors) return [];
    return [...authors].sort((a, b) => a.name.localeCompare(b.name));
  });
}
