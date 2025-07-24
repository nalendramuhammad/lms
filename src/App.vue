<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
      <!-- Komponen halaman ditampilkan di sini -->
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/layout/Header.vue";
import AppFooter from "@/components/layout/Footer.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
