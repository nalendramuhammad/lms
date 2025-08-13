import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import BrowseCourses from "@/pages/cms/BrowseCourses.vue";
import UserManagement from "@/pages/cms/UserManagement.vue";
import FreeCourses from "@/pages/cms/FreeCourses.vue";
import SearchJobs from "@/pages/cms/SearchJobs.vue";
import Badges from "@/pages/cms/Badges.vue";
import Testimonials from "@/pages/cms/Testimonials.vue";
import MarketingContent from "@/pages/cms/MarketingContent.vue";
import LearningCategories from "@/pages/cms/LearningCategories.vue";
import Certifications from "@/pages/cms/Certifications.vue";
import Analytics from "@/pages/cms/Analytics.vue";
import PricingMarketing from "@/pages/cms/PricingMarketing.vue";
import Settings from "@/pages/cms/Settings.vue";
// removed CourseDetail import

const routes = [
  { path: "/", component: Home },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/cms/courses",
    component: BrowseCourses,
    meta: { requiresAuth: true },
  },
  // removed CourseDetail route
  {
    path: "/cms/users",
    component: UserManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/free-courses",
    component: FreeCourses,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/search-jobs",
    component: SearchJobs,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/badges",
    component: Badges,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/testimonials",
    component: Testimonials,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/marketing",
    component: MarketingContent,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/categories",
    component: LearningCategories,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/certifications",
    component: Certifications,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/analytics",
    component: Analytics,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/pricing-marketing",
    component: PricingMarketing,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms/settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: "/cms",
    redirect: "/cms/courses",
    meta: { requiresAuth: true },
  },
  // Redirect dashboard to CMS courses
  {
    path: "/dashboard",
    redirect: "/cms/courses",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth if not already done
  if (!authStore.user && authStore.token) {
    try {
      await authStore.initializeAuth();
    } catch (error) {
      // Token invalid, continue with redirect
    }
  }

  // Handle route change for CMS logout
  if (!authStore.handleRouteChange(to)) {
    next("/login");
    return;
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/cms/courses");
    return;
  }

  next();
});

export default router;
