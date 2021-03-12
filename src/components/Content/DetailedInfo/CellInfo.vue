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
    <div v-if="!getCurrentWeather" />
    <div v-else class="flex flex-row flex-wrap text-center ">
      <div
        class="w-1/3 container "
        v-for="(info, index) in currentWeatherSelective"
        :key="index"
      >
          <img
            class="w-6 h-6 m-3 object-center"
            :src="setImagePath(info.name)"
            :alt="info.name"
          />
        <span class="block text-base font-bold">
          {{ filterValue({ value: info.value, info: info.name })
          }}{{ info.measurement }}
        </span>
        <span class="text-gray-700 text_desc font-medium">{{ info.name }}</span>
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
      currentWeatherSelective: "GET_CURRENT_WEATHER_SELECTIVE",
      dailyWeather: "GET_DAILY_WEATHER",
    }),
    getCurrentWeather() {
      return this.dailyWeather.current ? true : false;
    },
  },
  methods: {
    filterValue({ value, info }) {
      if (info == "Pressure") {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      else if (value && value.toString().length >= 5) {
        return this.timestamp({ value, info });
      } else return value;
    },

    timestamp({ value, info }) {
      //Приводим время к виду 11h 21m (Example)
       if (info == "Daytime") {
        value = value.split(":").slice(0, 2);
        return `${value[0]}h ${value[1]}m `;
      }
      else
        return new Date(value * 1000).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
    },
    setImagePath(imageName) {
      return imageName ? require(`@/assets/img/day/${imageName}.svg`) : "";
    },
  },
};
</script>

<style scoped>
.text_desc{
  font-size: 8px;
}
</style>