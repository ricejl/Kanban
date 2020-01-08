<template>
  <div class="task">
    <div class="card" style="width: 15rem;">
      <div class="card-body">
        <div>{{taskData.description}}</div>
        <div v-if="comments">{{taskData.comments}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"]
};
</script>

<style>
</style>