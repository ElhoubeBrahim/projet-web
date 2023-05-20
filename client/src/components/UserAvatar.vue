<script>
export default {
  name: "UserAvatar",
  props: ["user"],
};
</script>

<template>
  <router-link
    :to="`/profile/${user.id}`"
    class="flex gap-2 items-center mb-2"
  >
    <img
      :src="user.avatar"
      alt=""
      class="h-[30px] w-[30px] border rounded-full object-cover"
    />
    <span>{{ user.username }}</span>
  </router-link>
</template>
