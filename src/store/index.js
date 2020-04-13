import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

// 开发用
if (process.env.NODE_ENV === 'development') {
  document.cookie = 'openid=123321';
}

const store = new Vuex.Store({
  state: {
    openid: getCookie('openid'),
  },
  mutations: {
  },
  actions: {},
  modules: {}
});

export default store;
