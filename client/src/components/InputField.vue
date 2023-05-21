<script>
export default {
  name: "InputField",
  props: ["type", "placeholder", "icon", "modelValue"],
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<template>
  <div class="relative mb-4">
    <input
      :type="type"
      :placeholder="placeholder"
      class="px-4 py-2 bg-primary outline-none border-none pl-10 text-secondary w-full placeholder:text-secondary"
      :value="modelValue"
      @input="handleInput"
    />
    <font-awesome-icon
      :icon="icon"
      class="absolute top-0 left-0 mt-3 ml-3 text-secondary"
    />
  </div>
</template>
