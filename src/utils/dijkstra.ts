import { Graphe } from "@/types/graphe";

export const algorithmeDijkstra = (graphe: Graphe, noeudDépart: string) => {
  const distances: Record<string, number> = {};
  const précédents: Record<string, string | null> = {};
  const nonVisités = new Set<string>();

  // Initialiser les distances
  Object.keys(graphe).forEach((noeud) => {
    distances[noeud] = Infinity;
    précédents[noeud] = null;
    nonVisités.add(noeud);
  });
  distances[noeudDépart] = 0;

  while (nonVisités.size > 0) {
    let noeudMin: string | null = null;
    let distanceMin = Infinity;
    nonVisités.forEach((noeud) => {
      if (distances[noeud] < distanceMin) {
        distanceMin = distances[noeud];
        noeudMin = noeud;
      }
    });

    if (!noeudMin) break;

    nonVisités.delete(noeudMin);

    Object.entries(graphe[noeudMin]).forEach(([voisin, poids]) => {
      if (nonVisités.has(voisin)) {
        // @ts-ignore
        const nouvelleDistance = distances[noeudMin] + poids;
        if (nouvelleDistance < distances[voisin]) {
          distances[voisin] = nouvelleDistance;
          précédents[voisin] = noeudMin;
        }
      }
    });
  }

  return { distances, précédents };
};

export const obtenirChemin = (
  précédents: Record<string, string | null>,
  noeudArrivée: string
): string[] => {
  const chemin: string[] = [];
  let noeudActuel: string | null = noeudArrivée;

  while (noeudActuel !== null) {
    chemin.unshift(noeudActuel);
    noeudActuel = précédents[noeudActuel];
  }

  return chemin;
};
