<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <h1><b>Grocery Store</b></h1>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <form class="d-flex ms-auto" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img src="https://p7.hiclipart.com/preview/1022/170/393/users-group-computer-icons-clip-art-user-cliparts.jpg"
                                    alt="Bootstrap" width="50" height="35">
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="loggedIn"> <a class="dropdown-item" @click="logout"> Log Out</a></li> 
                                <li  v-else><a href="/login">Log In</a></li>
                                <!-- <li><a class="dropdown-item" href="/login"> User Login</a></li> -->
                                <!-- <li><a class="dropdown-item" href="/login"> Manager Login</a></li> -->
                                <!-- <li><a class="dropdown-item" href="/login"> Admin Login</a></li> -->
                                
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'MyHeader',

    computed: {
    ...mapState(['managerRole','loggedIn'])
    },

    methods: {
    login() {
      this.$store.dispatch('loginUser')
    },
    logout() {
      this.$store.dispatch('logoutUser')
    }
}
}
</script>