import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "../config/fontawesome";
import "../config/axios";

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
