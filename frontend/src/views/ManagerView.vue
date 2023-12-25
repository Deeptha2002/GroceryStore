<template>
  <div>
    <b-button v-if="(!createClicked && managerRole)" @click="toggleCreate">Create</b-button>
    <b-modal v-model="createClicked" title="Create New Show" hide-footer>
      <form @submit.prevent="handleSubmit">
        <input v-model="newCategory.name" placeholder="Category name" required>
        <button type="submit">Create Category</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
// import MyHeader from '@/components/MyHeader.vue';
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
}
</script>