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
            <div class="task">
              <span class="task-text" @click="taskClass.toggleTaskCompletion(index)">{{ task.description }}</span>
              <button class="btn-task" @click="taskClass.editTask(index)">Edit</button>
              <button class="btn-task" @click="taskClass.removeTask(index)">Remove</button>
            </div>
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
      <div class="modal">
        <input class="task-input" v-model="variablesClass.editedTask.text">
        <button class="btn-modal" @click="taskClass.saveEditedTask">Save</button>
        <button class="btn-modal" @click="taskClass.cancelEditTask">Cancel</button>
      </div>
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
      variablesClass,
    };
  },
};
</script>


<style>
body {
  background: linear-gradient(#086972, #17B978);
  margin: 0;
  height: 100vh;
}

.title {
  padding: 20px;
  color: #071A52;
  text-align: center;
  margin: 0;
}

.content {
  background-color: #086972;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  zoom: 200%;
}

.new-task {
  background-color: rgb(117, 124, 117);
  border-radius: 10px;
  margin-top: 10px;
  /* Add margin to separate from the task list content */
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

.new-task-input {
  border-radius: 10px;
  border-width: 4px;
  border-color: black;
}

.task-input {
  border-radius: 10px;
  /* Add border-radius for rounded corners */
}

.completed {
  text-decoration: line-through;
}

.active-filter {
  font-weight: bold;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.userModal {
  position: fixed;
  width: 300px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.btn-add-task {
  margin-left: 10px;
  border-radius: 10px;
  /* Add border-radius for rounded corners */
}

.btn-task {
  margin-left: 10px;
  border-radius: 10px;
  /* Add border-radius for rounded corners */
}

.btn-modal {
  margin-left: 10px;
  border-radius: 10px;
  /* Add border-radius for rounded corners */
}

.btns {
  flex: 1;
  /* Make the buttons occupy equal space */
  margin: 0 5px;
  /* Add some horizontal margin for gaps */
  border-radius: 10px;
}

.btns-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: grey;
  order: -1;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  flex: 1;
}

.task-text {
  display: inline-block;
  width: 100px;
  /* Set a fixed width for the task elements */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: #17B978;
  border-radius: 10px;
  /* Add border-radius for rounded corners */
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

.task-list-content {
  background-color: #555;
  border-radius: 10px;
  flex-grow: 1;
  /* Take up remaining vertical space */
  align-items: flex-start;
  /* Align content to the top */
  overflow-y: auto;
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

.task-list {
  padding-left: 0;
  max-height: 70px;
  /* Adjust the height as needed */
  min-height: 70px;
  overflow-y: scroll;
}

.task-list::-webkit-scrollbar {
  width: 10px;
  /* Set the width of the scrollbar */
}

.task-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* Set the background color of the scrollbar track */
  border-radius: 5px;
}

.task-list::-webkit-scrollbar-thumb {
  background-color: #888;
  /* Set the color of the scrollbar thumb */
  border-radius: 5px;
  /* Set the border-radius of the scrollbar thumb */
}

.task-list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
  /* Set the color of the scrollbar thumb on hover */
}

.user-authentication {
  position: absolute;
  top: 10px;
  right: 10px;
}

.sign-up {
  position: absolute;
  left: 40%;
  bottom: 5%;
}

.login {
  position: absolute;
  bottom: 25%;
}

.loginAccept {
  position: absolute;
  left: 40%;
  bottom: 15%;
}

.log-in {
  position: absolute;
  left: 40%;
  bottom: 5%;
}

.registration {
  position: absolute;
  bottom: 25%;
}

.registerAccept {
  position: absolute;
  left: 40%;
  bottom: 15%;
}
</style>