<!-- 

Метод: 
the_local_time -сторонняя бибилиотека Luxon позволяет точно определить местное время учитывая все часовые пояса.

-->

<template>
  <div class="text-color text-start text-sm  p-4 pl-6 font-normal">
    <span>
      {{ local_time.full_time }}
    </span>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LocalTime",
  computed: {
    ...mapGetters({
      local_time: "local_time",
    }),
  },
};
</script>


<style scoped>
.text-color{
  color: rgba(153, 153, 153, 1);
}
</style>