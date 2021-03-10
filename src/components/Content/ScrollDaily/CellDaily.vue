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
        class=" w-24 h-28 grid grid-cols-2 place-items-center  mt-5 mb-10 shadow-2xl rounded-2xl p-3"
        v-for="(value, index) in getWeatherDaily"
        :key="index"
      >
        <img
          :src="setImagePath(value.weather[0].description)"
          alt="description"
          class="w-15 h-15 col-span-2 m-2 "
        />
        <span class="col-span-2 text-base font-medium  ">
          {{ timestamp(value.dt) }}
        </span>
        <span class="  textColor  place-self-end mr-1 ">
          {{ Math.round(value.temp.max) }}&#8451;&#8593;
        </span>
        <span class=" textColor  place-self-start ml-1 ">
          {{ Math.round(value.temp.min) }}&#8451;&#8595;
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
    setImagePath(imageName) {
      imageName = imageName.toLowerCase().replace(" ",'_');
      return imageName ? require(`@/assets/img/day/${imageName}.svg`) : "";
    },
    timestamp(dt) {
      const dataObject = new Date(dt * 1000);
      const str = dataObject.toLocaleString("en-US", {
        weekday: "short",
        day: "numeric",
      });
      return str.split(" ").reverse().join(',');
    },
  },
};
</script>

<style scoped>
.textColor{
  font-size: 8px;
  color: rgba(153, 153, 153, 1);
}

</style>
