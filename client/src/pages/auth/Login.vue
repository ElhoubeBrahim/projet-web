<script>
import InputField from '../../components/InputField.vue';
import { login, storeUser } from "../../services/auth";

export default {
	components: { InputField },
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
            class="text-red-500 font-titles font"
            v-if="error"
          >
            Invalid credentials
          </div>
          <div class="mb-4"></div>
          <InputField
            type="email"
            placeholder="example@example.com"
            icon="envelope"
            v-model="user.email"
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            v-model="user.password"
          />
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
