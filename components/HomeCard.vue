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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullAddress() {
      const { address, city, state, country } = this.home.location;

      return `${address}, ${city}, ${state}, ${country}`;
    },
  },
};
</script>
