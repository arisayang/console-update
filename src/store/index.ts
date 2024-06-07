import Vue from 'vue';
import Vuex from 'vuex';
import type { Store } from 'vuex';
import client from './client';

Vue.use(Vuex);

export type RootState = {
};

const store: Store<RootState> = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    client,
  },
});

export default store;
/** 模擬 useStore */
export function useStore(): Store<RootState> {
  return store;
}
