<template>
  <div class="flex flex-col">
    <div class="flex">
      <img
        v-for="(image, index) in home.images"
        :src="image"
        :key="index"
        class="h-48 w-48"
        alt="home image"
      />
    </div>
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ home.title }}</h1>
      <p class="text-lg">{{ home.description }}</p>
      <span>${{ home.pricePerNight }} / Night</span>
      <div>
        <img
          src="/images/marker.svg"
          class="h-4 w-4 inline-block"
          alt="worker"
        />
        <span>{{ fullAddress }}</span>
      </div>
      <div>
        <img src="/images/star.svg" alt="star" class="h-4 w-4 inline-block" />
        <span>{{ home.reviewValue }}</span>
      </div>
      <span
        >{{ home.guests }} guests, {{ home.bedrooms }} rooms,
        {{ home.beds }} beds, {{ home.bathrooms }} bath</span
      >
      <div id="map" class="relative h-96 w-auto"></div>
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";

export default {
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src: "https://www.bing.com/api/maps/mapcontrol",
          hid: "bing-maps",
          defer: true,
          callback: () => {
            const mapOptions = {
              credentials:
                "AoVLdaruC1LgCST8bLv8f-i22TR4QwSPnvF2fwPJnFam0foCnwUNyVNjr8wqjgsm",
              center: new Microsoft.Maps.Location(
                this.home._geoloc.lat,
                this.home._geoloc.lng
              ),
              zoom: 18,
              disableScrollWheelZoom: true,
              disableZooming: true,
            };

            const map = new Microsoft.Maps.Map("#map", mapOptions);

            const position = map.getCenter();

            const pin = new Microsoft.Maps.Pushpin(position, {
              title: this.home.title,
              subTitle: this.home.type,
            });

            map.entities.push(pin);
          },
        },
      ],
    };
  },
  data: () => ({
    home: {},
    map: null,
  }),
  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id);
  },
  computed: {
    fullAddress() {
      const { address, city, state, country } = this.home.location;

      return `${address}, ${city}, ${state}, ${country}`;
    },
  },
};
</script>
