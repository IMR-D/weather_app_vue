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
  <div class="flex bg-opacity-75 rounded-bl-3xl justify-center bg-blue-100  hover:bg-blue-200 w-46 h-12 ">
    <input
      class="ml-6 text-center rounded-bl-3xl  bg-blue-700 hover:bg-blue-200 w-28 truncate textColor text-center  text-blue-700 text-base
   font-medium bg-opacity-0 placeholder-blue-400 placeholder-opacity-50"
      type="text"
      :value="location.name"
      placeholder="Enter city"
      @click="location.name = null"
      @keyup.enter="(event) => requestWeather(event.target.value)"
    />
    <img @click="getLocation" class="cursor-pointer p-4  " src="@/assets/img/location.svg" alt="location"/>
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
      dailyWeather: "GET_DAYLI_WEATHER",
    }),
  },
  methods: {
    ...mapActions({
      fetchWeather: "FETCH_DAYLI_WEATHER",
      fetchLocation: "FETCH_LAT_LON_CITY",
      fetchNameCity: "FETCH_NAME_CITY",
      fetchDayLength: "FETCH_DAY_LENGTH",
      fetchLocalTime: "FETCH_LOCAL_TIME",
    }),
    async requestWeather(newCity) {
      try {
        await this.fetchLocation(newCity);
        await this.fetchWeather(this.location);
        await this.fetchLocalTime(this.dailyWeather.timezone);
        await this.fetchDayLength(this.location);
      } catch (error) {
        console.log(error);
      }
    },
    async dataGeolocation() {
      try {
        await this.fetchNameCity(this.position);
        await this.fetchWeather(this.position);
        await this.fetchLocalTime(this.dailyWeather.timezone);
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
.textColor{
  color:rgba(13, 160, 234, 1);
  outline:none;

}

</style>
