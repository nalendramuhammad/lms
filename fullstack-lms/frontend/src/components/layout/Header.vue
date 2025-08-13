<template>
  <div class="promo-bar">
    NeXtudies | Unlimited Certifications for just
    <span class="promo-bar__strike">Rp 2.500.000</span> ONLY
    <span class="promo-bar__glow">Rp 300.000</span> - Limited Time Offer! Click
    Here
  </div>
  <div class="header">
    <div class="header__container">
      <div class="header__logo">NeXtudies</div>
      <nav class="header__nav">
        <div class="header__dropdown">
          <a
            href="#"
            class="header__link"
            >Certification</a
          >
          <div class="header__dropdown-menu">
            <a
              href="#"
              class="header__dropdown-item"
              >Certification Competence</a
            >
            <a
              href="#"
              class="header__dropdown-item"
              >Certification Profession</a
            >
          </div>
        </div>
        <a
          href="#"
          class="header__link"
          >Free Learning</a
        >
        <a
          href="#"
          class="header__link"
          >Browse Courses</a
        >
      </nav>
      <div class="header__actions">
        <select class="header__lang">
          <option>EN</option>
          <option>ID</option>
        </select>
        <router-link
          to="/login"
          class="header__login-btn"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/styles/components/_header.scss";
</style>
