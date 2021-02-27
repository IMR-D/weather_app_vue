<!-- 

Метод: 
nowDate - возвращает значение говорящее нам о том какое время суток в данный момент.
-->

<template>
  <div class="relative">
    <div>
      <ThemeNight class="col-span-3 " v-if="nowDate() >= 18" />
      <ThemeDay class="col-span-3" v-else />
    </div>
    <div class="grid grid-cols-3 gap-4 shadow-2xl pos">
      <LocalTime class="col-span-1 " />
      <Search class="col-span-2 " />
      <MainInfo class="col-span-3" />
      <DetailedInfo class="col-span-3">
        <CellInfo />
      </DetailedInfo>
      <ScrollDaily class="col-span-3">
        <CellDaily />
      </ScrollDaily>
    </div>
  </div>
</template>

<script>
import Search from "./Search/Search";
import LocalTime from "./LocalTime/LocalTime";
import MainInfo from "./MainInfoSelCity/MainInfo";
import DetailedInfo from "./DetailedInfo/DetailedInfo";
import CellInfo from "./DetailedInfo/CellInfo";
import ScrollDaily from "./ScrollDaily/ScrollDaily";
import CellDaily from "./ScrollDaily/CellDaily";
import ThemeDay from "@/components/Backgrounds/ThemeDay";
import ThemeNight from "@/components/Backgrounds/ThemeNight";
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
  methods: {
    nowDate() {
      return new Date().toLocaleTimeString().slice(0, -6);
    },
  },
};
</script>

<style>
.pos {
  position: absolute;
  background-color: white;
  border-radius: 25px;
  top: 320px;
}

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
}
</style>
