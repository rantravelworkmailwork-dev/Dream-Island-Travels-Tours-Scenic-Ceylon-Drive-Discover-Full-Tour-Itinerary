document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the exact 14-day itinerary
  const routeStops = [
    {
      day: "Day 1 (Jan 05)",
      title: "Negombo",
      coords: [7.2083, 79.8358],
      desc: "Airport pick-up at 10:50 PM by your private chauffeur and private transfer to your hotel in Negombo."
    },
    {
      day: "Day 2 (Jan 06)",
      title: "Dambulla & Sigiriya",
      coords: [7.8567, 80.6492],
      desc: "Dambulla Cave Temple and Golden Buddha Statue, then on to Sigiriya."
    },
    {
      day: "Days 3 – 4 (Jan 07 – 08)",
      title: "Habarana, Sigiriya & Polonnaruwa",
      coords: [8.0339, 80.7533],
      desc: "Habarana elephant safari, optional traditional Ayurvedic massage, Sigiriya Rock Fortress & Polonnaruwa Ancient City."
    },
    {
      day: "Days 5 – 6 (Jan 09 – 10)",
      title: "Kandy",
      coords: [7.2906, 80.6337],
      desc: "Matale Spice Garden, Temple of the Tooth Relic & Peradeniya Royal Botanical Gardens."
    },
    {
      day: "Day 7 (Jan 11)",
      title: "Nuwara Eliya",
      coords: [6.9497, 80.7891],
      desc: "Scenic drive via tea factory, tea plantation & Ramboda Waterfalls."
    },
    {
      day: "Days 8 – 9 (Jan 12 – 13)",
      title: "Ella",
      coords: [6.8667, 81.0467],
      desc: "Horton Plains National Park, scenic train ride from Nuwara Eliya, Little Adam's Peak & Nine Arch Bridge."
    },
    {
      day: "Days 10 – 11 (Jan 14 – 15)",
      title: "Yala",
      coords: [6.3117, 81.3433],
      desc: "Travel from Ella via Ravana Falls to Yala, followed by an early morning Yala National Park safari."
    },
    {
      day: "Day 12 (Jan 16)",
      title: "Galle",
      coords: [6.0535, 80.2210],
      desc: "A day of snorkelling along the southern coast."
    },
    {
      day: "Days 13 – 14 (Jan 17 – 18)",
      title: "Colombo & Departure",
      coords: [6.9271, 79.8612],
      desc: "Drive from Galle and a relaxing day at leisure, followed by the Colombo city tour and a private airport transfer on the night of 18th January."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});
