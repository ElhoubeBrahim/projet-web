<script>
import ArticleCard from "../components/ArticleCard.vue";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton.vue";
import { getArticles } from "../services/articles";
import { getAuthor } from "../services/users";

export default {
  name: "Profile",
  data() {
    return {
      author: {},
      articles: [],
      page: 1,
      loading: false,
      finished: false,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.author = await getAuthor(id);
    this.articles = await getArticles({
      per_page: 10,
      page: 1,
      authors: [id],
    });
    // Infinite Scroll
    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !this.finished) {
        this.loadMore();
      }
    });
  },
  methods: {
    async loadMore() {
      this.loading = true;
      this.page++;
      const articles = await getArticles({
        page: this.page,
        limit: 10,
        authors: [this.$route.params.id],
      });
      if (articles.length === 0) {
        this.finished = true;
      }
      this.articles = [...this.articles, ...articles];
      this.loading = false;
    },
  },
  components: { ArticleCardSkeleton, ArticleCard },
};
</script>

<template>
  <div class="profile py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-20">
        <div class="h-[400px] w-[400] shrink-0 sticky top-10">
          <div class="relative">
            <img
              :src="author.avatar"
              alt=""
              class="h-[400px] w-[400] object-cover border"
            />
            <div
              class="absolute top-2 left-2 bg-primary w-[400px] h-[400px] z-[-1]"
            ></div>
            <div
              class="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black"
            ></div>
            <div class="absolute bottom-4 left-4 text-white">
              <div class="text-lg">{{ author.username }}</div>
              <div class="text-xs">{{ author.profession }}</div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl mb-8 font-bold">
            Posted by {{ author.username }}
          </h3>
          <div v-if="articles.length">
            <ArticleCard
              v-for="article in articles"
              :key="article.id"
              :article="article"
              thumbnail="large"
              class="mb-8"
            />
            <ArticleCardSkeleton v-if="loading" />
          </div>
          <div v-else>
            <div class="text-3xl py-10 text-[#bbb] font-bold">
              No articles found
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>