import { Component, inject, Input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterLinkActive, MatFormFieldModule, MatInputModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  url = document.URL;
  search = signal('');

  onType(search: string) {
    this.router.navigate(['/songs'], {
      queryParams: { search: search },
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.search.set(queryParams['search']);
    });
  }
}
