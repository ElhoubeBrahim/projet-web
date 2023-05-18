<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>
