<script>
export default {
  name: "WhyContentCreationSection",
  data: () => ({
    reasons: [
      {
        image: "/why/why-1.svg",
        title: "Express Your Creativity",
      },
      {
        image: "/why/why-2.svg",
        title: "Share Knowledge and Expertise",
      },
      {
        image: "/why/why-3.svg",
        title: "Build Your Personal Brand",
      },
      {
        image: "/why/why-4.svg",
        title: "Connect with The Community",
      },
    ],
  }),
};
</script>

<template>
  <div
    class="border border-y-secondary"
    style="
      background-image: url('/bg.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    "
  >
    <div class="container mx-auto px-4 py-20">
      <h2
        class="font-brand font-semibold text-2xl text-center text-secondary mb-8"
      >
        Why Content Creation ?
      </h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <div
          v-for="reason in reasons"
          :key="reason.title"
          class="flex flex-col items-center gap-4 p-4 border-b-8 border-b-secondary lg:w-[80%] mx-auto"
        >
          <img :src="reason.image" alt="" class="h-[150px] w-auto" />
          <h3 class="text-lg text-center">
            {{ reason.title }}
          </h3>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <router-link
          to="/register"
          class="flex items-center justify-center px-8 py-2 bg-secondary text-white font-medium"
        >
          Start Writing
        </router-link>
      </div>
    </div>
  </div>
</template>
