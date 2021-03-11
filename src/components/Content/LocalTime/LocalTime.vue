<!-- 

Метод: 
the_local_time -сторонняя бибилиотека Luxon позволяет точно определить местное время учитывая все часовые пояса.

-->

<template>
  <div class="textColor text-start text-sm  p-4 pl-6 font-normal">
    <span>
      {{ localTime.full_time }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LocalTime",
  computed: {
    ...mapGetters({
      localTime: "GET_LOCAL_TIME",
    }),
  },
};
</script>


<style scoped>
.textColor{
  color: rgba(153, 153, 153, 1);
}
</style>