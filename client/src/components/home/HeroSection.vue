<script>
export default {
  name: "HeroSection",
};
</script>

<template>
  <div class="container mx-auto px-4 py-20">
    <div class="grid gap-4 md:grid-cols-2">
      <div
        class="flex flex-col justify-center gap-8 text-center md:text-start items-center md:items-start"
      >
        <h1 class="text-5xl font-bold font-brand text-secondary">
          WELCOME TO QUILL QUEST
        </h1>
        <p class="font-medium">
          A vibrant community where writers, bloggers, and content creators come
          together to express their passions, inspire others, and make their
          voices heard.
        </p>
        <div class="flex items-center gap-4">
          <router-link
            to="/register"
            class="flex items-center justify-center px-8 py-2 bg-secondary text-primary font-medium"
          >
            Start Writing
          </router-link>
          <router-link
            to="/login"
            class="text-secondary font-medium hover:underline"
          >
            Sign in
          </router-link>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <img src="/hero.png" alt="" class="w-full h-auto" />
      </div>
    </div>
  </div>
</template>
