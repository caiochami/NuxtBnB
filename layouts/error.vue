<template>
  <div class="py-16">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">
        {{ error.statusCode }}
      </p>
      <h1
        class="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight"
      >
        {{ error.statusText }}
      </h1>
      <p class="mt-2 text-base text-gray-500">
        {{ error.message }}
      </p>
      <div class="mt-6">
        <nuxt-link
          class="text-base font-medium text-indigo-600 hover:text-indigo-500"
          to="/"
          >Go back home</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.error.statusCode,
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
