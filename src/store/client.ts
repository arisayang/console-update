/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint
no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const state = {
  ctk: Cookies.get('ctk') || null,
};

const mutations = {
  setCtk(state, ctk) {
    state.ctk = ctk;
    if (process.env.NODE_ENV === 'development') {
      Cookies.set('ctk', ctk, { expires: 3560, path: '/' });
    } else {
      Cookies.set('ctk', ctk, { expires: 3560, domain: '.ocard.co', path: '/' });
    }
  },
  clearCtk(state) {
    state.ctk = null;
    Cookies.remove('ctk', { domain: 'ocard.co' });
    Cookies.remove('ctk', { domain: '.ocard.co' });
    Cookies.remove('ctk');
  },
};

export default {
  state,
  mutations,
};
