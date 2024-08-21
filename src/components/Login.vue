<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              class="toggle-password-btn"
              @click="togglePasswordVisibility"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="loading" class="loading-message">
          Logging in, please wait...
        </div>

        <button
          type="submit"
          class="submit-btn"
          :disabled="loading || !username || !password"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "../stores/loginStore"; // Ensure the correct path

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const errorMessage = ref("");
    const loading = ref(false);
    const router = useRouter();
    const loginStore = useLoginStore();

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        errorMessage.value = "Username and password are required";
        return;
      }

      errorMessage.value = ""; // Clear previous errors
      loading.value = true;

      try {
        await loginStore.login(username.value, password.value);
        const redirectPath = router.currentRoute.value.query.redirect || "/products";
        router.push(redirectPath);
      } catch (error) {
        errorMessage.value = "Login failed. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      username,
      password,
      showPassword,
      errorMessage,
      loading,
      handleLogin,
      togglePasswordVisibility,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f4f6; /* Light gray background */
}

.login-box {
  background: #ffffff; /* White background */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333; /* Dark gray for the title */
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.password-input {
  display: flex;
  align-items: center;
}

.password-input input {
  flex: 1;
}

.toggle-password-btn {
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.875rem;
}

.submit-btn {
  background: #007bff;
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background: #d6d6d6;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  background: #0056b3;
}

.error-message {
  color: #dc3545; /* Bootstrap's danger color for errors */
  margin-top: 1rem;
  font-size: 0.875rem;
}

.loading-message {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #007bff;
}
</style>
