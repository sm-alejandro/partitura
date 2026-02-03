import { httpResource } from '@angular/common/http';
import { Component, computed } from '@angular/core';
import { Breadcrumb, CategoryDTO } from '..//../shared/models';
import { Breadcrumbs } from '..//../shared/breadcrumbs/breadcrumbs';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [Breadcrumbs, MatIconModule, RouterLink, Breadcrumbs],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  breadcrumbs: Breadcrumb[] = [{ text: 'Categories', link: '/categories' }];
  categories = httpResource<CategoryDTO[]>(() => '/api/categories');
  sortedCategories = computed(() => {
    const categories = this.categories.value();
    if (!categories) return [];
    return [...categories].sort((a, b) => a.name.localeCompare(b.name));
  });
}
