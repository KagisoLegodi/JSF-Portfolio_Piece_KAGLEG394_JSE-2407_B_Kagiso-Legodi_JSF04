<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handlelogin" class="form">
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
              v-model="password"
              placeholder="Enter your password"
              required
            />
            <botton
              type="button"
              class="toggle-password-btn"
              @click="togglePasswordVisibility"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </botton>
          </div>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessgae }}</div>
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
import { ref } from 'vue';

export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const showPassword =  ref(false);
        const errorMessage = ref('');
        const loading = ref(false);

        const handleLogin = async () => {
            if (!username.value || !password.value) {
                errorMessage.value = 'Username nad password are required';
                return;
            }

            errorMessage.value = '';
            loading.value = true;

            try {
                await useLoginStore.login(username.value, password.value);
                const redirectPath = router.currentRoute.value.query.redirect ||'/';
                router.push(redirectPath);
            }
            catch (error) {
                errorMessage.value = 'Login failed. Please try again.';
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
            togglePasswordVisibility
        };
    }
};
</script>
