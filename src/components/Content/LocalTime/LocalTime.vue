<!-- 

Метод: 
the_local_time -сторонняя бибилиотека Luxon позволяет точно определить местное время учитывая все часовые пояса.

-->

<template>
  <div class="text-start text-lg text-gray-700 p-4">
    <span>
      {{ the_local_time }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime, Settings } from "luxon";
export default {
  name: "LocalTime",
  computed: {
    ...mapGetters({
      dailyWheather: "GET_DAYLI_WEATHER",
      getTime: "GET_TIME",
    }),
    the_local_time() {
      Settings.defaultZoneName = this.dailyWheather.timezone;
      const start = DateTime.local();
      return start.toFormat("cccc, dd LLL yyyy hh:mm a").toString();
    },
  },
};
</script>
