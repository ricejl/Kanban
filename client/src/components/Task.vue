<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
        <button @click="deleteTask(taskData.listId, taskData._id)">X</button>
        <div v-if="comments">{{taskData.comments}}</div>
        <form @submit.prevent="createComment(taskData._id)">
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
    createComment(taskId) {
      let comment = { ...this.newComment };
      this.$store.dispatch("createComment", { taskId, comment });
      this.newComment = {
        content: ""
      };
    }
  }
};
</script>

<style>
</style>