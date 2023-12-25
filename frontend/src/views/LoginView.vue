<template>
  <div class="container">
    <div class="main">

      <div class="form-container">
        <div v-if="showSignup">
          <b-form autocomplete="off" @submit.prevent="handleSignup">
            <label aria-hidden="true">Sign up</label>
            <input type="email" v-model="user.email" placeholder="Email" required>
            <input type="password" v-model="user.password" placeholder="Password" required>
            <input type="password" v-model="user.confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Sign up</button>
            <p>Already have an account? <a @click="toggleForms">Login</a></p>
          </b-form>
        </div>

        <div v-else>
          <b-form autocomplete="off" @submit.stop.prevent="handleLogin">
            <label aria-hidden="true">Login</label>
            <input type="email" v-model="user.email" placeholder="Email" required>
            <input type="password" v-model="user.password" placeholder="Password" required>
            <button type="submit">Login</button>
            <p>Don't have an account? <a @click="toggleForms">Sign up</a></p>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      showSignup: false,
      user:{
        email:"",
        password:"",
        confirmPassword:"",
      }
    }
  },
  methods: {
    toggleForms() {
      this.showSignup = !this.showSignup;
    },
    handleSignup() {
        fetch(`http://127.0.0.1:8080/api/adduser`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:this.user.email,
                    password:this.user.password
                })
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the JSON response
                })
                .catch(error => { console.error('Fetch error:', error);});
                this.$router.go();
        },

    handleLogin() {
      this.$store.dispatch('loginUser',{email:this.user.email, password:this.user.password})
    },
    }
}

</script>
<style scoped>
:root {
  --green: #27ae60;
  --black: #192a56;
  --light-color: #666;
  --box-shadow: 0 .5rem 1.5rem rgba(0, 0, 0, .1);
}

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
  border: none;
  
  transition: all .2s linear;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  padding: 2rem 7%; /* Increased padding */
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: var(--box-shadow);
  color: white;
  font-size: 2.6rem; /* Increased font size */
}

.container {
  display: flex;
  justify-content: right;
  align-items: center;
  min-height: 100vh; /* Changed height to min-height for better responsiveness */
}

.main {
  background-color: #f0f0f0;
  border-radius: 12px; /* Increased border radius */
  padding: 30px; /* Increased padding */
  box-shadow: var(--box-shadow);
}

.form-container {
  margin-top: 20px; /* Increased margin-top */
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Increased gap */
}

label {
  font-weight: bold;
}

input {
  padding: 12px; /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 8px; /* Increased border radius */
  font-size: 1.8rem; /* Increased font size */
}

button {
  padding: 15px 20px; /* Increased padding */
  font-size: 1.6rem; /* Increased font size */
  background-color: var(--green);
  color: white;
  border: none;
  border-radius: 8px; /* Increased border radius */
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--black);
}

/* Add more styles as needed */

</style>


