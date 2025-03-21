export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    login(username, password) {
      console.log("login", username, password);
      if (username === "sta001" && password === "givemethekeys123") {
        localStorage.setItem("user", JSON.stringify({ username }));
        localStorage.setItem("auth", "true");
        this.user = { username };
        return true;
      } else {
        localStorage.setItem("auth", "false");
        return false;
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.setItem("auth", "false");
      this.user = null;
    },
    checkAuth() {
      const storedUser = localStorage.getItem("user");
      this.user = storedUser ? JSON.parse(storedUser) : null;
    },
  },
});
