<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
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
  }
};
</script>

<style>
</style>