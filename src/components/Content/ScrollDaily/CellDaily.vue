<!-- 

Метод: 
timestamp -  необходим для того, чтобы конвертировать из timestamp 
в нормальную дату числовые значения полученные из API.

weatherDaily - определяет какой контент отображать
-->
<template>
  <div>
    <div v-if="!daily_weather"/>
    <div
        v-else
        class="my-padding flex flex-row text-center overflow-x-auto w-full gap-4 pl-5 "
    >
      <div
          class="my-shadow container mt-5 mb-10 rounded-2xl pl-6 pr-6 pb-4 pt-2 "
          v-for="(value, index) in weatherDaily"
          :key="index"
      >
        <img
            :src="setImagePath(value.weather[0].description)"
            alt="description"
            class="w-full object-none object-center h-10 "
        />

        <span class=" text-base font-bold ">
          {{ timestamp(value.dt) }}
        </span>
        <div class="flex justify-center">
          <div class="flex mr-1 ">
          <span class="text-color ">
            {{ Math.round(value.temp.max) }}&#xb0;C
          </span>
            <img class="inline temp-arrow" src="@/assets/img/arrow_up.svg" alt="arrow"/>
          </div>
          <div class="flex ml-1 ">
            <span class="text-color">
            {{ Math.round(value.temp.min) }}&#xb0;C
            </span>
            <img class="inline temp-arrow" src="@/assets/img/arrow_down.svg" alt="arrow"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CellDaily",
  computed: {
    ...mapGetters({
      daily_weather: "daily_weather",
    }),
    weatherDaily() {
      return this.daily_weather.daily ? this.daily_weather.daily.slice(1) : "";
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
.text-color {
  font-size: 8px;
  color: rgba(153, 153, 153, 1);
}

.my-shadow {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.my-padding::after {
  content: '';
  padding-right: 0.5rem;
}

.temp-arrow {
  padding-left: 0.125rem;
}
</style>
