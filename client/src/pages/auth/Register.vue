<script>
import InputField from "../../components/InputField.vue";
import { createUser } from "../../services/auth";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        profession: "",
      },
      error: false,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = false;
      const response = await createUser(this.user);
      if (response.status == "error") {
        this.error = true;
        this.loading = false;
        return;
      }
      this.$router.push("/login");
    },
  },
  components: { InputField },
};
</script>

<template>
  <div class="register">
    <div class="grid lg:grid-cols-2">
      <img
        src="/login-bg.png"
        alt=""
        class="w-full h-full object-cover hidden lg:block"
      />
      <div class="container mx-auto px-4 py-20">
        <div class="lg:w-[50%] mx-auto">
          <h2 class="text-3xl font-brand font-semibold mb-4">Create Account</h2>
          <div
            class="bg-red-500 text-white font-titles font px-4 py-2"
            v-if="error"
          >
            Please enter valid data
          </div>
          <div class="mb-8"></div>
          <InputField
            type="text"
            placeholder="Username"
            icon="user"
            v-model="user.username"
          />
          <InputField
            type="email"
            placeholder="example@example.com"
            icon="envelope"
            v-model="user.email"
          />
          <InputField
            type="text"
            placeholder="Profession"
            icon="briefcase"
            v-model="user.profession"
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            v-model="user.password"
            class="mb-4"
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
            <span v-else>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
