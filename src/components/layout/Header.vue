<template>
  <header class="app-header">
    <h1>My LMS App</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped lang="scss">
@use "@/styles/components/header";
</style>
