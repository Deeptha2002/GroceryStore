<template>
  <div>
    <b-nav tabs class="bg-custom-light" align="center">
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item to="/venues">Categories</b-nav-item>
      <b-nav-item to="/shows">Products</b-nav-item>
      <!-- <b-nav-item @click="logout" v-if="loggedIn">Log Out</b-nav-item> -->
      <!-- <b-nav-item to="/logon" v-else>Log In</b-nav-item> -->
      <!-- <b-nav-form>
          <b-form-input size="sm" v-model="search" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" @click="performSearch">Search</b-button>
      </b-nav-form>
      <b-nav-item @click="export_data" v-if="adminRole">Export</b-nav-item> -->
    </b-nav>
  </div>
</template>

<script>
// import { excelParser } from "../excel-parser";
// import {mapState,mapMutations} from 'vuex';
export default {
  name: 'MyHeader'
  // data() {
  //   return {
  //     search: '',
  //   }
  // },
//   computed: {
//     ...mapState(['loggedIn','venueData','adminRole']),
//     search: {
//       get() {
//         return this.$store.getters.search;
//       },
//       set(value) {
//         this.setSearch(value); // Update the Vuex state
//       },
//     },
//   },
//   methods: {
//     logon() {
//       this.$store.dispatch('loginUser')
//     },
//     logout() {
//       this.$store.dispatch('logoutUser')
//     },
//     export_data() {
//       excelParser().exportDataFromJSON(this.venueData, "data", 'csv');
//     },
//     ...mapMutations(['setSearch']),
//     performSearch() {
//       this.$store.dispatch('setSearch', this.search);
//     },
//   },
}
</script>

<style scoped>
.bg-custom-light {
  background-color: #f0f0f0; 
  padding: 20px 0; 
}

.nav-link {
  color: #333;
  font-size: 18px; 
}
</style>
