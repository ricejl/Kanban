<template>
  <div class="container-fluid board board-bg font-primary">
    <header class="row pt-3 bg-glass">
      <div class="col-4 text-left">
        <router-link :to="{name: 'boards'}">
          <button class="btn bg-dark-text-grey" title="Back">
            <i class="fas fa-arrow-left bg-dark-text-grey pr-1"></i>
            <span>All Boards</span>
          </button>
        </router-link>
      </div>
      <div class="col-4 pt-2">
        <h3 class="text-lightest-grey justify-content-center" id="font-logo">Kanban</h3>
      </div>
      <div class="col-4"></div>
    </header>
    <main>
      <div class="row pt-2 pl-2 pr-1">
        <div class="col-4">
          <h5 class="text-lightest-grey text-left">{{board.title}}</h5>
        </div>
        <div class="col-4 offset-4 text-left pr-2">
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
      <div class="row lists">
        <div class="col pl-0">
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

.bg-dark-text-lightest-grey:hover {
  background-color: #141618;
}

#font-logo {
  font-family: "Special Elite", cursive;
}

.font-primary {
  font-family: "Neucha", cursive;
}

.text-lightest-grey {
  color: #f6f6f6;
}

.list-form-style {
  min-width: 18rem;
}

.fa-arrow-left {
  cursor: pointer;
}

.lists {
  overflow: auto;
  white-space: nowrap;
  min-height: 80vh;
}

.lists::-webkit-scrollbar {
  height: 10px;
  background-color: transparent;
}

.lists::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}
</style>
