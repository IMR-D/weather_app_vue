<template>
  <div id="app" >
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
  min-width: 375px;
  max-width: 777px;
  max-height: 812px;
}
</style>
