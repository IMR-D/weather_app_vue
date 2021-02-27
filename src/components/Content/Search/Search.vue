<!-- 

Метод: 
requestWeather - запрос который делает пользователь вводя в input название города, 
в этом методе происходит поиск координат города по его названию и получение 
погодных условий по найденным ранее координатам.

inputShow - отображает/скрывает поле ввода/искомый город.
-->

<template>
  <div class="flex justify-center ">
    <h1
      v-if="!showCity"
      v-on:click="inputShow"
      class="w-full h-full text-center text-2xl text-blue-600 font-semibold p-4 bg-blue-400 bg-opacity-25 rounded-l-lg"
    >
      {{ location.name }}
    </h1>

    <input
      class="w-full text-center rounded-r-xl"
      v-else
      type="text"
      placeholder="Enter city"
      @keyup.enter="(event) => requestWeather(event.target.value)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showCity: true,
      position: {},
    };
  },
  computed: {
    ...mapGetters({
      location: "GET_CURRENT_LOCATION",
      currentWeather: "GET_CURRENT_WEATHER",
      dailyWeather: "GET_DAILY_WEATHER",
    }),
  },
  // <PROBLEMO> <PROBLEMO>  <PROBLEMO>  <PROBLEMO>  <PROBLEMO>
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.position = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.FETCH_NAME_CITY(this.position);
        this.FETCH_DAYLI_WEATHER(this.position);
        console.log(this.location);
      });
    } else {
      return console.log(
        "Разрешите доступ на получение вашего местоположения!"
      );
    } //  <PROBLEMO/> <PROBLEMO/>  <PROBLEMO/>  <PROBLEMO/>  <PROBLEMO/>
  },
  methods: {
    ...mapActions([
      "FETCH_CURRENT_WEATHER",
      "FETCH_DAYLI_WEATHER",
      "FETCH_LAT_LON_CITY",
      "FETCH_NAME_CITY",
    ]),
    async requestWeather(newCity) {
      try {
        this.inputShow();
        await this.FETCH_LAT_LON_CITY(newCity);
        await this.FETCH_DAYLI_WEATHER(this.location);
      } catch (error) {
        console.log(error);
      }
    },
    inputShow() {
      this.showCity = !this.showCity;
    },
  },
};
</script>

<style scoped></style>
