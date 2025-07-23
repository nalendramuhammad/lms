<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <RouterLink to="/">MyApp</RouterLink>
      </div>

      <nav class="nav-menu">
        <RouterLink
          to="/"
          exact-active-class="active"
          >Beranda</RouterLink
        >
        <RouterLink
          to="/about"
          exact-active-class="active"
          >Tentang</RouterLink
        >
        <RouterLink
          to="/contact"
          exact-active-class="active"
          >Kontak</RouterLink
        >
      </nav>

      <div class="auth-buttons">
        <RouterLink
          to="/login"
          class="login-button"
          >Masuk</RouterLink
        >
        <RouterLink
          to="/register"
          class="register-button"
          >Daftar</RouterLink
        >
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss">
@use "@/styles/components/header";
</style>
