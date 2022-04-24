<template>
  <div class="home">
    {{$store.state.counter}}
    <p @click="$store.commit('add')">counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter: {{$store.state.counter}}</p>
    <div class="">
      vuexStore: {{$store.getters.doubleCounter}}
    </div>

    <img alt="Vue logo"
         src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created() {
    console.log(this.$store.getters);
  },
};
</script>
