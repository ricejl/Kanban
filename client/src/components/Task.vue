<template>
  <div class="task pb-2">
    <div class="card" style="width: 17rem;">
      <div class="card-body color-lightest-grey text-left border-rounded">
        <div>{{taskData.description}}</div>

        <!-- FIXME move create/view comments into dropdown menu with modal to display -->

        <!-- SECTION dropdown for task options -->
        <div class="btn-group dropright position-top-rt">
          <button
            type="button"
            class="btn btn-sm bg-transparent"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only"></span>
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu">
            <span class="pl-2">Move task to...</span>
            <button
              class="dropdown-item"
              type="button"
              v-for="list in lists"
              :key="list.id"
              @click="moveTask(taskData._id, taskData.listId, list.id)"
            >{{list.title}}</button>
            <div class="dropdown-divider"></div>
            <button
              class="dropdown-item pl-2"
              @click="deleteTask(taskData.listId, taskData._id)"
            >Delete task</button>
            <!-- Dropdown menu links -->
            <!-- each of these should be the name of a list with onclick="changeList(taskData._id, taskData.listId)" -->
          </div>
        </div>

        <div class="pl-2" v-for="comment in taskData.comments" :key="comment._id">
          {{ comment.content }}
          <button
            class="border-0 btn-transparent"
            @click="deleteComment(taskData, comment._id)"
          >
            <i class="fas fa-times fa-sm"></i>
          </button>
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

.btn-no-border {
  border: none;
}

.fa-ellipsis-v,
.fa-times {
  opacity: 0.4;
}

.fa-ellipsis-v:hover,
.fa-times:hover {
  opacity: 0.7;
}

.fa-times:hover {
  cursor: pointer;
}

.position-top-rt {
  position: absolute;
  top: 0;
  right: 0;
}
</style>