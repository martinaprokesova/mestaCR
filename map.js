// Mapa měst ČR – Leaflet + GeoJSON

// Přibližný střed a výchozí zoom pro celou ČR
const STRED_CR = [49.8, 15.5];
const VYCHOZI_ZOOM = 7;

// Inicializace mapy
const mapa = L.map("mapa").setView(STRED_CR, VYCHOZI_ZOOM);

// Podkladová mapa (OpenStreetMap)
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> přispěvatelé',
}).addTo(mapa);

// Ochrana proti vložení HTML z dat do popupu
function escapeHtml(text) {
  const el = document.createElement("div");
  el.textContent = text ?? "";
  return el.innerHTML;
}

// Obsah popupu pro jeden bod
function vytvorPopup(feature, layer) {
  const p = feature.properties || {};
  layer.bindPopup(`
    <h2 class="popup-nazev">${escapeHtml(p.nazev)}</h2>
    <p class="popup-popisek">${escapeHtml(p.popisek)}</p>
    <p class="popup-id">ID: ${escapeHtml(String(p.id))}</p>
  `);
  layer.bindTooltip(escapeHtml(p.nazev));
}

// Načtení GeoJSONu a vykreslení bodů
fetch("body.geojson")
  .then((odpoved) => {
    if (!odpoved.ok) {
      throw new Error(`HTTP ${odpoved.status}`);
    }
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: vytvorPopup,
    }).addTo(mapa);

    // Přiblížení na všechna načtená města
    if (vrstva.getBounds().isValid()) {
      mapa.fitBounds(vrstva.getBounds(), { padding: [40, 40] });
    }
  })
  .catch((chyba) => {
    console.error("Nepodařilo se načíst body.geojson:", chyba);
    alert(
      "Nepodařilo se načíst data. Otevřete stránku přes lokální server " +
        "(viz README), ne přímo ze souboru."
    );
  });
