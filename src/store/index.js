import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    uId: 0,
    blogId: 0,
    blog: '',
    email: '',
    teamId: ''
  },
  mutations: {
    setLogin (state, Login) {
      state.isLogin = Login;
    },
    setUId (state, uid) {
      state.uId = uid;
    },
    setBlogId (state, blogId) {
      state.blogId = blogId;
    },
    setBlog (state, blog) {
      state.blog = blog;
    },
    setEmail (state, email) {
      state.email = email;
    },
    setTeamId (state, teamId) {
      state.teamId = teamId;
    }
  },
  actions: {
    set_Login (set, Login) {
      set.commit('setLogin', Login);
    },
    set_uid (set, uid) {
      set.commit('setUId', uid);
    },
    set_blogId (set, blogId) {
      set.commit('setBlogId', blogId);
    },
    set_blog (set, blog) {
      set.commit('setBlog', blog);
    },
    set_email (set, email) {
      set.commit('setEmail', email);
    },
    set_teamId (set, teamId) {
      set.commit('setTeamId', teamId);
    }
  },
  modules: {
  }
});
