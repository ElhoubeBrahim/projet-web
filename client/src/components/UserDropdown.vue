<script>
import { getLoggedinUser } from "../services/auth";

export default {
  name: "UserDropdown",
  data: () => ({
    dropdownOpen: false,
    user: getLoggedinUser(),
  }),
  methods: {
    logout() {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center gap-2 cursor-pointer"
      @click="dropdownOpen = !dropdownOpen"
    >
      <img
        :src="user.avatar"
        alt=""
        class="h-[40px] w-[40px] border object-cover"
      />
      <span>{{ user.username }}</span>
    </div>
    <div
      id="dropdown"
      class="absolute left-0 mt-2 py-2 w-48 bg-white border shadow-xl z-10"
      v-if="dropdownOpen"
    >
      <ul>
        <li>
          <router-link
            :to="`/profile/${user.id}`"
            class="block px-4 py-2 hover:bg-primary-light"
          >
            Profile
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings"
            class="block px-4 py-2 hover:bg-primary-light"
          >
            Settings
          </router-link>
        </li>
        <li
          class="block px-4 py-2 hover:bg-red-100 cursor-pointer"
          @click="logout"
        >
          Logout
        </li>
      </ul>
    </div>
  </div>
</template>
