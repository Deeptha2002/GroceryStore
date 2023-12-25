<!-- UserHomeView.vue -->
<template>
    <div>
      <MyHeader />
      <MyCategory :categoryData="categoryData" />
    </div>
  </template>
  
  <script>
  import MyHeader from '@/components/MyHeader.vue';
  import MyCategory from '@/components/MyCategory.vue';
  
  export default {
    name: 'UserHomeView',
    computed: {
      categoryData() {
        return this.$store.state.categoryData || [];
      },
    },
    mounted() {
      this.$store.dispatch('fetchProductsData');
    },
    components: {
      MyHeader,
      MyCategory,
    },
  };
  </script>
  