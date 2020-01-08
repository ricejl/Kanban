<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
        <button @click="deleteTask(taskData.listId, taskData._id)">X</button>
        <div v-if="comments">{{taskData.comments}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  methods: {
    deleteTask(listId, taskId) {
      this.$store.dispatch("deleteTask", { listId, taskId });
    }
  }
};
</script>

<style>
</style>