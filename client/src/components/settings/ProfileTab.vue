<script>
import { getLoggedinUser, updateLoggedinUser } from "../../services/auth";
import { updateAvatar, updateUser } from "../../services/users";
import InputField from "../InputField.vue";

export default {
  components: { InputField },
  name: "ProfileTab",
  data() {
    return {
      user: {},
      avatar: null,
      errors: {},
      loading: false,
    };
  },
  mounted() {
    this.user = getLoggedinUser();
  },
  methods: {
    async updateInfo() {
      this.errors = {};
      this.loading = true;
      try {
        const user = await updateUser({
          username: this.user.username,
          profession: this.user.profession,
        });

        updateLoggedinUser(user);
        this.$toast.success("Profile updated successfully");
        this.$router.push(`/profile/${user.id}`);
      } catch (error) {
        for (const key in error.response.data.errors) {
          this.errors[key] = error.response.data.errors[key][0];
        }
        this.$toast.error("Something went wrong");
      }

      this.loading = false;
    },
    async uploadAvatar() {
      let avatarData = new FormData();
      avatarData.append("avatar", this.avatar);
      const user = await updateAvatar(avatarData);
      updateLoggedinUser(user);
    },
    previewAvatar(event) {
      // Store file
      this.avatar = event.target.files[0];
      // Preview it
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.user.avatar = e.target.result;
      };
      reader.readAsDataURL(this.avatar);
    },
  },
};
</script>

<template>
  <div class="profile-tab">
    <div class="mb-10 flex flex-col gap-4 justify-center items-center">
      <img
        :src="user.avatar"
        alt=""
        class="h-32 w-32 rounded-full object-cover border shadow"
      />
      <div>
        <label
          for="avatar"
          class="bg-primary px-10 py-2 rounded-full cursor-pointer"
        >
          Change Avatar
        </label>
        <input id="avatar" type="file" hidden @change="previewAvatar" />
      </div>
    </div>
    <div class="lg:w-1/2 mx-auto">
      <InputField
        type="text"
        placeholder="Username"
        icon="user"
        v-model="user.username"
        :error="errors.username"
      />
      <InputField
        type="text"
        placeholder="Profession"
        icon="briefcase"
        v-model="user.profession"
        :error="errors.profession"
      />
      <div class="mt-4">
        <button
          :class="{
            'bg-secondary py-2 px-5 text-white': true,
            'opacity-50 cursor-not-allowed': loading,
          }"
          @click="
            () => {
              this.avatar && this.uploadAvatar();
              this.updateInfo();
            }
          "
        >
          {{ loading ? "saving ..." : "Update data" }}
        </button>
      </div>
    </div>
  </div>
</template>
