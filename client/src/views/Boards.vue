<template>
  <div class="boards container-fluid bg-lightest-grey font-primary">
    <header class="row">
      <div class="col-4 offset-4 pt-5 pb-3">
        <h5>WELCOME TO THE BOARDS!!!</h5>
      </div>
      <div class="col text-right pt-2">
        <button class="btn bg-dark-text-grey" @click="logout">Logout</button>
      </div>
    </header>
    <main>
      <div class="row boards-row-height">
        <div class="col">
          <div v-for="board in boards" :key="board._id">
            <router-link
              class="pr-1"
              :to="{name: 'board', params: {boardId: board._id}}"
            >{{board.title}}</router-link>
            <button class="btn btn-transparent" @click="deleteBoard(board._id)">
              <i class="fas fa-dumpster"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 text-center pt-5">
          <form class="form-group" @submit.prevent="addBoard">
            <input
              class="form-control mb-1"
              type="text"
              placeholder="title"
              v-model="newBoard.title"
              required
            />
            <input
              class="form-control mb-3"
              type="text"
              placeholder="description"
              v-model="newBoard.description"
            />
            <button class="btn btn-blue text-white" type="submit">Create Board</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
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

.bg-dark-text-grey {
  background-color: #212428;
  color: #d4d7dd;
  border: #212428;
}

.bg-dark-text-grey:hover {
  background-color: #141618;
}

.btn-blue {
  background-color: #3282b8;
}

.btn-blue:hover {
  background-color: #0f4c75;
}

.boards-row-height {
  min-height: 30vh;
}

.fa-dumpster {
  opacity: 0.3;
}

.fa-dumpster:hover {
  opacity: 0.6;
}

.btn-transparent {
  background-color: #f6f6f6;
}
</style>