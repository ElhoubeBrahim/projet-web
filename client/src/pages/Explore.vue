<script>
import ArticleCard from "../components/ArticleCard.vue";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton.vue";
import { getArticles } from "../services/articles";
import { getCategories } from "../services/categories";

export default {
  name: "Explore",
  data() {
    return {
      articles: [],
      categories: [],
      page: 1,
      search: this.$route.query.search || null,
      searchInput: null,
      loading: false,
      finished: false,
      links: [
        "Help",
        "Status",
        "Writers",
        "Blog",
        "Careers",
        "Privacy",
        "Terms",
        "About",
      ],
    };
  },
  async mounted() {
    this.articles = await getArticles({
      page: this.page,
      limit: 10,
      search: this.search,
    });
    this.categories = await getCategories();

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
        search: this.search,
      });
      if (articles.length === 0) {
        this.finished = true;
      }

      this.articles = [...this.articles, ...articles];
      this.loading = false;
    },
  },
  components: { ArticleCard, ArticleCardSkeleton },
};
</script>

<template>
  <div class="explore py-20">
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-4 gap-4">
        <div class="col-span-3">
          <div
            class="text-2xl mb-8 pb-4 border-b border-b-secondary lg:w-[80%]"
            v-if="search"
          >
            Search results for:
            <span class="text-secondary font-semibold">{{ search }}</span>
          </div>

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
        <div class="col-span-1">
          <div class="sticky top-10">
            <div class="relative mb-8">
              <input
                type="text"
                placeholder="Search ..."
                v-model="searchInput"
                @keypress="
                  $event.key == 'Enter' &&
                    $router.push({
                      path: '/explore',
                      query: { search: searchInput },
                    })
                "
                class="px-4 py-2 bg-primary outline-none border-none pr-10 text-secondary w-full placeholder:text-secondary"
              />
              <font-awesome-icon
                icon="search"
                class="absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary"
              />
            </div>
            <div class="flex flex-wrap">
              <div
                v-for="category in categories"
                :key="category.id"
                class="bg-primary-light border border-secondary px-4 py-2 rounded-full text-secondary text-sm mr-2 mb-2 cursor-pointer hover:bg-primary transition"
              >
                {{ category.name }}
              </div>
            </div>
            <hr class="border-t border-t-primary my-4" />
            <div class="flex flex-wrap px-4">
              <div
                v-for="link in links"
                :key="link"
                class="text-sm text-placeholder mr-4 mb-2 cursor-pointer hover:underline"
              >
                {{ link }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
