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
      <span>
        {{ home.guests }} guests, {{ home.bedrooms }} rooms,
        {{ home.beds }} beds, {{ home.bathrooms }} bath
      </span>
      <div ref="map" class="relative h-96 w-auto"></div>

      <div v-for="review in reviews" :key="review.objectID">
        <div class="flex flex-row space-x-2">
          <img :src="review.reviewer.image" alt="review.objectID" />
          <div class="flex flex-col space-y-2">
            <p class="text-lg text-gray-600">{{ review.reviewer.name }}</p>
            <span>{{ formatDate(review.date) }}</span>
            <short-text :text="review.comment" :target="150" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <img :src="user.image" alt="User" />
        <span>{{ user.name }}</span>
        <span>{{ formatDate(user.joined) }}</span>
        <span>{{ user.reviewCount }}</span>
        <span>{{ user.description }}</span>
      </div>
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
  async asyncData({ params, $dataApi, error }) {
    return Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUsersByHomeId(params.id),
    ])
      .then((values) => {
        return {
          home: values[0].json,
          reviews: values[1].json.hits,
          user: values[2].json.hits[0],
        };
      })
      .catch((failed) => {
        return error({
          statusCode: failed.status,
          message: failed.statusText,
        });
      });
  },
  computed: {
    fullAddress() {
      const { address, city, state, country } = this.home.location;

      return `${address}, ${city}, ${state}, ${country}`;
    },
  },
  methods: {
    formatDate(dateTime) {
      const date = new Date(dateTime);

      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
