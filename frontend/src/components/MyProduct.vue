<!-- MyProduct.vue -->
<template>
    <div>
      <div class="product-container">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="card">
            <h3 class="card-title highlight-text"><b>{{ product.name }}</b></h3>
            <h6 class="card-subtitle mb-2 text-body-secondary">Rs.{{ product.price }} per {{ product.unit }}</h6>
            <!-- <p class="card-text">Price: {{ product.price }}</p> -->
            <p class="card-text">Expiry: {{ product.expiry }}</p>
            <!-- <p v-if="product.availability>0" > Available {{ product.availability }}{{ product.unit }}s</p> -->
            <!-- <p v-else>Unavailable</p> -->
            <p :class="{ 'availability-green': product.availability > 0, 'availability-red': product.availability === 0 }">
            {{ product.availability > 0 ? 'Available ' + product.availability + product.unit + 's' : 'Unavailable' }}
          </p>
            <div class="card-buttons">
              <a href="#" class="card-link">Buy</a>
              <a href="#" class="card-link">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>

.availability-green {
  color: green; /* Change text color to green */
}

.availability-red {
  color: red; /* Change text color to red */
}
  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .product-card {
    width: calc(25% - 10px); /* Adjust width as needed */
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
    color: #007bff; /* Adjust color as needed */
  }
  
  
  .card-link {
    margin-left: 10px;
    text-decoration: none;
    color: #007bff; /* Adjust color as needed */
  }
  
  @media (max-width: 767px) {
    .product-card {
      width: calc(50% - 10px); /* Adjust width for smaller screens */
    }
  }
  </style>
  
  <script>
  export default {
    name: 'MyProduct',
    props: ['products'],
  };
  </script>
  