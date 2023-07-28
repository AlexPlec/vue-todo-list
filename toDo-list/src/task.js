import axios from 'axios';

class Task {
    constructor(
        selectedTaskIndex,
        editedTask,
        showEditModal,
        tasks,
        newTask,
        user,
        filter
    ) {
        this.selectedTaskIndex = selectedTaskIndex;
        this.editedTask = editedTask;
        this.showEditModal = showEditModal;
        this.tasks = tasks;
        this.newTask = newTask;
        this.user = user;
        this.filter = filter;
    }

    editTask(index) {
        this.selectedTaskIndex.value = index;
        this.editedTask.text = this.tasks[index].description;
        this.showEditModal.value = true;
    }

    toggleTaskCompletion(index, tasks) {
        // this.tasks[index].completed = !this.tasks[index].completed;
        tasks[index].completed = !tasks[index].completed;
    }

    removeTask(index) {
        const taskId = this.tasks.value[index].id;

        axios
            .delete(`http://192.168.0.101:808/api/tasks/${taskId}`)
            .then((response) => {
                console.log('Task removed successfully');
            })
            .catch((error) => {
                console.error('Error removing task:', error);
            });

        this.tasks.splice(index, 1);
    }

    cancelEditTask() {
        this.editedTask.text = '';
        this.showEditModal.value = false;
        this.selectedTaskIndex.value = null;
    }

    saveEditedTask() {
        if (this.selectedTaskIndex.value !== null) {
            const index = this.selectedTaskIndex.value;
            if (index >= 0 && index < this.tasks.length) {
                const taskId = this.tasks[index].id;
                const updatedTask = {
                    Description: this.editedTask.text,
                    completed: this.tasks[index].completed,
                };

                axios
                    .put(
                        `http://192.168.0.101:808/api/tasks/${taskId}`,
                        updatedTask
                    )
                    .then((response) => {
                        console.log('Task updated successfully');

                        // Update the task in the 'tasks' array with the edited information
                        this.tasks[index].description = this.editedTask.text;

                        this.showEditModal.value = false;
                        this.selectedTaskIndex.value = null;
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            } else {
                console.error('Invalid task index');
            }
        }
    }

    addTaskWithUser() {
        if (this.newTask.value.description.trim() === '') {
            return;
        }

        const taskData = {
            Description: this.newTask.value.description,
            Completed: false,
            UserId: this.user.id, // Include the user ID in the task object
        };

        axios
            .post('http://192.168.0.101:808/api/tasks', taskData)
            .then((response) => {
                console.log('Task sent successfully');
                this.tasks.push(response.data);
                // You can optionally handle the response here
            })
            .catch((error) => {
                console.error('Error sending task:', error);
            });

        this.newTask.value.description = ''; // Clear the input field
    }

    updateTodoList() {
        axios
            .get('http://192.168.0.101:808/api/tasks')
            .then((response) => {
                this.tasks.value = response.data;
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }

    setFilter(filterValue) {
        this.filter.value = filterValue;
    }

    get filteredTasks() {
        if (this.filter.value === 'active') {
            return this.tasks.filter((task) => !task.completed);
        } else if (this.filter.value === 'completed') {
            return this.tasks.filter((task) => task.completed);
        } else {
            return this.tasks;
        }
    }

    // Other methods
}

export default Task;
