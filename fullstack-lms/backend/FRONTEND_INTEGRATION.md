# 🔗 Frontend Integration Guide

Panduan integrasi frontend Vue.js dengan backend API LMS.

## 🌐 API Base URL

```javascript
const API_BASE_URL = "http://localhost:5001/api";
```

## 🔐 Authentication Integration

### 1. Setup Axios Instance

```javascript
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Authentication Store (Pinia)

```javascript
// src/stores/auth.js
import { defineStore } from "pinia";
import api from "@/utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
  }),

  getters: {
    userRole: (state) => state.user?.role || "student",
    isAdmin: (state) => state.user?.role === "admin",
    isInstructor: (state) => state.user?.role === "instructor",
  },

  actions: {
    async register(userData) {
      try {
        const response = await api.post("/auth/register", userData);
        this.setAuth(response.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async login(credentials) {
      try {
        const response = await api.post("/auth/login", credentials);
        this.setAuth(response.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async getProfile() {
      try {
        const response = await api.get("/auth/me");
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async updateProfile(userData) {
      try {
        const response = await api.put("/auth/me", userData);
        this.user = response.data.user;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    setAuth(data) {
      this.user = data.user;
      this.token = data.token;
      this.isAuthenticated = true;
      localStorage.setItem("token", data.token);
    },
  },
});
```

### 3. Login Component

```vue
<!-- src/components/LoginForm.vue -->
<template>
  <form
    @submit.prevent="handleLogin"
    class="login-form"
  >
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
    >
      {{ loading ? "Logging in..." : "Login" }}
    </button>

    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const loading = ref(false);
    const error = ref("");

    const form = reactive({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      loading.value = true;
      error.value = "";

      try {
        await authStore.login(form);
        router.push("/dashboard");
      } catch (err) {
        error.value = err.error || "Login failed";
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      error,
      handleLogin,
    };
  },
};
</script>
```

## 📚 Course Integration

### 1. Course Store

```javascript
// src/stores/courses.js
import { defineStore } from "pinia";
import api from "@/utils/api";

export const useCourseStore = defineStore("courses", {
  state: () => ({
    courses: [],
    currentCourse: null,
    loading: false,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    filters: {
      search: "",
      category: "",
      level: "",
      price: "",
      featured: false,
    },
  }),

  actions: {
    async fetchCourses(params = {}) {
      this.loading = true;
      try {
        const response = await api.get("/courses", { params });
        this.courses = response.data.data;
        this.pagination = response.data.pagination;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchCourse(id) {
      try {
        const response = await api.get(`/courses/${id}`);
        this.currentCourse = response.data.data;
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async createCourse(courseData) {
      try {
        const response = await api.post("/courses", courseData);
        this.courses.unshift(response.data.data);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async updateCourse(id, courseData) {
      try {
        const response = await api.put(`/courses/${id}`, courseData);
        const index = this.courses.findIndex((c) => c._id === id);
        if (index !== -1) {
          this.courses[index] = response.data.data;
        }
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

    async deleteCourse(id) {
      try {
        await api.delete(`/courses/${id}`);
        this.courses = this.courses.filter((c) => c._id !== id);
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
  },
});
```

### 2. Course List Component

```vue
<!-- src/components/CourseList.vue -->
<template>
  <div class="course-list">
    <!-- Filters -->
    <div class="filters">
      <input
        v-model="filters.search"
        placeholder="Search courses..."
        @input="handleSearch"
      />
      <select
        v-model="filters.category"
        @change="handleFilter"
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </select>
      <select
        v-model="filters.level"
        @change="handleFilter"
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading courses...
    </div>

    <!-- Course Grid -->
    <div
      v-else
      class="course-grid"
    >
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        @click="viewCourse(course._id)"
      />
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination.pages > 1"
      class="pagination"
    >
      <button
        :disabled="pagination.page === 1"
        @click="changePage(pagination.page - 1)"
      >
        Previous
      </button>
      <span>{{ pagination.page }} of {{ pagination.pages }}</span>
      <button
        :disabled="pagination.page === pagination.pages"
        @click="changePage(pagination.page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useCourseStore } from "@/stores/courses";
import CourseCard from "@/components/CourseCard.vue";

export default {
  name: "CourseList",
  components: {
    CourseCard,
  },
  setup() {
    const courseStore = useCourseStore();

    const filters = reactive({
      search: "",
      category: "",
      level: "",
      price: "",
      featured: false,
    });

    const loading = computed(() => courseStore.loading);
    const courses = computed(() => courseStore.courses);
    const pagination = computed(() => courseStore.pagination);

    const handleSearch = () => {
      courseStore.fetchCourses({ ...filters, page: 1 });
    };

    const handleFilter = () => {
      courseStore.fetchCourses({ ...filters, page: 1 });
    };

    const changePage = (page) => {
      courseStore.fetchCourses({ ...filters, page });
    };

    const viewCourse = (id) => {
      // Navigate to course detail
    };

    onMounted(() => {
      courseStore.fetchCourses();
    });

    return {
      filters,
      loading,
      courses,
      pagination,
      handleSearch,
      handleFilter,
      changePage,
      viewCourse,
    };
  },
};
</script>
```

## 🛡️ Route Guards

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/pages/Courses.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/pages/Admin.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Check if route requires admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next("/dashboard");
    return;
  }

  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/dashboard");
    return;
  }

  next();
});

export default router;
```

## 🔧 Environment Configuration

```javascript
// src/config/api.js
const config = {
  development: {
    apiUrl: "http://localhost:5001/api",
  },
  production: {
    apiUrl: "https://your-api-domain.com/api",
  },
};

export default config[process.env.NODE_ENV || "development"];
```

## 📱 Error Handling

```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return `Bad Request: ${data.error}`;
      case 401:
        return "Unauthorized. Please login again.";
      case 403:
        return "Forbidden. You don't have permission.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return data.error || "An error occurred.";
    }
  } else if (error.request) {
    // Network error
    return "Network error. Please check your connection.";
  } else {
    // Other error
    return error.message || "An error occurred.";
  }
};
```

## 🚀 Deployment Checklist

- [ ] Update API base URL untuk production
- [ ] Setup CORS untuk domain production
- [ ] Configure environment variables
- [ ] Test semua API endpoints
- [ ] Setup error monitoring
- [ ] Configure SSL certificates
- [ ] Setup CDN untuk static files
- [ ] Configure caching strategies

## 📞 Support

Untuk bantuan integrasi atau troubleshooting, silakan hubungi tim development.
