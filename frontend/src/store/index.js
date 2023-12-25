import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryData:{},
    loggedIn: localStorage.getItem('loggedIn') === 'true' || false,

    // productData:{},
    

  },
  getters: {
    getCategoryData: state => {
      return state.categoryData;
    }

  },
  mutations: {
    setCategoryData(state, data) {
      state.categoryData = data;
    },
    login(state) {
      state.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
    },
    logout(state) {
      state.loggedIn = false;
      localStorage.setItem('loggedIn', 'false');
    }
  },
  actions: {
      async fetchProductsData({ commit }) {
        const response = await fetch(`http://127.0.0.1:5000/api/getcategory`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data= await response.json();
        console.log(data)
        commit('setCategoryData', data);
        // console.log(data)
    },

    async loginUser({commit}, payload) {
      const login = await fetch('http://127.0.0.1:5000/login?include_auth_token',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (!login.ok) {
        alert('Incorrect email or password')
      }
      const data = await login.json()
      localStorage.setItem('email',payload.email)
      localStorage.setItem('token',data.response.user.authentication_token)

      const role = await fetch(`http://127.0.0.1:5000/api/getuser/${payload.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      })
      const roleData = await role.json()
      localStorage.setItem('role',roleData.role)
      localStorage.setItem('userID',roleData.id)

      commit('login')
      // console.log(data)
      router.push('/UserHomeView')
    },
    logoutUser({commit}) {
      localStorage.clear()
      commit('logout')
      router.push('/');
    },
  },
  modules: {
  }
})
