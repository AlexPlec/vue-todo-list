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

    editTask(index, selectedTaskIndex,tasks,editedTask,showEditModal) {
        selectedTaskIndex.value = index;
        editedTask.text = tasks[index].description;
        showEditModal.value = true;
    }

    toggleTaskCompletion(index, tasks) {
        tasks[index].completed = !tasks[index].completed;
    }

    removeTask(index,tasks) {
        const taskId = tasks.value[index].id;

        axios
            .delete(`http://192.168.0.101:808/api/tasks/${taskId}`)
            .then((response) => {
                console.log('Task removed successfully');
            })
            .catch((error) => {
                console.error('Error removing task:', error);
            });

        tasks.splice(index, 1);
    }

    cancelEditTask(editedTask,showEditModal,selectedTaskIndex) {
        editedTask.text = '';
        showEditModal.value = false;
        selectedTaskIndex.value = null;
    }

    saveEditedTask(selectedTaskIndex,tasks,editedTask,showEditModal) {
        if (selectedTaskIndex.value !== null) {
            const index = selectedTaskIndex.value;
            if (index >= 0 && index < tasks.length) {
                const taskId = tasks[index].id;
                const updatedTask = {
                    Description: editedTask.text,
                    completed: tasks[index].completed,
                };

                axios
                    .put(
                        `http://192.168.0.101:808/api/tasks/${taskId}`,
                        updatedTask
                    )
                    .then((response) => {
                        console.log('Task updated successfully');

                        // Update the task in the 'tasks' array with the edited information
                        tasks[index].description = editedTask.text;

                        showEditModal.value = false;
                        selectedTaskIndex.value = null;
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
