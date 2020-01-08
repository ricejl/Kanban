<template>
  <div class="container-fluid board board-bg">
    <div class="row pt-3">
      <div class="col text-left">
        <router-link :to="{name: 'boards'}">
          <button title="Back">
            <i class="fas fa-arrow-left"></i>
          </button>
        </router-link>
      </div>
      <div class="col">
        <h3 class="text-white justify-content-center">{{board.title}}</h3>
      </div>
      <div class="col text-left">
        <form class="list-form-style" @submit.prevent="createList">
          <input
            class="form-control"
            type="text"
            name="title"
            id="title"
            v-model="newList.title"
            placeholder="Enter list title"
            required
          />
          <button type="submit">Add list</button>
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

.list-form-style {
  min-width: 18rem;
}

.fa-arrow-left {
  cursor: pointer;
}
</style>
