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
      <div ref="map" class="relative h-96 w-auto"></div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  async asyncData({ params, $dataApi }) {
    const home = await $dataApi.getHome(params.id);

    return {
      home,
    };
  },
  computed: {
    fullAddress() {
      const { address, city, state, country } = this.home.location;

      return `${address}, ${city}, ${state}, ${country}`;
    },
  },
};
</script>
