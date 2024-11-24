export type Graphe = Record<string, Record<string, number>>;

export interface PositionNoeud {
  x: number;
  y: number;
}

export interface Résultat {
  distance: number;
  chemin: string[];
}
