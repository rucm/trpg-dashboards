import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ja from 'vuetify/src/locale/ja';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#00695C',
        secondary: '#424242',
        accent: '#EF6C00',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { ja },
      current: 'ja',
    },
});
