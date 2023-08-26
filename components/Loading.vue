<template>
  <div
    :class="isLoading ? 'opacity-100' : 'opacity-0'"
    class="loading-container flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black duration-100 ease-out">
    <!--    <h1 class="loading-text text-white text-8xl">.-.. -&#45;&#45; .- -.. .. -. &#45;&#45;.</h1>-->
    <div
      :style="{left:`${loadingProgressRatio * 100}%`}"
      class="loading-bar fixed w-screen bottom-0 right-0 bg-orange-300 h-1 duration-200" />
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'LoadingComponent',
  computed: {
    ...mapState(['loadingProgressRatio', 'isLoading'])
  },
}
</script>

<style scoped>
.loading-container {

}
</style>
