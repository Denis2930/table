<template>
  <div class="app">
    <counter/>
  </div>
</template>

<script>
import Counter from '@/views/counter.vue'

export default {
    components: {
      Counter
    }
}
</script>

<style>
.app {
    margin: 25px auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: #000;
    background-color: #fff;
    width: 1370px;
    list-style: none;
}
</style>
