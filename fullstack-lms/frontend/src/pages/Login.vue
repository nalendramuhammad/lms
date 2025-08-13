<template>
  <div class="login-page">
    <div class="login-page__container">
      <div class="login-page__header">
        <h1>Welcome Back</h1>
        <p>Sign in to your LMS account</p>
      </div>

      <form
        @submit.prevent="handleLogin"
        class="login-page__form"
      >
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="login-page__btn"
        >
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>

        <div
          v-if="error"
          class="login-page__error"
        >
          {{ error }}
        </div>

        <div class="login-page__credentials">
          <h4>Demo Credentials:</h4>
          <div class="credential-item">
            <strong>Admin:</strong> admin@lms.com / admin123
          </div>
          <div class="credential-item">
            <strong>Instructor:</strong> instructor@lms.com / instructor123
          </div>
          <div class="credential-item">
            <strong>Student:</strong> student@lms.com / student123
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
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
          router.push("/cms/courses");
        } catch (err) {
        error.value = err.error || "Login failed. Please try again.";
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

<style lang="scss">
@use "@/styles/pages/login" as *;
</style>
