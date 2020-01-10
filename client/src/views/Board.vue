<template>
  <div class="container-fluid board board-bg">
    <div class="row pt-3 bg-glass">
      <div class="col text-left">
        <router-link :to="{name: 'boards'}">
          <button class="btn btn-light" title="Back">
            <i class="fas fa-arrow-left"></i> Back to Boards
          </button>
        </router-link>
      </div>
      <div class="col">
        <h3 class="text-white justify-content-center">{{board.title}}</h3>
      </div>
      <div class="col text-left">
        <form class="list-form-style input-group" @submit.prevent="createList">
          <input
            class="form-control"
            type="text"
            name="title"
            id="title"
            v-model="newList.title"
            placeholder="Enter list title"
            required
          />
          <div class="input-group-append">
            <button class="btn btn-light btn-border-custom" type="submit">
              <i class="fas fa-plus fa-sm"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- <button @click="showForm">New List</button> -->
    <list
      class="d-inline-flex direction-row p-1"
      v-for="list in lists"
      :key="list.id"
      :listData="list"
    ></list>
  </div>
</template>

<script>
import List from "@/components/List";

export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  data() {
    return {
      newList: {
        title: "",
        boardId: this.$route.params.boardId
      }
    };
  },
  components: {
    List
  },
  computed: {
    board() {
      return (
        this.$store.state.activeBoard || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  props: ["boardId"],
  methods: {
    createList() {
      let list = { ...this.newList };
      this.$store.dispatch("createList", list);
      this.newList = {
        title: "",
        boardId: this.$route.params.boardId
      };
    }
  }
};
</script>
<style scoped>
.board-bg {
  background-image: url("https://images.unsplash.com/photo-1515110451948-d0e40f101d05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  min-width: 100vh;
}

.bg-glass {
  background-color: rgba(0, 0, 0, 0.4);
  min-height: 12vh;
}

.btn-border-custom {
  border-top: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
}

.list-form-style {
  min-width: 18rem;
}

.fa-arrow-left {
  cursor: pointer;
}
</style>
