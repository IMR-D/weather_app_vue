<!-- 

Метод: 
timestamp -  необходим для того, чтобы конвертировать из timestamp 
в нормальную дату числовые значения полученные из API.

getWeatherDaily - определяет какой контент отображать
-->
<template>
  <div >
    <div v-if="!dailyWeather" />
    <div
      v-else
      class="flex flex-row overflow-x-auto gap-4 pl-5  "
    >
      <div
        class="myShadow mt-5 mb-10 rounded-2xl pl-6 pr-6 pb-6  pt-4"
        v-for="(value, index) in getWeatherDaily"
        :key="index"
      >
        <img
          :src="setImagePath(value.weather[0].description)"
          alt="description"
          class="w-15 h-15 pb-2"
        />

        <span class="col-span-2 text-base font-bold ">
          {{ timestamp(value.dt) }}
        </span>
      <div class="flex">
        <div class="flex items-stretch mr-1 self-start">
          <span class="textColor ">
            {{ Math.round(value.temp.max) }}&#xb0;C
          </span>
          <img class="inline p_temp_arrow" src="@/assets/img/arrow_up.svg" alt="arrow"/>
        </div>
          <div class="flex items-stretch ml-1 self-start">
            <span class="textColor">
            {{ Math.round(value.temp.min) }}&#xb0;C
            </span>
            <img class="inline p_temp_arrow" src="@/assets/img/arrow_down.svg" alt="arrow"/>
          </div>
      </div>
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
      dailyWeather: "GET_DAILY_WEATHER",
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
.myShadow{
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.p_temp_arrow{
  padding-left: 0.125rem;
}
</style>
