<script>
import InputField from './InputField.vue';
export default {
  name: "Footer",
};
</script>


    InputField<template>
  <footer
    class="text-white py-20"
    style="
      background-image: url('/footer-bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    "
  >
    <div class="container mx-auto px-4">
      <div class="grid lg:grid-cols-3 lg:gap-20">
        <div>
          <img
            src="/white-logo.svg"
            alt="QuillQuest"
            class="h-[100px] w-auto mb-8"
          />
          <p class="mb-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p class="mb-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-brand mb-8">Quick Links</h3>
          <ul class="mb-4 list-disc ms-10">
            <li class="mb-2">Lorem ipsum dolor</li>
            <li class="mb-2">Sit amet, consectetur</li>
            <li class="mb-2">Adipiscing elit</li>
            <li class="mb-2">Ut et massa mi</li>
            <li class="mb-2">Aliquam in hendrerit urna</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-brand mb-8">Subscribe</h3>
          <p class="text-xs mb-4">
            Enter your email to receive timely updates, and exclusive content
            directly to your inbox.
          </p>
          <div class="relative">
            <input
              type="email"
              placeholder="example@example.com"
              class="px-4 py-2 bg-primary outline-none border-none pr-10 text-secondary w-full placeholder:text-secondary"
            />
            <font-awesome-icon
              icon="envelope"
              class="absolute top-1/2 right-4 transform -translate-y-1/2 text-secondary"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 mt-20 border-t border-t-primary">
      <div class="text-center pt-10">
        <p class="text-xs">
          © 2021 QuillQuest. All rights reserved. Made with ❤️ by
          <a href="http://brahimelhoube.com" target="_blank">BRAHIM EL HOUBE</a>
        </p>
      </div>
    </div>
  </footer>
</template>
