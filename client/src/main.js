import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Skeletor } from "vue-skeletor";
import ToastPlugin from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./config/fontawesome";
import "./config/axios";
import router from "./config/routes";

createApp(App)
  .use(router)
  .use(ToastPlugin)
  .component("skeletor", Skeletor)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
