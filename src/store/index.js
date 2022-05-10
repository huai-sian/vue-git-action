import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* login api
 {
  Avatar: "NotSet",
  exp: 1651066612,
  iat: 1650980212,
  name: "awei0905",
  nameid: "dd56dfe5-f5a4-4119-bdb0-7307eeae0e57",
  nbf: 1650980212,
  role: "Member"
} */

export default new Vuex.Store({
    strict: true,
    state: {
      user: {
        Avatar: "",
        exp: "",
        name: "",
        nameid: "",
        role: "",
        LoginProvider: ''
      },
      userAuth: '',
      isLoading: false,
    },
    actions: {
      updateLoading(context, status){
        context.commit('LOADING', status);
      },
      getUser(context, obj) {
        context.commit('GETUSER', obj);
        context.commit('SETUSERLOCAL', obj);
      },
      getUserFromLocal(context) {
        context.commit('GETUSERFROMLOCAL');
      },
      removeUser(context) {
        context.commit('REMOVEUSER');
      },
      getUserAuth(context, obj) {
        context.commit('GETUSERAUTH', obj);
        context.commit('SETUSERAUTHLOCAL', obj);
      },
      getUserAuthFromLocal(context) {
        context.commit('GETUSERAUTHFROMLOCAL');
      },
      removeUserAuth(context) {
        context.commit('REMOVEUSERAUTH');
      },
      checkExpAuth(context) {
        if(context.state.user.exp < Math.round(new Date().getTime()/1000)) {
          context.commit('REMOVEUSERAUTH');
        }
      }
    },
    mutations: {
      LOADING(state, status){
        state.isLoading=status;
      },
      GETUSERFROMLOCAL(state) {
        state.user = JSON.parse(localStorage.getItem('user')) || [];
          if(state.user.length === 0) {
            return ;
          }
          console.log('flag');
          console.log(state.user);
      },
      GETUSER(state, payload) {
        state.user = payload;
      },
      GETUSERAUTH(state, payload) {
        state.userAuth = payload;
      },
      GETUSERAUTHFROMLOCAL(state) {
        state.userAuth = JSON.parse(localStorage.getItem('userAuth')) || [];
        if(state.userAuth.length === 0) {
          return ;
        }
      },
      SETUSERLOCAL(state, payload) {
        state.user = localStorage.setItem('user', JSON.stringify(payload));
      },
      SETUSERAUTHLOCAL(state, payload) {
        state.userAuth = localStorage.setItem('userAuth', JSON.stringify(payload));
      },
      REMOVEUSER(state, payload) {
        state.user = localStorage.removeItem('user');
        state.user = {
          Avatar: "",
          exp: "",
          name: "",
          nameid: "",
          role: "",
          LoginProvider: ''
        };
      },
      REMOVEUSERAUTH(state, payload) {
        state.user = localStorage.removeItem('userAuth');
        state.userAuth = '';
      },
    },
    getters:{
      userName: state => state.user.name,
      Avatar: state => { 
        return state.user.Avatar == 'NotSet' ? "/static/images/user.png": state.user.Avatar
      },
      userId: state => state.user.nameid,
      role: state => state.user.role,
      exp: state => state.user.exp,
      userAuth: state => state.userAuth,
      isLoading: state => state.isLoading,
      LoginProvider: state => state.user.LoginProvider,
    },
  })
  