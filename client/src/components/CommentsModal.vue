<script>
import { createComment } from "../services/comments";
import CommentCard from "./CommentCard.vue";

export default {
  name: "CommentsModal",
  props: ["article", "comments", "open", "close"],
  data() {
    return {
      comment: {
        name: "",
        email: "",
        content: "",
      },
    };
  },
  methods: {
    async postComment() {
      const newComment = await createComment(this.article.id, this.comment);
      this.$emit("commentCreated", newComment);
    },
  },
  components: { CommentCard },
};
</script>

<template>
  <div
    class="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-[#00000080] overflow-auto"
    @click.self="close()"
    v-if="open"
  >
    <div class="bg-white mx-4 my-10 lg:mx-auto lg:w-[80%]">
      <div class="bg-primary-light border-b border-b-secondary p-8 px-20">
        <h3 class="text-xl mb-8">Add comment</h3>
        <div class="grid lg:grid-cols-2 gap-4 mb-4">
          <div class="relative">
            <input
              type="text"
              placeholder="username"
              v-model="comment.name"
              class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
            />
            <font-awesome-icon
              icon="user"
              class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
            />
          </div>
          <div class="relative">
            <input
              type="email"
              placeholder="example@example.com"
              v-model="comment.email"
              class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
            />
            <font-awesome-icon
              icon="envelope"
              class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
            />
          </div>
        </div>
        <div class="relative mb-4">
          <textarea
            placeholder="comment"
            v-model="comment.content"
            class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary h-[300px]"
          ></textarea>
          <font-awesome-icon
            icon="comment"
            class="absolute top-3 left-4 transform text-secondary"
          />
        </div>
        <button class="bg-secondary px-4 py-2 text-white" @click="postComment">
          Post Comment
        </button>
      </div>
      <div class="py-10 px-20">
        <h3 class="text-xl mb-8">Comments ({{ article._count.comments }})</h3>
        <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>
