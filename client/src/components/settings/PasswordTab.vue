<script>
import { getLoggedinUser } from "../../services/auth";
import { updatePassword } from "../../services/users";
import InputField from '../InputField.vue';

export default {
	components: { InputField },
  name: "PasswordTab",
  data() {
    return {
      user: {
        oldPassword: "",
        password: "",
      },
      loggedinUser: {},
      error: null,
      loading: false,
    };
  },
  mounted() {
    this.loggedinUser = getLoggedinUser();
  },
  methods: {
    async changePassword() {
      this.loading = true;
      this.error = null;

      try {
        await updatePassword(this.user);

        this.user = {
          oldPassword: "",
          password: "",
        };
        this.$router.push(`/profile/${this.loggedinUser.id}`);
      } catch (error) {
        this.error = error.response.data.message;
      }

      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="password-tab">
    <div class="lg:w-1/2 mx-auto">
      <div
        class="bg-red-500 text-white font-titles font px-4 py-2 mb-8"
        v-if="error"
      >
        {{ error}}
      </div>
      <InputField
        type="password"
        placeholder="Old Password"
        icon="lock"
        v-model="user.oldPassword"
      />
      <InputField
        type="password"
        placeholder="New Password"
        icon="lock"
        v-model="user.password"
      />
      <div class="mt-4">
        <button
          :class="{
            'bg-secondary py-2 px-5 text-white': true,
            'opacity-50 cursor-not-allowed': loading,
          }"
          @click="
            () => {
              this.changePassword();
            }
          "
        >
          {{ loading ? "saving ..." : "Change password" }}
        </button>
      </div>
    </div>
  </div>
</template>
