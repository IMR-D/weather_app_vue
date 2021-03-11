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
    <div v-if="!!!getCurrentWeather" class="grid grid-col-3">
      <div class="lds-dual-ring col-start-2 "></div>
      <!--<span
        class="grid place-content-center text-center text-blue-800 text-2xl p-8 bg-red-200 antialiased  "
      >
        Приносим свои извинения, но информация о погоде в текущем городе
        отсутствует или ваше местоположение не определено.
        <br />
        Проверьте правильность введенного города и повторите поиск или подождите
        несколько секунд пока ваше местоположение не определится.
      </span>-->
    </div>
    <div v-else class="grid grid-cols-3 ">
      <div class="grid  place-content-center justify-center text-center  ">
        <img
            :src="setImagePath(getCurrentWeather.description)"
            alt="description"
            class=" w-10 h-10 place-self-center"
        />
        <p class="text-lg font-bold justify-center ">
          {{ getCurrentWeather.main }}
        </p>
      </div>
      <span class="flex text-6xl font-thin place-self-center ">
        {{ getCurrentTemp }}
        <sup class="сelsius">
          &#xb0;C
        </sup>
      </span>


      <div class=" textColor grid place-content-center text-base text-right ">
        <div>
          <span> {{ getCurrentTempMax }}&#xb0;C </span>
         <img class="inline mb-2 " src="@/assets/img/arrow_up.svg" alt="arrow"/>
        </div>
        <div>
          <span> {{ getCurrentTempMin }}&#xb0;C </span>
          <img class="inline" src="@/assets/img/arrow_down.svg" alt="arrow"/>
        </div>

      </div>
    </div>
  </div>
</template>`

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainInfo",
  computed: {
    ...mapGetters({
      currentWeather: "GET_DAYLI_WEATHER",
      localTime: "GET_LOCAL_TIME",
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
    setImagePath(imageName) {
      if (this.localTime.time_of_day === "AM") {
        imageName = imageName.replace(" ", '_');
        return imageName ? require(`@/assets/img/night/${imageName}.svg`) : "";
      }
      if (this.localTime.time_of_day === "PM") {
        imageName = imageName.replace(" ", '_');
        return imageName ? require(`@/assets/img/day/${imageName}.svg`) : "";
      }

    },
  },
};
</script>

<style scoped>
.textColor {
  color: rgba(102, 102, 102, 1);
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;

}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.arrow{
  font-size: 9px;
color: black;
}
.сelsius {
  font-size: 24px;
  align-self: center;
}
</style>