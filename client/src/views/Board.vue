<template>
  <div class="board">
    <div>{{board.title}}</div>
    <!-- <button @click="showForm">New List</button> -->
    <form @submit.prevent="createList">
      <input
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
</template>

<script>
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
  computed: {
    board() {
      return (
        this.$store.state.activeBoard || {
          title: "Loading..."
        }
      );
    }
  },
  lists() {
    return this.$store.state.lists.find(list => list.boardId == this.board.id);
  },
  props: ["boardId"],
  methods: {
    createList() {
      let list = { ...this.newList };
      this.$store.dispatch("createList", list);
      this.newList = {
        title: "",
        boardId: ""
      };
    }
  }
};
</script>
