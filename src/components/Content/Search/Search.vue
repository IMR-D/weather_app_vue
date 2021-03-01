<!-- 

Метод: 
requestWeather - запрос который делает пользователь вводя в input название города, 
в этом методе происходит поиск координат города по его названию и получение 
погодных условий по найденным ранее координатам.

dataGeolocation - позволяет найти город в котором находится клиент по геолокации

success - выполняет действия по определению местоположения 
error - ошибка в случае проблем с определением местоположения 
-->

<template>
  <div class="flex justify-center ">
    <input
      class="w-full text-center rounded-r-xl text-blue-700 text-3xl
    font-bold hover:bg-blue-200 bg-blue-100 placeholder-blue-700 placeholder-opacity-50"
      type="text"
      :value="location.name"
      placeholder="Enter city"
      @click="location.name = null"
      @keyup.enter="(event) => requestWeather(event.target.value)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      location: "GET_CURRENT_LOCATION",
      currentWeather: "GET_CURRENT_WEATHER",
      dailyWeather: "GET_DAILY_WEATHER",
    }),
  },
  methods: {
    ...mapActions({
      fetchWeather: "FETCH_DAYLI_WEATHER",
      fetchLocation: "FETCH_LAT_LON_CITY",
      fetchNameCity: "FETCH_NAME_CITY",
      fetchDayLength: "FETCH_DAY_LENGTH",
    }),
    async requestWeather(newCity) {
      try {
        await this.fetchLocation(newCity);
        await this.fetchWeather(this.location);
        await this.fetchDayLength(this.location);
      } catch (error) {
        console.log(error);
      }
    },
    async dataGeolocation() {
      try {
        await this.fetchNameCity(this.position);
        await this.fetchWeather(this.position);
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
      this.dataGeolocation();
    },
    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
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

<style scoped></style>
