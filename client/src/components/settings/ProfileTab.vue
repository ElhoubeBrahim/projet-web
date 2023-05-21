<script>
import { getLoggedinUser, updateLoggedinUser } from "../../services/auth";
import { updateAvatar, updateUser } from '../../services/users';

export default {
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
      const user = await updateUser({
        username: this.user.username,
        profession: this.user.profession,
      });
      this.loading = false;

      updateLoggedinUser(user);
      this.$router.push(`/profile/${user.id}`);
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
      <div class="relative mb-4">
        <input
          type="text"
          placeholder="Username"
          v-model="user.username"
          class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
        />
        <font-awesome-icon
          icon="envelope"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
        />
      </div>
      <div class="relative mb-4">
        <input
          type="text"
          placeholder="Profession"
          v-model="user.profession"
          class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
        />
        <font-awesome-icon
          icon="envelope"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 text-secondary"
        />
      </div>
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
