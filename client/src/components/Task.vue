<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
        <button @click="deleteTask(taskData.listId, taskData._id)">X</button>
        <div v-if="taskData.comments.length">
          {{taskData.comments}}
          <button @click="deleteComment(taskData)">X</button>
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
    deleteComment(payload) {
      this.$store.dispatch("deleteComment", payload);
    }
  }
};
</script>

<style>
</style>