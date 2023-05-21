<script>
export default {
  name: "InputField",
  props: ["type", "placeholder", "icon", "error", "modelValue"],
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<template>
  <div class="mb-4">
    <div class="relative">
      <input
        :type="type"
        :placeholder="placeholder"
        class="px-4 py-2 bg-primary outline-none pl-10 text-secondary w-full placeholder:text-secondary"
        :class="{ 'border border-red-500': error }"
        :value="modelValue"
        @input="handleInput"
      />
      <font-awesome-icon
        :icon="icon"
        class="absolute top-0 left-0 mt-3 ml-3 text-secondary"
      />
    </div>
    <div class="text-red-500 text-xs mt-1" v-if="error">{{ error }}</div>
  </div>
</template>
