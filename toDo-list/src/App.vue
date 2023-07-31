<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div class="content">
      <ButtonFilter :functions="{ setFilter: taskClass.setFilter }" :variables="{
        filter: variablesClass.filter
      }"></ButtonFilter>
      <TaskListContent :functions="{
        filteredTasks: taskClass.filteredTasks,
        toggleTaskCompletion: taskClass.toggleTaskCompletion,
        editTask: taskClass.editTask,
        removeTask: taskClass.removeTask
      }" :variables="{
  tasks: variablesClass.tasks,
  selectedTaskIndex: variablesClass.selectedTaskIndex,
  editedTask: variablesClass.editedTask,
  showEditModal: variablesClass.showEditModal

}"></TaskListContent>
      <div class="new-task">
        <Input v-model="variablesClass.newTask.value.description" :variables="{
          description: variablesClass.newTask.value.description,
          text: 'Enter a new task'
        }" />
        <Button :function="taskClass.addTaskWithUser" :variables="{
          newTask: variablesClass.newTask,
          user: variablesClass.user,
          tasks: variablesClass.tasks
        }">Add Task</Button>
      </div>
    </div>
    <div class="user-authentication">
      <Button :function="userClass.authenticationOpen" :variables="{
        showUserModal: variablesClass.showUserModal
      }">Log In</Button>
      <div v-if="variablesClass.showUserModal.value">
        <UserModal :functions="{
          createUserLogin: userClass.createUserLogin,
          toggleSignUp: userClass.toggleSignUp,
          createUser: userClass.createUser
        }" :variables="{
  loginUser: variablesClass.loginUser,
  user: variablesClass.user,
  tasks: variablesClass.tasks,
  showUserModal: variablesClass.showUserModal,
  showSignUp: variablesClass.showSignUp,
  showLogIn: variablesClass.showLogIn,
  newUser: variablesClass.newUser

}"></UserModal>
      </div>
    </div>
    <div v-if="variablesClass.showEditModal.value">
      <TaskModal :functions="{
        saveEditedTask: taskClass.saveEditedTask,
        cancelEditTask: taskClass.cancelEditTask
      }" :variables="{
  editedTask: variablesClass.editedTask,
  showEditModal: variablesClass.showEditModal,
  selectedTaskIndex: variablesClass.selectedTaskIndex,
  tasks: variablesClass.tasks
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