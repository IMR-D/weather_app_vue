<template>
  <div id="app">
    <Weather/>
  </div>
</template>

<script>
import Weather from "@/views/Weather";

export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style scoped>
#app {
  font-family: 'Barlow', sans-serif;
}

</style>
