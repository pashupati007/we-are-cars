<template>
  <div class="bg-image">
    <v-container
      class="d-flex justify-center align-center px-16"
      height="100vh"
    >
      <v-row density="compact">
        <v-col v-if="!isAuthenticated" align="center">
          <v-card
            class="d-flex justify-center align-center"
            width="200"
            height="200"
            @click="$router.push('/login')"
          >
            <v-card-text>
              <h1>Login</h1>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="isAuthenticated" align="center">
          <v-card
            class="d-flex justify-center align-center"
            width="200"
            height="200"
            @click="$router.push('/booking')"
          >
            <v-card-text>
              <h1>Booking</h1>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="isAuthenticated" align="center">
          <v-card
            class="d-flex justify-center align-center"
            width="200"
            height="200"
            @click="$router.push('/rentals')"
          >
            <v-card-text>
              <h1>Rentals</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    this.isAuthenticated = localStorage.getItem("auth") === "true";
  },
};
</script>
