<template>
  <div class="list">
    <div class="card" style="width: 18rem;">
      <i class="fas fa-times" @click="deleteList(listData.boardId, listData.id)"></i>
      <div class="card-body color-light-grey p-2">
        <h5 class="card-title text-left pl-1">{{listData.title}}</h5>
        <task v-for="task in tasks" :key="task.id" :taskData="task"></task>

        <form @submit.prevent="createTask()">
          <input
            type="text"
            name="task"
            v-model="newTask.description"
            placeholder="Enter new task..."
            required
          />
          <button type="submit">Add task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task";

export default {
  name: "List",
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },
  data() {
    return {
      newTask: {
        description: "",
        boardId: this.listData.boardId,
        listId: this.listData.id
      }
    };
  },
  props: ["listData"],
  components: {
    Task
  },
  methods: {
    createTask() {
      let task = { ...this.newTask };
      this.$store.dispatch("createTask", task);
      this.newTask = {
        description: "",
        boardId: this.listData.boardId,
        listId: this.listData.id
      };
    },
    deleteList(boardId, listId) {
      this.$store.dispatch("deleteList", { boardId, listId });
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id] || [];
    }
  }
};
</script>

<style scoped>
.fa-times {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
}

.color-light-grey {
  background-color: #eae9e9;
}
</style>
