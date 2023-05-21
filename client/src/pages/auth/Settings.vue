<script>
import PasswordTab from "../../components/settings/PasswordTab.vue";
import ProfileTab from "../../components/settings/ProfileTab.vue";
export default {
  components: { ProfileTab, PasswordTab },
  name: "Settings",
  data() {
    return {
      tabs: [
        { name: "Profile", id: "profile" },
        { name: "Password", id: "password" },
      ],
      activeTab: "profile",
    };
  },
};
</script>

<template>
  <div class="settings py-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full lg:w-1/4 px-4">
          <div class="shad-4 mb-6">
            <h2 class="text-2xl font-bold mb-4">Settings</h2>
            <ul class="flex lg:block">
              <li
                v-for="tab in tabs"
                :key="tab.id"
                class="cursor-pointer p-4"
                :class="{
                  'bg-primary': activeTab === tab.id,
                  'hover:bg-primary-light': activeTab !== tab.id,
                }"
                @click="activeTab = tab.id"
              >
                {{ tab.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full lg:w-3/4 px-4">
          <ProfileTab v-if="activeTab === 'profile'" />
          <PasswordTab v-if="activeTab === 'password'" />
        </div>
      </div>
    </div>
  </div>
</template>
