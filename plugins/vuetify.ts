// plugins/vuetify.ts
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "customTheme", // Set custom theme as default
      themes: {
        customTheme: {
          colors: {
            primary: "#A91079",
            secondary: "#33ff57",
            accent: "#5733ff",
            error: "#ff3333",
            info: "#33aaff",
            success: "#33ff99",
            warning: "#ffaa33",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
