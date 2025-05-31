import type { Identifiable } from "./Identifiable";

export interface Song extends Identifiable {
	title: string;
	author: string;
	category: string;
	folder: string;
	image: string;
}
