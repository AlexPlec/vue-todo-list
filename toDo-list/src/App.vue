<template>
  <div class="dashboard">
    <h1 class="title">ToDo List</h1>
    <div class="content">
      <div class="btns-filter">
        <button class="btns" @click="setFilter('all')" :class="{ 'active-filter': filter === 'all' }">All</button>
        <button class="btns" @click="setFilter('active')" :class="{ 'active-filter': filter === 'active' }">Active</button>
        <button class="btns" @click="setFilter('completed')" :class="{ 'active-filter': filter === 'completed' }">Completed</button>
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
        <input class="new-task-input" v-model="newTask" placeholder="Enter a new task">
        <button class="btn-add-task" @click="addTask">Add Task</button>
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
import { ref, computed, reactive,onMounted  } from 'vue';
import axios from 'axios';


export default {
  name: 'App',
  setup() {
    const tasks = reactive([]); // Update ref to reactive
    const newTask = ref('');
    const filter = ref('all');
    const showEditModal = ref(false);
    const editedTask = reactive({});
    const selectedTaskIndex = ref(null);

      // Fetch tasks from the server
      const fetchTasks = () => {
  axios.get('http://localhost:5204/api/tasks')
    .then(response => {
      tasks.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
};


      // Call the fetchTasks function on component mount
      onMounted(fetchTasks);

    const filteredTasks = computed(() => {
      if (filter.value === 'active') {
        return tasks.value.filter(task => !task.completed);
      } else if (filter.value === 'completed') {
        return tasks.value.filter(task => task.completed);
      } else {
        return tasks.value;
      }
    });

    const addTask = () => {

  if (newTask.value && newTask.value.trim() !== '') {
    const taskData = {
      Description: newTask.value,
      completed: false
    };
    axios.post('http://localhost:5204/api/tasks', taskData)

      .then(response => {
        console.log('Task sent successfully');
        fetchTasks();
        // You can optionally handle the response here
      })
      .catch(error => {
        console.error('Error sending task:', error);
      });

    newTask.value = '';

  }
};

const updateTodoList = () => {
  axios.get('http://localhost:5204/api/tasks')
    .then(response => {

      tasks.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
};

    const toggleTaskCompletion = index => {
      tasks.value[index].completed = !tasks.value[index].completed;
    };

    const editTask = index => {
      selectedTaskIndex.value = index;
      editedTask.text = tasks.value[index].Description;
      showEditModal.value = true;
    };

    const saveEditedTask = () => {
  if (selectedTaskIndex.value !== null) {
    const taskId = tasks.value[selectedTaskIndex.value].id;
    const updatedTask = {
      Description: editedTask.text,
      completed: tasks.value[selectedTaskIndex.value].completed,
    };

    axios.put(`http://localhost:5204/api/tasks/${taskId}`, updatedTask)
      .then(response => {
        console.log('Task updated successfully');
        fetchTasks(); // Update the todo list after editing the task
        // You can optionally handle the response here
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });

    showEditModal.value = false;
    selectedTaskIndex.value = null;
  }
};

    const cancelEdit = () => {
      editedTask.text = '';
      showEditModal.value = false;
      selectedTaskIndex.value = null;
    };

    const removeTask = index => {
  const taskId = tasks.value[index].id;

  axios.delete(`http://localhost:5204/api/tasks/${taskId}`)
    .then(response => {
      console.log('Task removed successfully');
      // Optionally handle the response here
    })
    .catch(error => {
      console.error('Error removing task:', error);
    });

  tasks.value.splice(index, 1);
};

    const setFilter = filterValue => {
      filter.value = filterValue;
    };

    return {
      tasks,
      newTask,
      filter,
      filteredTasks,
      showEditModal,
      editedTask,
      addTask,
      toggleTaskCompletion,
      editTask,
      saveEditedTask,
      cancelEdit,
      removeTask,
      setFilter
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
  margin-top: 10px; /* Add margin to separate from the task list content */
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
  border-radius: 10px; /* Add border-radius for rounded corners */
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

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.btn-add-task {
  margin-left: 10px;
  border-radius: 10px; /* Add border-radius for rounded corners */
}

.btn-task {
  margin-left: 10px;
  border-radius: 10px; /* Add border-radius for rounded corners */
}
.btn-modal {
  margin-left: 10px;
  border-radius: 10px; /* Add border-radius for rounded corners */
}

.btns {
  flex: 1; /* Make the buttons occupy equal space */
  margin: 0 5px; /* Add some horizontal margin for gaps */
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
  width: 100px; /* Set a fixed width for the task elements */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: #17B978;
  border-radius: 10px; /* Add border-radius for rounded corners */
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

.task-list-content {
  background-color: #555;
  border-radius: 10px;
  flex-grow: 1; /* Take up remaining vertical space */
  align-items: flex-start; /* Align content to the top */
  overflow-y: auto;
  border-style: solid;
  border-color: black;
  border-width: 2px;
}

.task-list {
  padding-left: 0;
  max-height: 70px; /* Adjust the height as needed */
  min-height: 70px;
  overflow-y: scroll;
}

.task-list::-webkit-scrollbar {
  width: 10px; /* Set the width of the scrollbar */
}

.task-list::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Set the background color of the scrollbar track */
  border-radius: 5px;
}

.task-list::-webkit-scrollbar-thumb {
  background-color: #888; /* Set the color of the scrollbar thumb */
  border-radius: 5px; /* Set the border-radius of the scrollbar thumb */
}

.task-list::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Set the color of the scrollbar thumb on hover */
}

</style>
