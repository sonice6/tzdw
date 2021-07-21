import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    muen:""
  },
  mutations: {
    changeMuen(state , muen){
      state.muen = muen
    }
  },
  actions: {
  },
  modules: {
  }
})
