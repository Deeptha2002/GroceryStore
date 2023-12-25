<!-- MyCategory.vue -->
<template>
    <div>
      <div v-if="categoryData && categoryData.length">
        <div v-for="category in categoryData" :key="category.id" class="card">
          <h4 class="card-header">
            <span class="category-name-highlight">{{ category.name }}</span>
          </h4>
          <div class="card" style="width: 18rem;"></div>
          <div class="card-body">
            <!-- Include MyProduct component to handle products -->
            <MyProduct :products="category.products" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>No categories available</p>
      </div>
    </div>
  </template>

<style scoped>

.category-name-highlight {
  font-weight: bold;
  color: #00f; 
}
</style>
  
  <script>
  import MyProduct from './MyProduct.vue';
  
  export default {
    name: 'MyCategory',
    props: ['categoryData'],
    components: {
      MyProduct,
    },
  };
  </script>
  