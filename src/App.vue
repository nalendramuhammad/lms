<template>
  <div id="app">
    <AppHeader />

    <RouterView v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/Header.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
@use "./styles/main.scss";

// Transisi halaman
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
