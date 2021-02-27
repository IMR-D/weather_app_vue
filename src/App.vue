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
  max-width: 664px;
  min-width: 414px;
}
</style>
