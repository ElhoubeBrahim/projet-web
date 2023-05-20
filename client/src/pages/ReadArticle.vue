<script>
import { getArticle, getArticles, getRelatedArticles } from "../services/articles";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ArticleCard from "../components/ArticleCard.vue";
import CommentsModal from "../components/CommentsModal.vue";
import { getComments } from "../services/comments";
import UserAvatar from '../components/UserAvatar.vue';

export default {
  name: "Explore",
  data() {
    return {
      loading: true,
      article: {},
      comments: [],
      relatedArticles: [],
      commentsModalOpen: false,
    };
  },
  async mounted() {
    this.article = await getArticle(this.$route.params.id);
    this.comments = await getComments(this.$route.params.id);
    this.relatedArticles = await getRelatedArticles(this.article, 4);
    this.loading = false;
  },
  methods: {
    formatDistanceToNow,
  },
  components: { ArticleCard, CommentsModal, UserAvatar },
};
</script>

<template>
  <div class="read-article pt-20" v-if="!loading">
    <div class="container mx-auto px-4">
      <div class="md:px-20">
        <h2 class="text-center text-3xl font-brand text-secondary mb-8">
          {{ article.title }}
        </h2>
        <img
          :src="article.image"
          alt=""
          class="w-full h-[600px] object-cover mb-8"
        />
        <div class="mb-8">
          <UserAvatar :user="article.author" />
          <div class="flex items-center gap-2 text-placeholder mb-4 text-sm">
            <span>
              {{
                formatDistanceToNow(new Date(article.createdAt), {
                  addSuffix: true,
                })
              }}
            </span>
            <span class="bg-placeholder h-[5px] w-[5px] block rounded"></span>
            <span>{{ article._count.comments }} comments</span>
          </div>
        </div>
        <div class="article-content">
          <div v-html="article.content"></div>
        </div>
        <hr class="border-t border-t-primary mb-4 mt-10" />
        <div class="flex justify-between mb-10">
          <div
            class="flex gap-4 items-center bg-primary px-4 py-2 cursor-pointer"
            @click="commentsModalOpen = true"
          >
            <font-awesome-icon icon="comment" class="text-secondary" />
            <span class="text-secondary">
              Comments ({{ article._count.comments }})
            </span>
          </div>
          <div class="flex gap-4 items-center">
            <span>Share on: </span>
            <div class="flex gap-4 items-center">
              <font-awesome-icon
                :icon="['fab', 'facebook']"
                class="text-secondary cursor-pointer"
              />
              <font-awesome-icon
                :icon="['fab', 'whatsapp']"
                class="text-secondary cursor-pointer"
              />
              <font-awesome-icon
                :icon="['fab', 'twitter']"
                class="text-secondary cursor-pointer"
              />
              <font-awesome-icon
                :icon="['fab', 'linkedin']"
                class="text-secondary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary-light border-y border-y-secondary py-20">
      <div class="container mx-auto px-4">
        <div class="md:px-20">
          <h3 class="font-brand font-semibold text-2xl text-secondary mb-8">
            Recommended for you
          </h3>
          <div class="grid gap-4 lg:grid-cols-2 mb-10">
            <ArticleCard
              v-for="article in relatedArticles"
              :key="article.id"
              :article="article"
              class="mb-8"
            />
          </div>
        </div>
      </div>
    </div>
    <CommentsModal
      :article="article"
      :comments="comments"
      :open="commentsModalOpen"
      :close="
        () => {
          commentsModalOpen = false;
        }
      "
      @commentCreated="comments.unshift($event)"
    />
  </div>
</template>
