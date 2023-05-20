<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UserAvatar from './UserAvatar.vue';

export default {
	components: { UserAvatar },
  name: "ArticleCard",
  props: ["article", "thumbnail"],
  methods: {
    formatDistanceToNow,
  },
};
</script>

<template>
  <article class="flex gap-4">
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
