import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import zhHant from '@/i18n/zh-Hant';
import 'vuetify/styles';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          brand: '#ffea00',
          background: '#f6f6f7',
        },
      },
      dark: {
        colors: {
          brand: '#ffea00',
          primary: '#ffea00',
        },
      },
    },
  },
  locale: {
    locale: 'zhHant',
    messages: { zhHant },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
