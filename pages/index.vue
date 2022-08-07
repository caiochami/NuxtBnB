<template>
  <div>
    <div v-for="home in homes" :key="home.objectID">
      <nuxt-link :to="`homes/${home.objectID}`">
        <home-card :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";

export default {
  head: () => ({
    title: "Home Page",
  }),
  data: () => ({
    homes,
  }),
};
</script>
