<script>
import { createComment } from "../services/comments";
import CommentCard from "./CommentCard.vue";
import InputField from "./InputField.vue";

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
      errors: {},
      loading: false,
    };
  },
  methods: {
    async postComment() {
      this.errors = {};
      this.loading = true;

      try {
        const newComment = await createComment(this.article.id, this.comment);
        this.$emit("commentCreated", newComment);
        this.$toast.success("Comment posted successfully");
        this.reset();
      } catch (error) {
        for (const key in error.response.data.errors) {
          this.errors[key] = error.response.data.errors[key][0];
        }
        this.$toast.error("Something went wrong");
      }

      this.loading = false;
    },
    reset() {
      this.comment = {
        name: "",
        email: "",
        content: "",
      };
      this.errors = {};
    }
  },
  components: { CommentCard, InputField },
};
</script>

<template>
  <div
    class="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-[#00000080] overflow-auto"
    @click.self="
      () => {
        reset();
        close();
      }
    "
    v-if="open"
  >
    <div class="bg-white mx-4 my-10 lg:mx-auto lg:w-[80%]">
      <div class="bg-primary-light border-b border-b-secondary p-8 px-20">
        <h3 class="text-xl mb-8">Add comment</h3>
        <div class="grid lg:grid-cols-2 gap-4">
          <InputField
            type="text"
            placeholder="username"
            icon="user"
            v-model="comment.name"
            :error="errors.name"
          />
          <InputField
            type="email"
            placeholder="example@example.com"
            icon="envelope"
            v-model="comment.email"
            :error="errors.email"
          />
        </div>
        <div class="mb-4">
          <div class="relative">
            <textarea
              placeholder="comment"
              v-model="comment.content"
              class="px-4 py-2 bg-primary outline-none pl-10 text-secondary w-full placeholder:text-secondary h-[300px]"
              :class="{ 'border border-red-500': errors.content }"
            ></textarea>
            <font-awesome-icon
              icon="comment"
              class="absolute top-3 left-4 transform text-secondary"
            />
          </div>
          <div class="text-red-500 text-xs mt-1" v-if="errors.content">
            {{ errors.content }}
          </div>
        </div>
        <button
          class="bg-secondary px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          @click="postComment"
          :disabled="loading"
        >
          <font-awesome-icon
            icon="spinner"
            v-if="loading"
            class="animate-spin"
          />
          <span v-else>Post comment</span>
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
