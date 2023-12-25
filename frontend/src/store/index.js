import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryData:{},
    // loggedIn: localStorage.getItem('loggedIn') === 'true' || false,
    managerRole:true

    // productData:{},
    

  },
  getters: {
    getCategoryData: state => {
      return state.categoryData;
    },
    AddCategory: (state) =>(category) => {
      state.categoryData.push(category);
      fetch(`http://127.0.0.1:5000/api/addcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(category)
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
      // commit.addVenueToState(state,venue);
    },

    EditCategory: () =>(category) => {
      fetch(`http://127.0.0.1:5000/api/editcategory/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(category)
      })
      .catch(error => {
        console.error('Error editing category:', error);
      });
      router.go()
    },

    // DeleteCategory: (state)=>(category)=>{
    //   state.categoryData.splice(category.id,1)
    //   fetch(`http://127.0.0.1:5000/api/deletecategory/${category.id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //   //     // 'Authentication-Token': localStorage.getItem('token')
    //     },
    //   })

    //   .catch(error => {
    //     console.error('Error deleting category:', error);
    //   });
    //   router.go()
    // },


    DeleteCategory: () => (category) => {
      // Show confirmation dialog to confirm deletion
      const confirmDelete = confirm(`Are you sure you want to delete ${category.name}?`);
      
      if (confirmDelete) {
        console.log('URL:', `http://127.0.0.1:5000/api/deletecategory/${category.id}`);
        fetch(`http://127.0.0.1:5000/api/deletecategory/${category.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('token') // Include authentication token if required
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json(); // Assuming the response is JSON
        })
        .then(data => {
          // Update UI or perform actions based on the response from the server
          console.log(data.message); // Log success message or perform UI update
          router.go(); // Move to the updated state or page
        })
        .catch(error => {
          console.error('Error deleting category:', error);
          // Handle error scenario or show error message to the user
        });
        console.log('Category object:', category);
      }
    },
    
    EditProduct: () =>(product) => {
      fetch(`http://127.0.0.1:5000/api/editproduct/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(product)
      })
      .catch(error => {
        console.error('Error editing product:', error);
      });
      router.go()
    },


  },
  mutations: {
    setCategoryData(state, data) {
      state.categoryData = data;
    },


    // login(state) {
    //   state.loggedIn = true;
    //   localStorage.setItem('loggedIn', 'true');
    // },
    // logout(state) {
    //   state.loggedIn = false;
    //   localStorage.setItem('loggedIn', 'false');
    // }
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

    // async loginUser({commit}, payload) {
    //   const login = await fetch('http://127.0.0.1:5000/login?include_auth_token',{
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload)
    //   })
    //   if (!login.ok) {
    //     alert('Incorrect email or password')
    //   }
    //   const data = await login.json()
    //   localStorage.setItem('email',payload.email)
    //   localStorage.setItem('token',data.response.user.authentication_token)

    //   const role = await fetch(`http://127.0.0.1:5000/api/getuser/${payload.email}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   })
    //   const roleData = await role.json()
    //   localStorage.setItem('role',roleData.role)
    //   localStorage.setItem('userID',roleData.id)

    //   commit('login')
    //   // console.log(data)
    //   router.push('/UserHomeView')
    // },
    // logoutUser({commit}) {
    //   localStorage.clear()
    //   commit('logout')
    //   router.push('/');
    // },
  },
  modules: {
  }
})
