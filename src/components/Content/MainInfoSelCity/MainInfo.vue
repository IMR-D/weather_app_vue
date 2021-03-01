<!-- 

Метод: 
getIcon - Динамически вставляет изображение показывающее погоду по коду полученному из JSON.

getCurrentWeather - получает текующую погоду

getCurrentTemp - получает текующую погоду

getCurrentTempMax - получает текующую погоду максимальную температуру

getCurrentTempMin- получает текующую погоду минимальную температуру
-->
<template>
  <div>
    <div v-if="!!!getCurrentWeather">
      <span
        class="grid place-content-center text-center text-blue-800 text-2xl p-8 bg-red-200 antialiased  "
      >
        Приносим свои извинения, но информация о погоде в текущем городе
        отсутствует или ваше местоположение не определено.
        <br />
        Проверьте правильность введенного города и повторите поиск или подождите
        несколько секунд пока ваше местоположение не определится.
      </span>
    </div>
    <div v-else class="grid grid-cols-3 ">
      <div class="grid place-content-center text-center">
        <img
          :src="getIcon(getCurrentWeather.icon)"
          alt="description"
          class="-mt-6"
        />
        <h2 class="text-xl font-semibold -mt-6  ">
          {{ getCurrentWeather.main }}
        </h2>
      </div>
      <h1 class="grid place-content-center text-6xl font-semibold   ">
        {{ getCurrentTemp }}&#8451;
      </h1>
      <h4 class="grid grid-rows-2 place-content-center text-gray-700 ">
        <span class="col-span-2  pt-10 ">
          {{ getCurrentTempMax }}&#8451; &#8593;
        </span>
        <span class="col-span-2"> {{ getCurrentTempMin }}&#8451; &#8595; </span>
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainInfo",
  computed: {
    ...mapGetters({
      currentWeather: "GET_DAYLI_WEATHER",
    }),
    getCurrentWeather() {
      return this.currentWeather.current
        ? this.currentWeather.current.weather[0]
        : null;
    },
    getCurrentTemp() {
      return this.currentWeather.current
        ? Math.round(this.currentWeather.current.temp)
        : null;
    },
    getCurrentTempMax() {
      return this.currentWeather.current
        ? Math.round(this.currentWeather.daily[0].temp.max)
        : null;
    },
    getCurrentTempMin() {
      return this.currentWeather.current
        ? Math.round(this.currentWeather.daily[0].temp.min)
        : null;
    },
  },

  methods: {
    getIcon(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
  },
};
</script>
