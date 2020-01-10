<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
        <!-- SECTION dropdown to move task to different list -->
        <div class="btn-group dropright">
          <button
            type="button"
            class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle Dropright</span>
          </button>
          <div class="dropdown-menu">
            Move to:
            <button
              class="dropdown-item"
              type="button"
              v-for="list in lists"
              :key="list.id"
              @click="moveTask(taskData._id, taskData.listId, list.id)"
            >{{list.title}}</button>

            <!-- Dropdown menu links -->
            <!-- each of these should be the name of a list with onclick="changeList(taskData._id, taskData.listId)" -->
          </div>
        </div>
        <button @click="deleteTask(taskData.listId, taskData._id)">X</button>
        <!-- <div v-if="taskData.comments.length">{{taskData.comments}}</div> -->
        <div v-for="comment in taskData.comments" :key="comment._id">
          {{ comment.content }}
          <button @click="deleteComment(taskData, comment._id)">X</button>
        </div>

        <form @submit.prevent="createComment(taskData._id, taskData.listId)">
          <input
            type="text"
            placeholder="Enter comment..."
            name="comment-content"
            v-model="newComment.content"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      newComment: {
        content: ""
      }
    };
  },
  props: ["taskData"],
  methods: {
    moveTask(taskId, listIdFrom, listIdTo) {
      this.$store.dispatch("moveTask", { taskId, listIdFrom, listIdTo });
    },
    deleteTask(listId, taskId) {
      this.$store.dispatch("deleteTask", { listId, taskId });
    },
    createComment(taskId, listId) {
      let comment = { ...this.newComment };
      this.$store.dispatch("createComment", { taskId, listId, comment });
      this.newComment = {
        content: ""
      };
    },
    deleteComment(taskData, commentId) {
      this.$store.dispatch("deleteComment", { taskData, commentId });
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists.filter(
        list => list.boardId == this.taskData.boardId
      );
    }
  }
};
</script>

<style>
</style>