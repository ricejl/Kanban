<template>
  <div class="login container-fluid bg-lightest-grey font-primary">
    <header class="row pt-5 pb-4">
      <div class="col pt-5">
        <h3 id="font-logo">Kanban</h3>
      </div>
    </header>
    <main class="row">
      <div class="col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 text-center">
        <form class="form-group" v-if="loginForm" @submit.prevent="loginUser">
          <input class="form-control mb-1" type="email" v-model="creds.email" placeholder="email" />
          <input
            class="form-control mb-3"
            type="password"
            v-model="creds.password"
            placeholder="password"
          />
          <button class="btn btn-blue text-white" type="submit">Login</button>
        </form>
        <form class="form-group" v-else @submit.prevent="register">
          <input class="form-control mb-1" type="text" v-model="newUser.name" placeholder="name" />
          <input class="form-control mb-1" type="email" v-model="newUser.email" placeholder="email" />
          <input
            class="form-control mb-3"
            type="password"
            v-model="newUser.password"
            placeholder="password"
          />
          <button class="btn btn-warning" type="submit">Create Account</button>
        </form>
        <div class="action pt-2" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to register.</p>
          <p v-else>Already have an account? Click here to login.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.bg-lightest-grey {
  background-color: #f6f6f6;
  min-height: 100vh;
}

.font-primary {
  font-family: "Neucha", cursive;
}

.action {
  cursor: pointer;
}

#font-logo {
  font-family: "Special Elite", cursive;
}

.btn-blue {
  background-color: #3282b8;
}

.btn-blue:hover {
  background-color: #0f4c75;
}
</style>