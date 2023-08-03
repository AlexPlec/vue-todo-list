<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div class="content">
      <ButtonFilter :componentFunctions="{ functions: taskClass }" :componentVariables="{ variables: variablesClass }">
      </ButtonFilter>
      <TaskListContent :componentFunctions="{ functions: taskClass }" :componentVariables="{ variables: variablesClass }">
      </TaskListContent>
      <NewTask :componentFunctions="{ functions: taskClass }" :componentVariables="{ variables: variablesClass }">
      </NewTask>
    </div>
    <UserAuthentication :componentFunctions="{
      functions: userClass
    }" :componentVariables="{
  variables: variablesClass
}"></UserAuthentication>
    <div v-if="variablesClass.showEditModal.value">
      <TaskModal :componentFunctions="{
        functions: taskClass
      }" :componentVariables="{
  variables: variablesClass
}">
      </TaskModal>

    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Task from './task';
import User from './user';
import Variables from './variables.js';

export default {
  name: 'App',
  setup() {
    const variablesClass = new Variables();
    const taskClass = new Task(
      variablesClass.tasks,
      variablesClass.filter
    );
    const userClass = new User();

    onMounted(() => {
      taskClass.updateTodoList(variablesClass.tasks);
    });

    return {
      taskClass,
      userClass,
      variablesClass
    };
  },
};
</script>