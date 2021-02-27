<!-- 

Методы: 
filterValue - необходим для того, чтобы определить какие числовые
значения стоит конвертировать, а какие стоит игнорировать. 

timestamp - необходим для того, чтобы конвертировать из timestamp 
в нормальную дату числовые значения полученные из API.

-->
<template>
  <div>
    <div v-if="!!!dailyWheather"></div>
    <div v-else class="grid grid-cols-3 text-center gap-10 pt-8 pb-8 ">
      <div
        class=" grid  place-items-center "
        v-for="(info, index) in currentWeatherSelecttve"
        :key="index"
      >
        <img
          class="w-8 h-8 pl-1 "
          :src="require(`@/assets/${info.name}.svg`)"
          :alt="info.name"
        />
        <span class="text-2xl font-semibold">
          {{ filterValue(info.value, info.name) }}{{ info.measurement }}
        </span>
        <span class="text-gray-700 text-lg ">{{ info.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      currentWeatherSelecttve: "GET_CURRENT_WEATHER_SELECTIVE",
      dailyWheather: "GET_DAYLI_WEATHER",
    }),
  },
  methods: {
    filterValue(...args) {
      if (args[0].toString().length >= 5) {
        return this.timestamp(args);
      } else return args[0];
    },

    timestamp(args) {
      let dataObject = new Date(args[0] * 1000).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      if (args[1] == "Daytime") {
        dataObject = dataObject.split(/[\s:]+/).slice(0, 2);
        return `${dataObject[0]}h ${dataObject[1]}m `;
      } else return dataObject;
    },
  },
};
</script>
