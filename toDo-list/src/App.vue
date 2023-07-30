<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div class="content">
      <div class="btns-filter">
        <Button :function="taskClass.setFilter" :variables="{
          filter: variablesClass.filter,
          filterValue: 'all'
        }">All</Button>
        <Button :function="taskClass.setFilter" :variables="{
          filter: variablesClass.filter,
          filterValue: 'active'
        }">Active</Button>
        <Button :function="taskClass.setFilter" :variables="{
          filter: variablesClass.filter,
          filterValue: 'completed'
        }">Completed</Button>
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
      variablesClass.selectedTaskIndex,
      variablesClass.editedTask,
      variablesClass.showEditModal,
      variablesClass.tasks,
      variablesClass.newTask,
      variablesClass.user,
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