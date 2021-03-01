<!-- 

Методы: 
filterValue - необходим для того, чтобы определить какие числовые
значения стоит конвертировать, а какие стоит игнорировать. 

timestamp - необходим для того, чтобы конвертировать из timestamp 
в нормальную дату числовые значения полученные из API.

setImagePath - получает путь к фотографиии

getCurrentWeather - по нему определяем отображать контент или нет.

-->
<template>
  <div>
    <div v-if="!!!getCurrentWeather" />
    <div v-else class="grid grid-cols-3 text-center gap-10 pt-8 pb-8 ">
      <div
        class=" grid  place-items-center "
        v-for="(info, index) in currentWeatherSelecttve"
        :key="index"
      >
        <img
          class="w-8 h-8 pl-1 "
          :src="setImagePath(info.name)"
          :alt="info.name"
        />
        <span class="text-2xl font-semibold">
          {{ filterValue({ value: info.value, info: info.name })
          }}{{ info.measurement }}
        </span>
        <span class="text-gray-700 text-lg ">{{ info.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CellInfo",
  computed: {
    ...mapGetters({
      currentWeatherSelecttve: "GET_CURRENT_WEATHER_SELECTIVE",
      dailyWheather: "GET_DAYLI_WEATHER",
    }),
    getCurrentWeather() {
      return this.currentWeatherSelecttve ? true : false;
    },
  },
  methods: {
    filterValue({ value, info }) {
      if (value && value.toString().length >= 5) {
        return this.timestamp({ value, info });
      } else return value;
    },

    timestamp({ value, info }) {
      //Приводим время к виду 11h 21m (Example)
      if (info == "Daytime") {
        value = value.split(":").slice(0, 2);
        return `${value[0]}h ${value[1]}m `;
      } else
        return new Date(value * 1000).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
    },

    setImagePath(imageName) {
      return imageName ? require(`@/assets/${imageName}.svg`) : "";
    },
  },
};
</script>
