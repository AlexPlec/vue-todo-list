<template>
  <div class="new-task">
    <Input v-model="componentVariables.variables.newTask.value.description" :variables="{
      description: componentVariables.variables.newTask.value.description,
      text: 'Enter a new task'
    }" />
    <Button :function="componentFunctions.functions.addTaskWithUser" :componentVariables="{
      variables: componentVariables.variables
    }">Add Task</Button>
  </div>
</template>

<script>
export default {
  name: "NewTask",
  props: {
    componentFunctions: {
      type: Object,
      required: true
    },
    componentVariables: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.input, .button {
  width: 100%;
}
.new-task {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>