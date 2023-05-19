<script>
import FeaturedAuthorsSection from '../components/home/FeaturedAuthorsSection.vue';
import HeroSection from "../components/home/HeroSection.vue";
import TrendingPostsSection from '../components/home/TrendingPostsSection.vue';
import WhyConetentCreationSection from "../components/home/WhyContentCreationSection.vue";

export default {
  name: "Home",
  components: { HeroSection, WhyConetentCreationSection, TrendingPostsSection, FeaturedAuthorsSection },
};
</script>

<template>
  <div class="home">
    <HeroSection />
    <WhyConetentCreationSection />
    <TrendingPostsSection />
    <FeaturedAuthorsSection />
  </div>
</template>
