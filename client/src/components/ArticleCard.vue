<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default {
  name: "ArticleCard",
  props: ["article"],
  methods: {
    formatDistanceToNow,
  },
};
</script>

<template>
  <article class="flex gap-4">
    <img :src="article.image" alt="" class="h-[200px] w-[200px] object-cover" />
    <div class="col-span-2 flex flex-col">
      <h3 class="font-semibold text-lg">{{ article.title }}</h3>
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
      <div class="flex gap-2 items-center">
        <img
          :src="article.author.avatar"
          alt=""
          class="h-[30px] w-[30px] border rounded-full object-cover"
        />
        <span class="text-sm">{{ article.author.username }}</span>
      </div>
    </div>
  </article>
</template>
