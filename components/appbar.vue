<template>
  <v-card class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template> -->

        <v-app-bar-title class="ml-5 cursor-pointer" @click="$router.push('/')"
          >We Are Cars</v-app-bar-title
        >

        <v-spacer></v-spacer>
        <NuxtLink to="/booking" class="mx-5">
          <v-btn color="primary" variant="tonal"> Booking </v-btn>
        </NuxtLink>
        <NuxtLink to="/rentals" class="mx-5">
          <v-btn color="primary" variant="tonal"> Rentals </v-btn>
        </NuxtLink>
        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-avatar
              size="60"
              style="cursor: pointer; background-color: white"
              v-bind="props"
            >
              <v-icon size="x-large" icon="mdi-account"></v-icon>
            </v-avatar>
          </template>

          <v-list color="transparent" density="compact" nav>
            <v-row no-gutters justify="center">
              <v-btn
                class="text-capitalize rounded-lg my-2"
                color="#A91079"
                theme="dark"
                block
                append-icon="mdi-logout"
                @click="logout"
              >
                Logout</v-btn
              >
            </v-row>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      const isAuthenticatedFromStorage =
        localStorage.getItem("auth") === "true";
      this.$nextTick(() => {
        if (!isAuthenticatedFromStorage) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
