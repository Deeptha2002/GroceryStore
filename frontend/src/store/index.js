import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryData:{},
    loggedIn: localStorage.getItem('loggedIn') === 'true' || false,
    managerRole:true,
    cartData:{},
    // purchasedData:{},
    productData:{},
    

  },
  getters: {
    getCategoryData: state => {
      return state.categoryData;
    },
    getProductData: state => {
      return state.productData;
    },
    getCartData: state=>{
      return state.cartData;
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

    DeleteCategory: () => (category) => {
      const confirmDelete = confirm(`Are you sure you want to delete ${category.name}?`);
      
      if (confirmDelete) {
        console.log('URL:', `http://127.0.0.1:5000/api/deletecategory/${category}`);
        console.log('Category object:', category);
        fetch(`http://127.0.0.1:5000/api/deletecategory/${category}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 'Authentication-Token': localStorage.getItem('token') 
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message); 
          router.go(); 
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
        console.log('Category object:', category);
      }
    },

    AddProduct: (state) =>(product) => {
      state.productData.push(product);
      fetch(`http://127.0.0.1:5000/api/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(product)
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
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

    DeleteProduct: () => (product) => {
      const confirmDelete = confirm(`Are you sure you want to delete ${product.name}?`);
      
      if (confirmDelete) {
        console.log('Product object:', product);
        console.log('URL:', `http://127.0.0.1:5000/api/deletecategory/${product.id}`);
        fetch(`http://127.0.0.1:5000/api/deleteproduct/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 'Authentication-Token': localStorage.getItem('token') 
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message); 
          router.go(); 
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
        console.log('Product object:', product);
      }
    },

    AddToCart: () =>(cart) => {
      fetch(`http://127.0.0.1:5000/api/addcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(cart)
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
    },

    BuyNow: () =>(product)=> {
      // state.cartData.push(cart);
      if(localStorage.getItem("loggedIn") !== "true"){
        this.$router.push("/login")
      }
      else{
      fetch(`http://127.0.0.1:5000/api/buynow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify(
          {
            "user_id": localStorage.getItem('userID'),
            "product_id":product.id
          }
        )
      })
      .catch(error => {
        console.error('Error purchasing the product:', error);
      });
    }
    },


  },
  mutations: {
    setCategoryData(state, data) {
      state.categoryData = data;
    },
    setProductData(state, data) {
      state.productData = data;
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
      console.log(payload)
      const login = await fetch('http://127.0.0.1:5000/login?include_auth_token',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      })
      if (!login.ok) {
        alert('Incorrect email or password')
      }
      const data = await login.json()
      console.log(data)
      let email=JSON.parse(payload).email
      localStorage.setItem('email',email)
      localStorage.setItem('token',data.response.user.authentication_token)
      
      const role = await fetch(`http://127.0.0.1:5000/api/getuser/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      })
      const roleData = await role.json()
      localStorage.setItem('role',roleData.role)
      localStorage.setItem('userID',roleData.id)
      // localStorage.setItem('email',payload.email)
      // localStorage.setItem('token',data.response.user.authentication_token)

      commit('login')
      // console.log(data)
      router.push('/')
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
