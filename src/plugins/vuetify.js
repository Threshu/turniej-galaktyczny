import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#006420",
          primaryLight: "#42b549",
          secondary: "#42b549",
          background: "#F4F4F4",
          surface: "#FFFFFF",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
          onPrimary: "#FFFFFF",
          onSecondary: "#FFFFFF",
        },
      },
    },
  },
});
