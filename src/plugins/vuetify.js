import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import {
	VDataTable,
	VDataTableServer,
	VDataTableVirtual,
} from "vuetify/labs/VDataTable";

export default createVuetify({
	components: {
		VDataTable,
		VDataTableServer,
		VDataTableVirtual,
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
