<template>
  <aside
    class="sidebar"
    :class="{ collapsed: isCollapsed }"
  >
    <div class="sidebar-header">
      <div class="header-content">
        <h1
          class="logo"
          v-show="!isCollapsed"
        >
          NeXtudies CMS
        </h1>
        <h1
          class="logo-collapsed"
          v-show="isCollapsed"
        >
          NC
        </h1>
        <p
          class="subtitle"
          v-show="!isCollapsed"
        >
          Content Management System
        </p>
      </div>
      <button
        class="toggle-btn"
        @click="toggleSidebar"
      >
        <i
          class="mdi"
          :class="isCollapsed ? 'mdi-menu' : 'mdi-menu-open'"
        ></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="section-title">CONTENT MANAGEMENT</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link
              to="/cms/courses"
              class="nav-link"
              :title="isCollapsed ? 'Browse Courses' : ''"
            >
              <i class="mdi mdi-book-open-variant"></i>
              <span>Browse Courses</span>
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link
              to="/cms/free-courses"
              class="nav-link"
              :title="isCollapsed ? 'Free Courses' : ''"
            >
              <i class="mdi mdi-star"></i>
              <span>Free Courses</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/search-jobs"
              class="nav-link"
              :title="isCollapsed ? 'Search Jobs' : ''"
            >
              <i class="mdi mdi-briefcase"></i>
              <span>Search Jobs</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/badges"
              class="nav-link"
              :title="isCollapsed ? 'Badges' : ''"
            >
              <i class="mdi mdi-medal"></i>
              <span>Badges</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/testimonials"
              class="nav-link"
              :title="isCollapsed ? 'Testimonials' : ''"
            >
              <i class="mdi mdi-message-text"></i>
              <span>Testimonials</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/marketing"
              class="nav-link"
              :title="isCollapsed ? 'Marketing Content' : ''"
            >
              <i class="mdi mdi-chart-line"></i>
              <span>Marketing Content</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/categories"
              class="nav-link"
              :title="isCollapsed ? 'Learning Categories' : ''"
            >
              <i class="mdi mdi-folder-multiple"></i>
              <span>Learning Categories</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/certifications"
              class="nav-link"
              :title="isCollapsed ? 'Certifications' : ''"
            >
              <i class="mdi mdi-certificate"></i>
              <span>Certifications</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="section-title">SYSTEM</h3>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link
              to="/cms/users"
              class="nav-link"
              :title="isCollapsed ? 'User Management' : ''"
            >
              <i class="mdi mdi-account-group"></i>
              <span>User Management</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/analytics"
              class="nav-link"
              :title="isCollapsed ? 'Analytics' : ''"
            >
              <i class="mdi mdi-chart-bar"></i>
              <span>Analytics</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/pricing-marketing"
              class="nav-link"
              :title="isCollapsed ? 'Pricing & Marketing' : ''"
            >
              <i class="mdi mdi-currency-usd"></i>
              <span>Pricing & Marketing</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/cms/settings"
              class="nav-link"
              :title="isCollapsed ? 'Settings' : ''"
            >
              <i class="mdi mdi-cog"></i>
              <span>Settings</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
      <button
        class="back-button"
        :title="isCollapsed ? 'Logout' : ''"
        @click="handleLogout"
      >
        <i class="mdi mdi-logout"></i>
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const isCollapsed = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem("sidebarCollapsed", isCollapsed.value);
};

onMounted(() => {
  const savedState = localStorage.getItem("sidebarCollapsed");
  if (savedState !== null) {
    isCollapsed.value = JSON.parse(savedState);
  }
});

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
@use "@/styles/cms.scss" as *;
</style>
