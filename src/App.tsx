// VisualisationDijkstra.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { algorithmeDijkstra, obtenirChemin } from "@/utils/dijkstra";

const VisualisationDijkstra = () => {
  const grapheExemple = {
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2 },
    E: { C: 10, D: 2 },
  };

  const [noeudDépart, définirNoeudDépart] = useState("A");
  const [noeudFin, définirNoeudFin] = useState("E");
  const [résultat, définirRésultat] = useState<null | {
    distance: number;
    chemin: string[];
  }>(null);

  const trouverCheminPlusCourt = () => {
    const { distances, précédents } = algorithmeDijkstra(
      grapheExemple,
      noeudDépart
    );
    const chemin = obtenirChemin(précédents, noeudFin);
    définirRésultat({
      distance: distances[noeudFin],
      chemin: chemin,
    });
  };

  const positionsNoeuds = {
    A: { x: 50, y: 50 },
    B: { x: 150, y: 30 },
    C: { x: 100, y: 100 },
    D: { x: 200, y: 100 },
    E: { x: 180, y: 170 },
  };

  const afficherLien = (de: string, à: string, poids: number) => {
    // @ts-ignore
    const posDe = positionsNoeuds[de];
    // @ts-ignore
    const posÀ = positionsNoeuds[à];
    const estDansChemin =
      résultat?.chemin.includes(de) &&
      résultat?.chemin.includes(à) &&
      Math.abs(résultat.chemin.indexOf(de) - résultat.chemin.indexOf(à)) === 1;

    return (
      <g key={`${de}-${à}`}>
        <line
          x1={posDe.x + 20}
          y1={posDe.y + 20}
          x2={posÀ.x + 20}
          y2={posÀ.y + 20}
          stroke={estDansChemin ? "#22c55e" : "#94a3b8"}
          strokeWidth={estDansChemin ? 3 : 1}
        />
        <text
          x={(posDe.x + posÀ.x) / 2 + 20}
          y={(posDe.y + posÀ.y) / 2 + 20}
          className="text-sm fill-slate-600"
        >
          {poids}
        </text>
      </g>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Visualisation de l'Algorithme de Dijkstra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Noeud de Départ :
              </label>
              <select
                value={noeudDépart}
                onChange={(e) => définirNoeudDépart(e.target.value)}
                className="border rounded p-1"
              >
                {Object.keys(grapheExemple).map((noeud) => (
                  <option key={noeud} value={noeud}>
                    Noeud {noeud}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Noeud de Fin :
              </label>
              <select
                value={noeudFin}
                onChange={(e) => définirNoeudFin(e.target.value)}
                className="border rounded p-1"
              >
                {Object.keys(grapheExemple).map((noeud) => (
                  <option key={noeud} value={noeud}>
                    Noeud {noeud}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={trouverCheminPlusCourt} className="mt-6">
              Trouver le Chemin
            </Button>
          </div>

          <svg width="300" height="200" className="border rounded">
            {Object.entries(grapheExemple).map(([de, liens]) =>
              Object.entries(liens).map(([à, poids]) =>
                afficherLien(de, à, poids)
              )
            )}
            {Object.entries(positionsNoeuds).map(([noeud, pos]) => (
              <g key={noeud}>
                <circle
                  cx={pos.x + 20}
                  cy={pos.y + 20}
                  r="20"
                  className={`${
                    résultat?.chemin.includes(noeud)
                      ? "fill-green-500"
                      : "fill-slate-200"
                  } stroke-slate-400`}
                />
                <text
                  x={pos.x + 20}
                  y={pos.y + 25}
                  textAnchor="middle"
                  className="text-sm font-medium fill-slate-700"
                >
                  {noeud}
                </text>
              </g>
            ))}
          </svg>

          {résultat && (
            <div className="mt-4">
              <p className="font-medium">Chemin le Plus Court :</p>
              <p>{résultat.chemin.join(" → ")}</p>
              <p className="font-medium mt-2">Distance Totale :</p>
              <p>{résultat.distance}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualisationDijkstra;
