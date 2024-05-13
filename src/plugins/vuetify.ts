import Vue from 'vue';
import Vuetify from 'vuetify';
import zhHant from '@/i18n/zh-Hant';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        brand: '#ffea00',
        background: '#f6f6f7',
      },
      dark: {
        brand: '#ffea00',
        primary: '#ffea00',
      },
    },
  },
  lang: {
    locales: { zhHant },
    current: 'zhHant',
  },
});
