import { Component, Input, input } from '@angular/core';
import { Breadcrumb } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.css',
})
export class Breadcrumbs {
  @Input() items: Breadcrumb[] = [];
}
