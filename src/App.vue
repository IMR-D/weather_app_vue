<template>
  <div id="app">
    <Weather />
  </div>
</template>

<script>
import Weather from "@/components/pages/Weather";
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
  width: 375px;
  height: 812px;
}
</style>
