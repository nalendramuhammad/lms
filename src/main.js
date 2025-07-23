import { createApp } from "vue";
import App from "./App.vue";
// import router from './router' ← jika pakai router
import "./styles/utils/_main.scss";

const app = createApp(App);
// app.use(router) ← jika pakai router
app.mount("#app");
