<script>
import format from "date-fns/format";

export default {
  name: "AuthorCard",
  props: ["author"],
  computed: {
    formattedCreatedAt: function () {
      return format(new Date(this.author.createdAt), "MMMM yyyy");
    },
  },
};
</script>

<template>
  <article class="flex gap-4">
    <img
      :src="author.avatar"
      alt=""
      class="h-[100px] w-[100px] object-cover border"
    />
    <div>
      <h3 class="font-semibold text-lg">{{ author.username }}</h3>
      <div class="flex items-center gap-2 text-placeholder mb-4 text-xs">
        <span> Joined {{ formattedCreatedAt }} </span>
        <span class="bg-placeholder h-[5px] w-[5px] block rounded"></span>
        <span>
          {{ author._count.articles }}
          {{ author._count.articles > 1 ? "articles" : "article" }}
        </span>
      </div>
    </div>
  </article>
</template>
