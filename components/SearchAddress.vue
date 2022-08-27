<template>
  <div class="relative p-4">
    <label for="citySearch" class="sr-only">City</label>
    <input
      type="text"
      name="citySearch"
      v-model="citySearch"
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder="Enter a city"
      @keypress.enter="search"
      @input="results = []"
    />
    <div
      v-show="results.length"
      class="absolute top-10 flex flex-col justify-center w-full bg-white rounded-md p-2"
    >
      <div
        class="hover:bg-gray-100 cursor-pointer"
        v-for="(result, index) in results"
        :key="index"
      >
        {{ result.address.locality }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citySearch: "",
      results: [],
    };
  },
  methods: {
    async search() {
      this.$maps
        .makeAutoComplete(this.citySearch)
        .then((values) => {
          this.results = values.json.resourceSets[0].resources[0].value;
        })
        .catch((failed) => {
          console.log(failed);
        });
    },
  },
};
</script>
