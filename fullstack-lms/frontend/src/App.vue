<template>
  <div id="app">
    <!-- Login page tanpa header dan footer -->
    <template v-if="isLoginRoute">
      <router-view />
    </template>

    <!-- Header dan Footer hanya untuk halaman non-CMS -->
    <template v-else-if="!isCmsRoute">
      <AppHeader />
      <main>
        <router-view />
      </main>
      <AppFooter />
    </template>

    <!-- CMS layout tanpa header dan footer -->
    <template v-else>
      <router-view />
    </template>

    <!-- Fallback jika tidak ada route yang match -->
    <div
      v-if="!$route.matched.length"
      style="padding: 20px; text-align: center"
    >
      <h1>404 - Page Not Found</h1>
      <p>Route: {{ $route.path }}</p>
      <router-link to="/">Go Home</router-link>
    </div>
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

  computed: {
    isCmsRoute() {
      return this.$route.path.startsWith("/cms");
    },
    isLoginRoute() {
      return this.$route.path === "/login";
    },
  },
};
</script>
