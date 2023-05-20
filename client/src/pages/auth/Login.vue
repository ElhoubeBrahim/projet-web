<script>
import { login, storeUser } from "../../services/auth";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error: false,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = false;

      const response = await login(this.user);
      if (response.status == "error") {
        this.error = true;
        this.loading = false;
        return;
      }

      const user = response.data.user;
      const token = response.data.token;

      storeUser(user, token);
      this.$router.push(`/profile/${user.id}`);
    },
  },
};
</script>

<template>
  <div class="login">
    <div class="grid lg:grid-cols-2">
      <div class="container mx-auto px-4 py-20">
        <div class="lg:w-[50%] mx-auto">
          <h2 class="text-3xl font-brand font-semibold mb-4">Sign In</h2>
          <div
            class="bg-red-500 text-white font-titles font px-4 py-2"
            v-if="error"
          >
            Invalid credentials
          </div>
          <div class="mb-8"></div>
          <div class="relative mb-4">
            <input
              type="email"
              placeholder="example@example.com"
              v-model="user.email"
              class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
            />
            <font-awesome-icon
              icon="envelope"
              class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
            />
          </div>
          <div class="relative mb-8">
            <input
              type="password"
              placeholder="Password"
              v-model="user.password"
              class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
            />
            <font-awesome-icon
              icon="lock"
              class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
            />
          </div>
          <button
            class="bg-secondary px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            @click="login"
            :disabled="loading"
          >
            <font-awesome-icon
              icon="spinner"
              v-if="loading"
              class="animate-spin"
            />
            <span v-else>Sign In</span>
          </button>
        </div>
      </div>
      <img
        src="/login-bg.png"
        alt=""
        class="w-full h-full object-cover hidden lg:block"
      />
    </div>
  </div>
</template>
