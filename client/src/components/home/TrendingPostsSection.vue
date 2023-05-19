<script>
import { getTrendingArticles } from "../../services/articles";
import ArticleCard from "../ArticleCard.vue";

export default {
  components: { ArticleCard },
  name: "TrendingPostsSection",
  data: () => ({
    articles: [],
  }),
  mounted: async function () {
    this.articles = await getTrendingArticles();
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-20">
    <h2 class="font-brand font-semibold text-2xl text-secondary mb-8">
      Trending Posts
    </h2>
    <div class="grid gap-4 lg:grid-cols-2 mb-10">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <div class="flex items-center lg:justify-center">
      <router-link
        to="/explore"
        class="flex items-center justify-center px-8 py-2 bg-primary font-medium"
      >
        Explore More Posts
      </router-link>
    </div>
  </div>
</template>
