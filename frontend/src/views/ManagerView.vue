<!-- <template>
  <div>
    <button v-if="userRole === 'manager'" @click="addProduct">Add Product</button>
    
    Edit Button
    <button v-if="userRole === 'manager'" @click="editProduct">Edit Product</button>
    
    Delete Button
    <button v-if="userRole === 'manager'" @click="deleteProduct">Delete Product</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRole: '', 
    };
  },
  methods: {
    async addProduct() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/addproduct', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        },
        });
        const data = await response.json();
        console.log(data)
        commit('setCategoryData', data);
        
      } catch (error) {
        // Handle errors
      }
    },
    async editProduct() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/editproduct/:id', {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        },
        });
        const data = await response.json();
        // Handle response data as needed
      } catch (error) {
        // Handle errors
      }
    },
    async deleteProduct() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/deleteproduct/:id', {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        },
        });
        const data = await response.json();
        // Handle response data as needed
      } catch (error) {
        // Handle errors
      }
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.getUserRole;
    },
  },
};
</script> -->
