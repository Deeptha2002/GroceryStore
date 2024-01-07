<template>
  <div>
    <div>
    <MyHeader />
    <!-- <MyCategory :categoryData="categoryData" /> -->
    </div>
    <div>
    <b-button v-if="(!createClicked && managerRole)" @click="toggleCreate">Create</b-button>
    <b-modal v-model="createClicked" title="Create New Show" hide-footer>
      <form @submit.prevent="handleSubmit">
        <input v-model="newCategory.name" placeholder="Category name" required>
        <button type="submit">Create Category</button>
      </form>
    </b-modal>
  </div>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
// import MyCategory from '@/components/MyCategory.vue';

import { mapState,mapGetters } from 'vuex';
export default {
    name: 'ManagerView',
    data() {
        return {
            createClicked: false,
            newCategory: {
                name: '',
                products: ''
            }
        };
    },
    methods: {
        toggleCreate() {
            this.createClicked = true;
        },
        handleSubmit() {
            this.AddCategory(this.newCategory);
            this.$router.go;
        },
    },
    computed: {
        ...mapState(['categoryData', 'managerRole']),
        ...mapGetters(['AddCategory']),
    },
    components: {
      MyHeader,
      // MyCategory,
    },
}
</script>