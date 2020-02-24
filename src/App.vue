<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png" />-->
    <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    <!--<a-button type="primary">Primary</a-button>-->

    <layout></layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Layout from '@/views/layout/layout.vue';

@Component({
  components: {
    Layout,
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './assets/style/app.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
