<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div class="content">

      <div class="btns-filter">
        <button class="btns" @click="taskClass.setFilter('all')"
          :class="{ 'active-filter': filter === 'all' }">All</button>
        <button class="btns" @click="taskClass.setFilter('active')"
          :class="{ 'active-filter': filter === 'active' }">Active</button>
        <button class="btns" @click="taskClass.setFilter('completed')"
          :class="{ 'active-filter': filter === 'completed' }">Completed</button>
      </div>
      <div class="task-list-content">
        <ul class="task-list">
          <li v-for="(task, index) in taskClass.filteredTasks" :key="index" :class="{ completed: task.completed }">
            <TaskTemplate :functions="{
              toggleTaskCompletion: taskClass.toggleTaskCompletion,
              editTask: taskClass.editTask,
              removeTask: taskClass.removeTask
            }" :variables="{
  task: task,
  index: index,
  tasks: variablesClass.tasks,
  selectedTaskIndex: variablesClass.selectedTaskIndex,
  editedTask: variablesClass.editedTask,
  showEditModal: variablesClass.showEditModal
}">
            </TaskTemplate>
          </li>
        </ul>
      </div>
      <div class="new-task">
        <input class="new-task-input" v-model="variablesClass.newTask.value.description" placeholder="Enter a new task">
        <button class="btn-add-task" @click="taskClass.addTaskWithUser">Add Task</button>
      </div>
    </div>
    <div class="user-authentication">
      <button class="authenticationOpen" @click="userClass.authenticationOpen">Log In</button>
      <div v-if="variablesClass.showUserModal.value">
        <div class="userModal">
          <div class="loginArea" v-show="variablesClass.showSignUp.value">
            <input class="loginInput" v-model="variablesClass.loginUser.login" placeholder="Login">
            <button class="loginAccept" @click="userClass.createUserLogin">AcceptLogin</button>
            <button class="sign-up" @click="userClass.toggleSignUp">Sign Up</button>
          </div>
          <div class="registerArea" v-show="variablesClass.showLogIn.value">
            <input class="registrationInput" v-model="variablesClass.newUser.login" placeholder="Registration">
            <button class="registerAccept" @click="userClass.createUser">acceptRegister</button>
            <button class="log-in" @click="userClass.toggleSignUp">Log In</button>
          </div>
        </div>
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
      variablesClass.selectedTaskIndex,
      variablesClass.editedTask,
      variablesClass.showEditModal,
      variablesClass.tasks,
      variablesClass.newTask,
      variablesClass.user,
      variablesClass.filter
    );
    const userClass = new User(
      variablesClass.loginUser,
      variablesClass.user,
      variablesClass.tasks,
      variablesClass.showUserModal,
      variablesClass.newUser,
      variablesClass.showSignUp,
      variablesClass.showLogIn
    );

    onMounted(() => {
      taskClass.updateTodoList();
    });

    return {
      taskClass,
      userClass,
      variablesClass
    };
  },
};
</script>