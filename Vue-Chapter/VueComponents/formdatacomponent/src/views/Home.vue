<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <form-data />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { FormData } from "@/components";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    FormData,
  },
};
</script>
