<script>
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default {
  name: "CommentCard",
  props: ["comment"],
  methods: {
    formatDistanceToNow,
  },
};
</script>

<template>
  <div class="p-4 py-8 border-t">
    <div class="flex gap-2 items-center mb-4">
      <img
        src="/avatar.png"
        alt=""
        class="h-[40px] w-[40px] border rounded-full object-cover"
      />
      <span class="text-sm">{{ comment.name }}</span>
    </div>
    <div class="text-sm">{{ comment.content }}</div>
  </div>
</template>
