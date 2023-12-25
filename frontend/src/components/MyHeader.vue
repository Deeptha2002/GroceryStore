<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Grocery Store</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
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
                                <li class="dropdown-item" @click="logout" v-if="loggedIn"> Log Out</li>
                                <li to="/login" v-else>Log In</li>
                                <li><a class="dropdown-item" href="/login">Manager Login</a></li>
                                <li><a class="dropdown-item" href="/login">Admin Login</a></li>
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
    ...mapState(['loggedIn'])
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