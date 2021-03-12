<!-- 

Метод: 
requestWeather - запрос который делает пользователь вводя в input название города, 
в этом методе происходит поиск координат города по его названию и получение 
погодных условий по найденным ранее координатам.

dataGeocurrent_location - позволяет найти город в котором находится клиент по геолокации

success - выполняет действия по определению местоположения 
error - ошибка в случае проблем с определением местоположения 
-->

<template>
  <div class="flex flex-auto bg-opacity-75 rounded-bl-3xl justify-center bg-blue-100  hover:bg-blue-200 w-46 h-12 ">
    <input
        class="text-color text-center rounded-bl-3xl  bg-blue-700 hover:bg-blue-200 w-28 truncate  text-center  text-blue-700 text-base
    bg-opacity-0 placeholder-blue-400 placeholder-opacity-50 ml-6 "
        type="text"
        :value="current_location.name"
        placeholder="Enter city"
        @click="current_location.name = null"
        @keyup.enter="(event) => requestWeather(event.target.value)"
    />
    <img @click="getLocation" class="cursor-pointer p-4" src="@/assets/img/location.svg" alt="current_location"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Search",
  data() {
    return {
      position: {},
      options: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      current_location: "current_current_location",
      current_weather_selective: "current_weather_selective",
      daily_weather: "daily_weather",
    }),
  },
  methods: {
    ...mapActions({
      fetchDailyWeather: "fetchDailyWeather",
      fetchLatLonCity: "fetchLatLonCity",
      fetchNameCity: "fetchNameCity",
      fetchDayLength: "fetchDayLength",
      fetchLocalTime: "fetchLocalTime",
    }),
    async requestWeather(newCity) {
      try {
        await this.fetchLatLonCity(newCity);
        await this.fetchDailyWeather(this.current_location);
        await this.fetchLocalTime(this.daily_weather.timezone);
        await this.fetchDayLength(this.current_location);
      } catch (error) {
        console.log(error);
      }
    },
    async dataGeolocation() {
      try {
        await this.fetchNameCity(this.position);
        await this.fetchDailyWeather(this.position);
        await this.fetchLocalTime(this.daily_weather.timezone);
        await this.fetchDayLength(this.position);
      } catch (error) {
        console.log(error);
      }
    },
    async success(pos) {
      this.position = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      try {
        await this.dataGeolocation();
      } catch (error) {
        console.log(error);
      }
    },
    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    getLocation(){
      navigator.geolocation.getCurrentPosition(
          this.success,
          this.error,
          this.options
      );
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  },
};
</script>

<style scoped>
.text-color {
  color: rgba(13, 160, 234, 1);
  outline: none;
  font-weight: 600;
}

</style>
