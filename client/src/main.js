import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Skeletor } from "vue-skeletor";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./config/fontawesome";
import "./config/axios";
import router from "./config/routes";

createApp(App)
  .use(router)
  .component("skeletor", Skeletor)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
