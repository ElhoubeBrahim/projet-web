<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UserAvatar from "./UserAvatar.vue";
import { getLoggedinUser } from "../services/auth";
import { deleteArticle } from "../services/articles";

export default {
  components: { UserAvatar },
  name: "ArticleCard",
  props: ["article", "thumbnail"],
  data() {
    return {
      menuOpen: false,
      loggedinUser: getLoggedinUser(),
    };
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".article-menu")) {
        this.menuOpen = false;
      }
    });
  },
  methods: {
    formatDistanceToNow,
    async deleteArticle() {
      this.menuOpen = false;
      if (confirm("Are you sure you want to delete this article?")) {
        await deleteArticle(this.article.id);
        this.$emit("article-deleted", this.article.id);
        this.$router.push("/explore");
      }
    },
  },
};
</script>

<template>
  <article class="flex gap-4 relative">
    <div
      class="flex absolute top-2 right-2 article-menu"
      v-if="loggedinUser && loggedinUser.id == article.author.id"
    >
      <div
        class="h-[40px] w-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
        @click="menuOpen = true"
      >
        <font-awesome-icon icon="ellipsis-v" />
      </div>
      <div
        class="absolute right-0 mt-2 py-2 w-48 bg-white border shadow-xl"
        :class="{
          hidden: !menuOpen,
        }"
      >
        <ul>
          <li>
            <router-link
              :to="`/articles/${article.id}/edit`"
              class="block px-4 py-2 hover:bg-primary-light"
            >
              Edit
            </router-link>
          </li>
          <li
            class="block px-4 py-2 hover:bg-red-100 cursor-pointer"
            @click="deleteArticle"
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
    <img
      :src="article.image"
      alt=""
      :class="{
        'object-cover shrink-0': true,
        'h-[200px] w-[200px]': thumbnail !== 'large',
        'h-[250px] w-[400px]': thumbnail === 'large',
      }"
    />
    <div class="col-span-2 flex flex-col">
      <router-link :to="`/read/${article.id}`">
        <h3 class="font-semibold text-lg">{{ article.title }}</h3>
      </router-link>
      <div class="flex items-center gap-2 text-placeholder mb-4">
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
      <UserAvatar :user="article.author" />
    </div>
  </article>
</template>
