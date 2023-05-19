<script>
import { getFeaturedAuthors } from "../../services/users";
import AuthorCard from "../AuthorCard.vue";

export default {
  name: "FeaturedAuthorsSection",
  data: () => ({
    authors: [],
  }),
  mounted: async function () {
    this.authors = await getFeaturedAuthors();
  },
  components: { AuthorCard },
};
</script>

<template>
  <div class="border-y border-y-secondary bg-primary-light">
    <div class="container mx-auto px-4 py-20">
      <h2 class="font-brand font-semibold text-2xl text-secondary mb-8">
        Featured Authors
      </h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <AuthorCard
          v-for="author in authors"
          :key="author.id"
          :author="author"
        />
      </div>
    </div>
  </div>
</template>
