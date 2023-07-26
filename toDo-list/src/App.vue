<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div>
      <h1 v-if="isLoggedInOrRegistered">Welcome, {{ displayName }}</h1>
      <!-- Display other user properties as needed -->
    </div>
    <div class="content">
      <div class="btns-filter">
        <button class="btns" @click="setFilter('all')" :class="{ 'active-filter': filter === 'all' }">All</button>
        <button class="btns" @click="setFilter('active')"
          :class="{ 'active-filter': filter === 'active' }">Active</button>
        <button class="btns" @click="setFilter('completed')"
          :class="{ 'active-filter': filter === 'completed' }">Completed</button>
      </div>
      <div class="task-list-content">
        <ul class="task-list">
          <li v-for="(task, index) in filteredTasks" :key="index" :class="{ completed: task.completed }">
            <div class="task">
              <span class="task-text" @click="toggleTaskCompletion(index)">{{ task.description }}</span>
              <button class="btn-task" @click="editTask(index)">Edit</button>
              <button class="btn-task" @click="removeTask(index)">Remove</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="new-task">
        <input class="new-task-input" v-model="newTask.description" placeholder="Enter a new task">
        <button class="btn-add-task" @click="addTaskWithUser">Add Task</button>
      </div>
    </div>
    <div class="user-authentication">
      <button class="authenticationOpen" @click="authenticationOpen">Log In</button>
      <div v-if="showUserModal">
        <div class="userModal">
          <input class="login" v-model="loginUser.login" placeholder="Login">
          <input class="registration" v-model="newUser.login" placeholder="Registration">
          <button class="registerAccept" @click="createUser">acceptRegister</button>
          <button class="loginAccept" @click="createLogin">AcceptLogin</button>
          <button class="sign-up">Sign Up</button>
        </div>
      </div>
    </div>
    <div v-if="showEditModal">
      <div class="modal">
        <input class="task-input" v-model="editedTask.text">
        <button class="btn-modal" @click="saveEditedTask">Save</button>
        <button class="btn-modal" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'App',
  setup() {
    const tasks = reactive([]);
    const newTask = ref({ description: '' });
    const filter = ref('all');
    const showEditModal = ref(false);
    const showUserModal = ref(false);
    const editedTask = reactive({});
    const selectedTaskIndex = ref(null);
    const isLoginMode = ref(true); // Set the initial mode to login
    const loginUser = reactive({
      login: '',
    });
    const user = reactive({
      id: '',
      login: '',
      autoLogin: false,
    });
    const newUser = reactive({
      login: '',
      autoLogin: false,
    });
    const displayName = computed(() => {
      return user.login || newUser.login;
    });

    const isLoggedInOrRegistered = computed(() => {
      return user.login !== '' || newUser.login !== '';
    });

    watch([() => user.login, () => newUser.login], () => {
      displayName.value = user.login || newUser.login;
    });

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
    };

    const fetchUser = () => {
      axios.get(`http://192.168.0.101:808/api/users/login/${loginUser.login}`)
        .then(response => {
          const userData = response.data;
          if (userData) {
            user.login = userData.login;
            fetchTasks();
          } else {
            console.error('Invalid login');
          }
        })
        .catch(error => {
          console.error('Error retrieving user:', error);
        });
    };

    const filteredTasks = computed(() => {
      if (filter.value === 'active') {
        return tasks.filter(task => !task.completed);
      } else if (filter.value === 'completed') {
        return tasks.filter(task => task.completed);
      } else {
        return tasks;
      }
    });

    const createLogin = () => {
      if (loginUser.login.trim() === '') {
        return;
      }

      axios.all([
        axios.get('http://192.168.0.101:808/api/tasks'),
        axios.get('http://192.168.0.101:808/api/users')
      ])
        .then(axios.spread((tasksResponse, usersResponse) => {
          const usersArray = usersResponse.data;
          const tasksArray = tasksResponse.data;
          const filteredUsers = usersArray.filter(user => user.login === loginUser.login);
          const filtredTasksArray = tasksArray.filter(task => task.userId === filteredUsers[0].id);

          if (filteredUsers.length > 0) {
            user.id = filteredUsers[0].id;

            tasks.splice(0, tasks.length, ...filtredTasksArray); // Replace tasks with filtered tasks
            showUserModal.value = false;
            loginUser.login = '';

          } else {
            console.error('Invalid login');
          }
        }))
        .catch(error => {
          console.error('Error logging in:', error);
        });
    };


    const addTaskWithUser = () => {
      if (newTask.value.description.trim() === '') {
        return;
      }

      const taskData = {
        Description: newTask.value.description,
        Completed: false,
        UserId: user.id, // Include the user ID in the task object
      };

      axios.post('http://192.168.0.101:808/api/tasks', taskData)
        .then(response => {
          console.log('Task sent successfully');
          tasks.push(response.data);
          // You can optionally handle the response here
        })
        .catch(error => {
          console.error('Error sending task:', error);
        });

      newTask.value.description = ''; // Clear the input field
    };

    const updateTodoList = () => {
      axios.get('http://192.168.0.101:808/api/tasks')
        .then(response => {
          tasks.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    };

    const toggleTaskCompletion = index => {
      tasks[index].completed = !tasks[index].completed;
    };

    const editTask = index => {
      selectedTaskIndex.value = index;
      editedTask.text = tasks[index].description;
      showEditModal.value = true;
    };

    const saveEditedTask = () => {
      if (selectedTaskIndex.value !== null) {
        const index = selectedTaskIndex.value;
        if (index >= 0 && index < tasks.length) {
          const taskId = tasks[index].id;
          const updatedTask = {
            Description: editedTask.text,
            completed: tasks[index].completed,
          };

          axios.put(`http://192.168.0.101:808/api/tasks/${taskId}`, updatedTask)
            .then(response => {
              console.log('Task updated successfully');

              // Update the task in the 'tasks' array with the edited information
              tasks[index].description = editedTask.text;

              showEditModal.value = false;
              selectedTaskIndex.value = null;
            })
            .catch(error => {
              console.error('Error updating task:', error);
            });
        } else {
          console.error('Invalid task index');
        }
      }
    };

    const cancelEdit = () => {
      editedTask.text = '';
      showEditModal.value = false;
      selectedTaskIndex.value = null;
    };

    const acceptUser = () => {
      showUserModal.value = false;
    };

    const authenticationOpen = () => {
      showUserModal.value = !showUserModal.value;
    };

    const removeTask = index => {
      const taskId = tasks.value[index].id;

      axios.delete(`http://192.168.0.101:808/api/tasks/${taskId}`)
        .then(response => {
          console.log('Task removed successfully');
          // Optionally handle the response here
        })
        .catch(error => {
          console.error('Error removing task:', error);
        });

      tasks.splice(index, 1);
    };

    const setFilter = filterValue => {
      filter.value = filterValue;
    };

    const createUser = () => {
      if (newUser.login.trim() === '') {
        return;
      }

      const userData = {
        Login: newUser.login,
        AutoLogin: newUser.autoLogin,
      };

      axios.post('http://192.168.0.101:808/api/users', userData)
        .then(response => {
          console.log('User created successfully');
          // Optionally handle the response here
          newUser.login = '';
          newUser.autoLogin = false;
          showUserModal.value = false;

          // Fetch the user data and update the 'user' object
          axios.get(`http://192.168.0.101:808/api/users/${response.data.id}`)
            .then(response => {
              user.id = response.data.id;
              user.login = response.data.login;
              user.autoLogin = response.data.autoLogin;
            })
            .catch(error => {
              console.error('Error retrieving user:', error);
            });
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
    };

    // Fetch the user data on component mount
    onMounted(() => {
      updateTodoList();
    });

    // Computed property to determine if the user is logged in or registered


    return {
      tasks,
      newTask,
      filter,
      filteredTasks,
      showEditModal,
      showUserModal,
      editedTask,
      toggleTaskCompletion,
      editTask,
      saveEditedTask,
      cancelEdit,
      removeTask,
      setFilter,
      acceptUser,
      authenticationOpen,
      updateTodoList,
      newUser,
      createUser,
      addTaskWithUser,
      user,
      loginUser,
      createLogin,
      isLoggedInOrRegistered, // Add the computed property
      displayName,
      isLoginMode,
      toggleMode,
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
</style>
