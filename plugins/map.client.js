export default function (context, inject) {
  let mapLoaded = false;

  let mapWaiting = null;

  addScript();

  inject("maps", {
    showMap,
  });

  function addScript() {
    const script = document.createElement("script");

    script.src = "https://www.bing.com/api/maps/mapcontrol?callback=initMap";

    script.async = true;

    window.initMap = initMap;

    document.head.appendChild(script);
  }

  function initMap() {
    mapLoaded = true;

    if (mapWaiting) {
      const { canvas, lat, lng } = mapWaiting;

      renderMap(canvas, lat, lng);

      mapWaiting = null;
    }
  }

  function showMap(canvas, lat, lng) {
    if (mapLoaded) renderMap(canvas, lat, lng);
    else
      mapWaiting = {
        canvas,
        lat,
        lng,
      };
  }

  function renderMap(canvas, lat, lng) {
    const mapOptions = {
      credentials:
        "AoVLdaruC1LgCST8bLv8f-i22TR4QwSPnvF2fwPJnFam0foCnwUNyVNjr8wqjgsm",
      center: new Microsoft.Maps.Location(lat, lng),
      zoom: 18,
      disableScrollWheelZoom: true,
      disableZooming: true,
    };

    const map = new Microsoft.Maps.Map(canvas, mapOptions);

    const position = map.getCenter();

    const pin = new Microsoft.Maps.Pushpin(position, {
      title: "Title",
      subTitle: "Subtitle",
    });

    map.entities.push(pin);
  }
}
