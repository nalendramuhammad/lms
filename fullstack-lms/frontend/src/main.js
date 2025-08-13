import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";
import "@/styles/main.scss";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize auth store
const authStore = useAuthStore();
authStore.initializeAuth();

// Setup activity listeners for auto-logout
authStore.setupActivityListeners();

app.mount("#app");
