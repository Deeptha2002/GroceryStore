<!-- MyProduct.vue -->
<template>
  <div>
    <div class="product-container">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="card">
          <h3 class="card-title highlight-text"><b>{{ product.name }}</b></h3>
          <h6 class="card-subtitle mb-2 text-body-secondary">Rs.{{ product.price }} per {{ product.unit }}</h6>
          <p class="card-text">Expiry: {{ product.expiry }}</p>
          <p :class="{ 'availability-green': product.availability > 0, 'availability-red': product.availability === 0 }">
            {{ product.availability > 0 ? 'Available ' + product.availability + product.unit + 's' : 'Unavailable' }}
          </p>
          <div>
            <b-button class="btn btn-outline-success" v-if="!createCartClicked" @click="toggleCreateCart()">ADD TO
              CART</b-button>
            <b-modal  v-model="createCartClicked" title="Add to Cart" hide-footer>
              <form v-if="createCartClicked" @submit.prevent="handleSubmitCart(product)">
                <input v-model="newCart_obj.quantity" placeholder="Quantity required" required>
                <button type="submit">Add to cart</button>
              </form>
            </b-modal>
            <b-button class="btn btn-outline-success" @click="BuyNow(product)">Buy Now</b-button>
          </div>
        </div>
        <div>
        <b-button class="btn btn-outline-success" @click="toggleCreate(product)"
          v-if="(!createClicked && managerRole)">Edit</b-button>
        <b-modal v-model="createClicked" title="Edit Product" hide-footer>
          <form v-if="createClicked" @submit.prevent="handleUpdate" class="edit-form">
            <div class="edit-form-container">
              <input v-model="newProduct.name" placeholder="Product Name" required>
              <input v-model="newProduct.price" placeholder="Product Price" required>
              <input v-model="newProduct.unit" placeholder="Product Units" required>
              <input v-model="newProduct.expiry" placeholder="Product Expiry" required>
              <input v-model="newProduct.availability" placeholder="Product Availability" required>
              <button type="submit">Update Category</button>
            </div>
          </form>
        </b-modal>
        <b-button class="btn btn-outline-success" @click="DeleteProduct(product)"
          v-if="managerRole">Delete</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.edit-form-container {
  /* Style the container to create a neat box appearance */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
}

.availability-green {
  color: green;
  /* Change text color to green */
}

.availability-red {
  color: red;
  /* Change text color to red */
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
}

.product-card {
  width: calc(25% - 10px);
  /* Adjust width as needed */
  margin-bottom: 20px;
  position: relative;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
}

.highlight-text {
  color: #007bff;
  /* Adjust color as needed */
}

@media (max-width: 767px) {
  .product-card {
    width: calc(50% - 10px);
    /* Adjust width for smaller screens */
  }
}
</style>
  
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'MyProduct',
  props: ['products'],
  computed: {
    ...mapState(['managerRole']),
    ...mapGetters(['EditProduct', 'DeleteProduct', 'AddToCart', 'BuyNow'])
  },
  data() {
    return {
      viewClicked: false,
      createCartClicked: false,
      createClicked: false,
      // createClicked: false,
      newProduct: {
        id: null,
        name: '',
        price: null,
        unit: '',
        expiry: '',
        availability: null,
        category_id: null
      },
      newCart_obj: {
        user_id: null,
        product_id: null,
        quantity: null
      },
    }
  },
  methods: {
    toggleCreate(product) {
      this.createClicked = true;
      this.newProduct.id = product.id;
      this.newProduct.name = product.name;
      this.newProduct.price = product.price;
      this.newProduct.unit = product.unit;
      this.newProduct.expiry = product.expiry;
      this.newProduct.availability = product.availability;
      this.newProduct.category_id = product.category_id;
      // this.createClicked = true;
    },
    toggleCreateCart() {
      this.createCartClicked = true;
    },
    handleUpdate() {
      this.EditProduct(this.newProduct);
      // this.$router.go;
    },
    handleSubmitCart(product) {
      // this.AddToCart(this.newCart_obj);
      // Reset the modal after submitting to cart
      if(localStorage.getItem("loggedIn") !== "true"){
        this.$router.push("/login")
      }
      else{
        this.newCart_obj.user_id=localStorage.getItem("userID");
        this.newCart_obj.product_id=product.id;
        this.AddToCart(this.newCart_obj);
      }
      this.createCartClicked = false;
    },
  },

  toggleView() {
    this.viewClicked = true;
  },
};
</script>
  