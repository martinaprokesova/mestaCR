# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa postavená na knihovně [Leaflet](https://leafletjs.com/).
Města jsou uložena v souboru GeoJSON a zobrazují se jako body s popupem.

## Struktura projektu

| Soubor         | Popis                                                  |
|----------------|--------------------------------------------------------|
| `index.html`   | Hlavní stránka, načítá Leaflet, styly a skript         |
| `map.js`       | Inicializace mapy, načtení GeoJSONu, popupy            |
| `styl.css`     | Vzhled stránky a popupů                                |
| `body.geojson` | Data měst (FeatureCollection, geometrie typu Point)    |
| `README.md`    | Tento soubor                                           |

## Spuštění

Data se načítají pomocí `fetch`, proto stránku **nelze otevřít dvojklikem**
(`file://`). Je potřeba spustit lokální server ve složce projektu, např.:

```bash
# Python 3
python -m http.server 8000

# nebo Node.js
npx serve
```

Pak otevřete <http://localhost:8000>.

## Atributy v GeoJSONu

Každý bod má v `properties` tyto atributy:

| Atribut   | Typ     | Význam                       |
|-----------|---------|------------------------------|
| `id`      | číslo   | Jedinečný identifikátor      |
| `nazev`   | text    | Název města                  |
| `popisek` | text    | Krátký popis města           |

## Přidání dalšího města

Do pole `features` v `body.geojson` přidejte další objekt. Pozor: v GeoJSONu
je pořadí souřadnic **[délka, šířka]** (tedy `[lon, lat]`), nikoli opačně.

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

Mapa se po načtení automaticky přiblíží tak, aby byla vidět všechna města.

## Použité technologie a zdroje

- [Leaflet](https://leafletjs.com/) 1.9.4
- Podkladové dlaždice © přispěvatelé [OpenStreetMap](https://www.openstreetmap.org/copyright)
