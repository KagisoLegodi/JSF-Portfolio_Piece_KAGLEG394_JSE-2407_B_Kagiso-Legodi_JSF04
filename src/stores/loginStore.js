import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(
          'https://fakestoreapi.com/auth/login',
          {
            username,
            password,
          },
          {
            headers: { 'Content-type': 'application/json' },
          }
        );

        const token = response.data.token;
        this.user = { username };
        this.token = token;

        // Store the token in localStorage for persistent authentication
        localStorage.setItem('token', token);
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token'); // Clear the JWT from localStorage
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});
