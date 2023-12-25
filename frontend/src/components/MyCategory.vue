<!-- MyCategory.vue -->
<template>
  <div>
    <div v-if="categoryData && categoryData.length">
      <div v-for="category in categoryData" :key="category.id" class="card">
        <h2 class="card-header">
          <span class="category-name-highlight">{{ category.name }}</span>
        </h2>
        <b-button class="btn btn-outline-success" @click="toggleCreate(category)"
          v-if="(!createClicked && managerRole)">Edit</b-button>
        <b-modal v-model="createClicked" title="Edit Category" hide-footer>
          <form v-if="createClicked" @submit.prevent="handleUpdate">
            <input v-model="newCategory.name" placeholder="Category Name" required>
            <button type="submit">Update Category</button>
          </form>
        </b-modal>
        <b-button class="btn btn-outline-success" @click="DeleteCategory(category.id)"
          v-if="managerRole">Delete</b-button>
        <div class="card" style="width: 18rem;"></div>
        <div class="card-body">
          <MyProduct :products="category.products" />
        </div>
      </div>
    </div>
    <div v-else>
      <p>No categories available</p>
    </div>
    <!-- <b-button v-if="(!createClicked && managerRole)" @click="toggleCreate">Edit</b-button> -->
    <!-- <b-modal v-model="createClicked" title="Edit Category" hide-footer>
      <form v-if="createClicked" @submit.prevent="handleUpdate">
        <input v-model="newCategory.name" placeholder="Category Name" required>
        <button type="submit">Update Category</button>
      </form>
    </b-modal> -->
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
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'MyCategory',
  data() {
    return {
      createClicked: false,
      newCategory: {
        id: null,
        name: '',
      }
    }
  },
  methods: {
    toggleCreate(category) {
      this.createClicked = true;
      this.newCategory.id = category.id;
      this.newCategory.name = category.name;
      // this.createClicked = true;
    },
    handleUpdate() {
      this.EditCategory(this.newCategory);
      // this.$router.go;
    },
  },
  // props: ['categoryData'],
  components: {
    MyProduct,
  },
  computed: {
    ...mapState(['categoryData', 'managerRole']),
    ...mapGetters(['EditCategory','DeleteCategory'])
  },
};
</script>
  