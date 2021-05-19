import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_REGISTER,
  AUTH_LOGOUT,
} from "../actions/auth";
import UserService from "@/services/UserService";

const state = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
  signedIn: false,
};



const getters = {
  signedIn: (state) => !!state.signedIn,
  currentUser: (state) => state.currentUser,
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.Login(request)
        .then((response) => {
          console.log(response);
          if (response.data.isSucceed) {
            commit(AUTH_SUCCESS, response);
            resolve(response)
          }
        })
        .catch(error => {
          commit(AUTH_ERROR);
          reject(error)
        });
    });
  },
  [AUTH_REGISTER]: ({ commit }, request) => {
    return new Promise((resolve, reject) => {
      UserService.Register(request)
        .then((response) => {
          if (response.data.isSucceed) {
            commit(AUTH_REGISTER, request);
            resolve(response)
          }
        })
        .catch(error => {
          commit(AUTH_ERROR);
          reject(error)
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
  },
};

const mutations = {
  [AUTH_SUCCESS]: (state, response) => {
    state.currentUser = { Tckn: response.data.response.tckn, Role:response.data.response.role  };
    state.signedIn = true;
  },
  [AUTH_REGISTER]: (state, request) => {
    if(request.Role != "admin"){
      state.currentUser = { Tckn: request.Tckn, Role:"client" };
      state.signedIn = true;
    }
    
  },
  [AUTH_ERROR]: (state) => {
    state.currentUser = null;
    state.signedIn = false;
  },
  [AUTH_LOGOUT]: (state) => {
    state.currentUser = "";
    state.signedIn = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
