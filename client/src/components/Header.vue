<script>
export default {
  name: "Header",
  data: () => ({
    navLinks: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Programming",
        path: "/",
      },
      {
        name: "Data Science",
        path: "/",
      },
      {
        name: "Beauty",
        path: "/",
      },
      {
        name: "Productivity",
        path: "/",
      },
      {
        name: "Machine Learning",
        path: "/",
      },
      {
        name: "Politics",
        path: "/",
      },
      {
        name: "Leadership",
        path: "/",
      },
      {
        name: "Marketing",
        path: "/",
      },
      {
        name: "UX Design",
        path: "/",
      },
      {
        name: "Business",
        path: "/",
      },
    ],
    dropdownOpen: false,
  }),
};
</script>

<template>
  <header>
    <div
      class="container relative mx-auto py-4 px-4 flex justify-between items-center"
    >
      <router-link to="/">
        <img src="/logo.svg" alt="QuillQuest" class="h-[50px]" />
      </router-link>
      <div
        :class="{
          'flex flex-col absolute md:relative top-[100%] bg-white md:border-0 md:p-0 p-4 border right-0 md:flex-row md:items-center gap-4': true,
          'hidden md:flex': !dropdownOpen,
        }"
      >
        <div class="search relative">
          <input
            type="text"
            placeholder="Search"
            class="px-4 py-2 pl-6 outline-none"
          />
          <font-awesome-icon
            icon="search"
            class="absolute left-0 top-3 text-secondary"
          />
        </div>
        <div class="flex items-center gap-4">
          <router-link
            to="/login"
            class="text-secondary font-semibold hover:underline"
          >
            Signin
          </router-link>
          <router-link
            to="/register"
            class="flex items-center justify-center px-4 py-2 bg-primary text-secondary font-semibold hover:bg-secondary hover:text-primary transition"
          >
            Create Account
          </router-link>
        </div>
      </div>
      <font-awesome-icon
        icon="bars"
        class="text-secondary text-2xl cursor-pointer md:hidden"
        @click="dropdownOpen = !dropdownOpen"
      />
    </div>
    <div class="border-y border-y-secondary">
      <div class="container mx-auto px-4">
        <nav>
          <ul class="flex items-center flex-wrap">
            <li v-for="link in navLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="block p-2 font-semibold whitespace-nowrap text-text hover:text-secondary"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
