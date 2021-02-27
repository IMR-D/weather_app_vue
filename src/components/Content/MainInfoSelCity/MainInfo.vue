<!-- 

Метод: 
getIcon - Динамически вставляет изображение показывающее погоду по коду полученному из JSON.

-->
<template>
  <div>
    <!-- <PROBLEMO> <PROBLEMO>  <PROBLEMO>  <PROBLEMO>  <PROBLEMO> не скрывает контент если информация отсутствует  -->
    <div v-if="!!!dailyWeather"></div>
    <!-- <PROBLEMO/> <PROBLEMO/>  <PROBLEMO/>  <PROBLEMO/>  <PROBLEMO/>   -->
    <div v-else class="grid grid-cols-3 ">
      <div class="grid place-content-center text-center">
        <img
          :src="getIcon(dailyWeather.current.weather[0].icon)"
          alt="description"
          class="-mt-6"
        />
        <h2 class="text-xl font-semibold -mt-6">
          {{ dailyWeather.current.weather[0].main }}
        </h2>
      </div>
      <h1 class="grid place-content-center text-6xl font-semibold">
        {{ Math.round(dailyWeather.current.temp) }}&#8451;
      </h1>
      <h4 class="grid grid-rows-2 place-content-center text-gray-700 ">
        <span class="col-span-2  pt-10">
          {{ Math.round(dailyWeather.daily[0].temp.max) }}&#8451; &#8593;
        </span>
        <span class="col-span-2">
          {{ Math.round(dailyWeather.daily[0].temp.min) }}&#8451; &#8595;
        </span>
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      dailyWeather: "GET_DAYLI_WEATHER",
    }),
  },

  methods: {
    getIcon(icon) {
      return "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    },
  },
};
</script>
