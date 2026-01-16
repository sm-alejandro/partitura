export interface Identifiable {
  id: number;
}

export interface AuthorDTO extends Identifiable {
  name: string;
  image: string;
}

export interface CategoryDTO extends Identifiable {
  name: string;
}

export interface PlaylistDTO extends Identifiable {
  name: string;
  id: number;
}

export interface SongDTO extends Identifiable {
  slug: string;
  title: string;
  author: number;
  category: number;
  folder: string;
  image: string;
}

export interface Breadcrumb {
  text: string;
  link: string;
}
