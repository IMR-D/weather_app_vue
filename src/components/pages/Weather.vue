<template>
  <div class="flex flex-col">
    <div class="bg-cover bg-center" >
      <ThemeNight v-if="getLocalTime === 'night'" />
      <ThemeDay  v-else  />
    </div>
    <div class="w-screen flex-col myShadow myPosition  bg-white rounded-t-3xl fixed bottom-0 ">
      <div class="flex">
        <LocalTime />
        <Search />
      </div>
      <MainInfo  />
      <DetailedInfo >
        <CellInfo />
      </DetailedInfo>
      <ScrollDaily >
        <CellDaily />
      </ScrollDaily>
    </div>
  </div>
</template>

<script>
import Search from "../Content/Search/Search";
import LocalTime from "../Content/LocalTime/LocalTime";
import MainInfo from "../Content/MainInfoSelCity/MainInfo";
import DetailedInfo from "../Content/DetailedInfo/DetailedInfo";
import CellInfo from "../Content/DetailedInfo/CellInfo";
import ScrollDaily from "../Content/ScrollDaily/ScrollDaily";
import CellDaily from "../Content/ScrollDaily/CellDaily";
import ThemeDay from "../Backgrounds/ThemeDay";
import ThemeNight from "../Backgrounds/ThemeNight";
import { mapGetters } from "vuex";
export default {
  components: {
    Search,
    LocalTime,
    MainInfo,
    DetailedInfo,
    CellInfo,
    ScrollDaily,
    CellDaily,
    ThemeDay,
    ThemeNight,
  },
  computed: {
    ...mapGetters({
      localTime: "GET_LOCAL_TIME",
    }),
    getLocalTime(){
      if(this.localTime.time_of_day === "AM"){
       return this.localTime.hour < 4 || this.localTime.hour == 12? "night" : "day";
      }
      else {
        return this.localTime.hour < 4 || this.localTime.hour == 12? "day" : "night";
      }
    }
  },
};
</script>
<style>
.myShadow{
  box-shadow: 0px -16px 40px rgba(0, 0, 0, 0.2);
}

</style>
