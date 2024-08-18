import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// FontAwesome Imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShoppingCart, faStar, faInfoCircle,faTrash,faFilter,faBalanceScale,faHome} from "@fortawesome/free-solid-svg-icons";

// Add the shopping cart icon to the library
library.add(faShoppingCart, faStar, faInfoCircle,faTrash,faFilter,faBalanceScale,faHome);

const pinia = createPinia();

const app = createApp(App);

// Register FontAwesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Use Pinia and Vue Router
app.use(router).use(pinia).mount("#app");
