<template>
  <div class="task pb-2">
    <div class="card" style="width: 17rem;">
      <div class="card-body color-lightest-grey text-left border-rounded">
        <div>{{taskData.description}}</div>
        <!-- SECTION dropdown to move task to different list -->
        <i class="fas fa-list-ul"></i>
        <!-- FIXME move delete and switch list functions into single dropdown under fa-list-ul and move create comment into dropdown menu with modal to display form -->
        <div class="btn-group dropright">
          <button
            type="button"
            class="btn btn-sm"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-v"></i>
            <span class="sr-only"></span>
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
            class="form-control"
            type="text"
            placeholder="New comment..."
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
.color-lightest-grey {
  background-color: #f6f6f6;
}

.border-rounded {
  border-radius: 0.25rem;
}
/* .sr-only::after {
  border-left: none;
  display: none;
} */
</style>