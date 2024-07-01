import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useClientStore = defineStore('client', () => {
  // =================
  //
  // state
  //

  const state = reactive({
    ctk: Cookies.get('ctk') || null,
  });

  // =================
  //
  // actions
  //

  const setCtk = (ctk) => {
    state.ctk = ctk;
    if (process.env.NODE_ENV === 'development') {
      Cookies.set('ctk', ctk, { expires: 3560, path: '/' });
    } else {
      Cookies.set('ctk', ctk, { expires: 3560, domain: '.ocard.co', path: '/' });
    }
  };

  const clearCtk = () => {
    state.ctk = null;
    Cookies.remove('ctk', { domain: 'ocard.co' });
    Cookies.remove('ctk', { domain: '.ocard.co' });
    Cookies.remove('ctk');
  };

  // =================
  //
  // done
  //

  return {
    state,
    setCtk,
    clearCtk,
  };
});

export default useClientStore;
