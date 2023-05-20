<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showFooter: true,
    };
  },
  watch: {
    $route(to, from) {
      this.showFooter = to.meta.showFooter;
    },
  },
};
</script>

<template>
  <div>
    <Header :key="$route.fullPath" />
    <router-view :key="$route.fullPath" />
    <Footer v-if="showFooter" />
  </div>
</template>
