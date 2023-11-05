import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import { VStepper } from 'vuetify/labs/VStepper';

export default createVuetify({
  components: {
    VStepper
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#006420',
          primaryLight: '#42b549',
          secondary: '#42b549',
        },
      },
    },
  },
});
