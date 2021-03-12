<template>
  <div class="flex flex-col">
    <div class="bg-cover bg-center">
      <ThemeNight v-if="localDayTime === timeOfDay.NIGHT"/>
      <ThemeDay v-else/>
    </div>
    <div class="w-screen flex-col my-shadow myPosition  bg-white rounded-t-3xl fixed bottom-0 ">
      <div class="flex">
        <LocalTime/>
        <Search/>
      </div>
      <MainInfo/>
      <DetailedInfo>
        <CellInfo/>
      </DetailedInfo>
      <ScrollDaily>
        <CellDaily/>
      </ScrollDaily>
    </div>
  </div>
</template>

<script>
import Search from "../components/Content/Search/Search";
import LocalTime from "../components/Content/LocalTime/LocalTime";
import MainInfo from "../components/Content/MainInfoSelCity/MainInfo";
import CellInfo from "../components/Content/DetailedInfo/CellInfo";
import ScrollDaily from "../components/Content/ScrollDaily/ScrollDaily";
import CellDaily from "../components/Content/ScrollDaily/CellDaily";
import ThemeDay from "../components/Backgrounds/ThemeDay";
import ThemeNight from "../components/Backgrounds/ThemeNight";
import {mapGetters} from "vuex";
import timeOfDay from "@/enums/timeOfDay";
import DetailedInfo from "@/components/Content/DetailedInfo/DetailedInfo";

export default {
  components: {
    DetailedInfo,
    Search,
    LocalTime,
    MainInfo,
    CellInfo,
    ScrollDaily,
    CellDaily,
    ThemeDay,
    ThemeNight,
  },
  computed: {
    ...mapGetters({
      localTime: "local_time",
    }),
    timeOfDay() {
      return timeOfDay
    },
    localDayTime() {
      if (this.localTime.time_of_day === "AM") {
        return this.localTime.hour < 5 || this.localTime.hour === '12' ? timeOfDay.NIGHT : timeOfDay.DAY;
      } else {
        return this.localTime.hour < 5 || this.localTime.hour === '12' ? timeOfDay.DAY : timeOfDay.NIGHT;
      }
    }
  },
};
</script>
<style>
.my-shadow {
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.2);
}

</style>
