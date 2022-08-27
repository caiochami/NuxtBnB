import { unwrap } from "../utilities/unwrap";

export default function (context, inject) {
  const bingApiKey =
    "AoVLdaruC1LgCST8bLv8f-i22TR4QwSPnvF2fwPJnFam0foCnwUNyVNjr8wqjgsm";

  let isLoaded = false;

  let waiting = [];

  addScript();

  inject("maps", {
    showMap,
    makeAutoComplete,
  });

  function addScript() {
    const script = document.createElement("script");

    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=initBingMap";

    script.async = true;

    window.initBingMap = initBingMap;

    document.head.appendChild(script);
  }

  function initBingMap() {
    isLoaded = true;

    waiting.forEach((item) => {
      if (typeof item.fn === "function") {
        item.fn(...item.arguments);
      }
    });

    waiting = [];
  }

  async function makeAutoComplete(value) {
    if (!isLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        arguments,
      });

      return;
    }

    return unwrap(
      await fetch(
        `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${value}&includeEntityTypes=Address,Place&key=${bingApiKey}`
      )
    );
  }

  function showMap(canvas, lat, lng) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      });

      return;
    }

    const mapOptions = {
      credentials: bingApiKey,
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
