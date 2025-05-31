import type { Identifiable } from "./Identifiable";

export interface Author extends Identifiable {
	name: string;
	image: string;
}
