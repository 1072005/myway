import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userName: '',
  },
  mutations: {
    set_token(state, token) {
      state.token = 'bearer ' +token ;
      localStorage.setItem('token', token);
    },
    set_Userinfo(state, userName){
      state.userName = userName;
      localStorage.setItem('userName', userName);
    },
    del_token(state){
      state.token = '';
      state.userName = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    token: state => {
      return state.token;
    }
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })]
})
