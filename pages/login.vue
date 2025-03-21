<template>
  <v-container
    fluid
    class="d-flex justify-center align-center"
    style="min-height: 100vh"
  >
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4 component-shadow" max-width="600">
          <v-card-title class="text-h5 text-center"
            >Welcome to Car Rental (Staff Login)</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form" v-model="isValid">
              <label for="email">Email or Username</label>
              <v-text-field
                v-model="username"
                placeholder="Enter Your Username"
                variant="outlined"
                density="compact"
                rounded="lg"
                color="primary"
                :rules="[rules.required]"
              >
              </v-text-field>
              <label for="password">Password</label>
              <v-text-field
                v-model="password"
                variant="outlined"
                density="compact"
                rounded="lg"
                color="primary"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                placeholder="********"
                :rules="[rules.required]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              block
              @click="handleLogin"
              :disabled="!isValid"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      show1: false,
      username: "",
      password: "",
      isValid: false,
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    handleLogin() {
      const auth = useAuthStore();
      const router = useRouter();

      auth.login(this.username, this.password);

      const isAuthenticatedFromStorage =
        localStorage.getItem("auth") === "true";

      console.log("auth.isAuthenticated", isAuthenticatedFromStorage);

      this.$nextTick(() => {
        if (isAuthenticatedFromStorage) {
          this.$router.push("/booking");
          // router.push("/rentals");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
