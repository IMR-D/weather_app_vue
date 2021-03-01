<!-- 

Метод: 
timestamp -  необходим для того, чтобы конвертировать из timestamp 
в нормальную дату числовые значения полученные из API.

getWeatherDaily - определяет какой контент отображать
-->
<template>
  <div>
    <div v-if="!!!getWeatherDaily.length" />
    <div
      v-else
      class="grid grid-flow-col auto-cols-max overflow-x-auto gap-4  pl-5 "
    >
      <div
        class=" grid grid-cols-2 place-items-center text-center w-32 mb-10 shadow-2xl rounded "
        v-for="(value, index) in getWeatherDaily"
        :key="index"
      >
        <img
          :src="getIcon(value.weather[0].icon)"
          alt="description"
          class="w-15 h-15 col-span-2  "
        />
        <span class="col-span-2 text-xl font-semibold -mt-5">
          {{ timestamp(value.dt) }}
        </span>
        <span class=" text-xs text-gray-700">
          {{ value.temp.max }}&#8451; &#8593;
        </span>
        <span class=" text-xs text-gray-700">
          {{ value.temp.min }}&#8451; &#8595;
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CellDaily",
  computed: {
    ...mapGetters({
      dailyWeather: "GET_DAYLI_WEATHER",
    }),
    getWeatherDaily() {
      return this.dailyWeather.daily ? this.dailyWeather.daily.slice(1) : "";
    },
  },
  methods: {
    getIcon(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
    timestamp(dt) {
      const dataObject = new Date(dt * 1000);
      return dataObject.toLocaleString("en-US", {
        weekday: "short",
        day: "numeric",
      });
    },
  },
};
</script>

<style></style>
