<template>
  <div class="container-fluid board board-bg font-neucha">
    <header class="row pt-3 bg-glass">
      <div class="col-4 text-left">
        <router-link :to="{name: 'boards'}">
          <button class="btn bg-dark-text-grey" title="Back">
            <i class="fas fa-arrow-left bg-dark-text-grey pr-1"></i>
            <span>All Boards</span>
          </button>
        </router-link>
      </div>
      <div class="col-4">
        <h3 class="text-grey justify-content-center" id="font-elite">Kanban</h3>
      </div>
      <div class="col-4"></div>
    </header>
    <main>
      <div class="row pt-2 pl-2 pr-2">
        <div class="col-4">
          <h5 class="text-grey text-left font-neucha">{{board.title}}</h5>
        </div>
        <div class="col-4 offset-4 text-left">
          <form class="list-form-style input-group" @submit.prevent="createList">
            <input
              class="form-control bg-dark-text-grey"
              type="text"
              name="title"
              id="title"
              v-model="newList.title"
              placeholder="New list title..."
              required
            />
            <div class="input-group-append">
              <button class="btn bg-dark-text-grey" type="submit">
                <i class="fas fa-plus fa-sm"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <list
            class="d-inline-flex direction-row p-1"
            v-for="list in lists"
            :key="list.id"
            :listData="list"
          ></list>
        </div>
      </div>
    </main>
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
  overflow: auto;
  white-space: nowrap;
}

.bg-glass {
  background-color: rgba(0, 0, 0, 0.4);
  min-height: 12vh;
}

.bg-dark-text-grey {
  background-color: #212428;
  color: #d4d7dd;
  border: #212428;
}

.bg-dark-text-grey:hover {
  background-color: #141618;
}

#font-elite {
  font-family: "Special Elite", cursive;
}

.font-neucha {
  font-family: "Neucha", cursive;
}

.text-grey {
  color: #d4d7dd;
}
/* .btn-border-custom {
  border-top: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
} */

.list-form-style {
  min-width: 18rem;
}

.fa-arrow-left {
  cursor: pointer;
}
</style>
