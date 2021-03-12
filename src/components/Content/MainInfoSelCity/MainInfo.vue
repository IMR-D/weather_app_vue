<!-- 

Метод: 
getIcon - Динамически вставляет изображение показывающее погоду по коду полученному из JSON.

current_weather_selective - получает текующую погоду

CurrentTemp - получает текующую погоду

CurrentTempMax - получает текующую погоду максимальную температуру

CurrentTempMin- получает текующую погоду минимальную температуру
-->

<template>
  <div>
    <div v-if="!current_weather_selective" class="flex justify-center h-auto ">
      <div class=" lds-dual-ring "/>
    </div>
    <div v-else class="flex text-center items-center  ">
      <div class="w-1/3 container">
        <img
            :src="setImagePath(currentWeatherSelective.description)"
            alt="description"
            class="w-full h-10"
        />
        <p class="text-lg font-bold">
          {{ currentWeatherSelective.main }}
        </p>
      </div>
      <span class="w-1/3 justify-center flex text-6xl font-thin">
        {{ currentTemp }}
        <sup class="celsius font-bold">
          &#xb0;C
        </sup>
      </span>
      <div class="w-1/3 text-color text-base text-center">
        <div class="mb-1 ">
          <span> {{ currentTempMax }}&#xb0;C </span>
          <img class="inline mb-2 " src="@/assets/img/arrow_up.svg" alt="arrow"/>
        </div>
        <div>
          <span> {{ currentTempMin }}&#xb0;C </span>
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
      current_weather_selective: "daily_weather",
      localTime: "local_time",
    }),
    currentWeatherSelective() {
      return this.current_weather_selective.current
          ? this.current_weather_selective.current.weather[0]
          : false;
    },
    currentTemp() {
      return this.current_weather_selective.current
          ? Math.round(this.current_weather_selective.current.temp)
          : false;
    },
    currentTempMax() {
      return this.current_weather_selective.current
          ? Math.round(this.current_weather_selective.daily[0].temp.max)
          : false;
    },
    currentTempMin() {
      return this.current_weather_selective.current
          ? Math.round(this.current_weather_selective.daily[0].temp.min)
          : false;
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
.text-color {
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
  border: 6px solid;
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

.celsius {
  font-size: 24px;
  align-self: center;
  color:  rgba(102, 102, 102, 1);
}
</style>