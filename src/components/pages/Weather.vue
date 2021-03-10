<template>
  <div class="relative">
    <div>
      <ThemeNight class="col-span-3 " v-if="localTime.time_of_day === 'AM'" />
      <ThemeDay class="col-span-3" v-else />
    </div>
    <div class="grid grid-cols-6  shadow-2xl pos">
      <LocalTime class="col-span-3 " />
      <Search class="col-span-3 " />
      <MainInfo class="col-span-6" />
      <DetailedInfo class="col-span-6">
        <CellInfo />
      </DetailedInfo>
      <ScrollDaily class="col-span-6">
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
  },
};
</script>
<style>
.pos {
  position: absolute;
  background-color: white;
  border-radius: 25px;
  top: 279px;
}
/*
@media (max-width: 640px) and (min-width: 320px) {
  .pos {
    top: 300px;
  }
}
@media (max-width: 1024px) and (min-width: 640px) {
  .pos {
    top: 520px;
  }
}
@media (max-width: 1960px) and (min-width: 1024px) {
  .pos {
    top: 520px;
  }
}*/
</style>
