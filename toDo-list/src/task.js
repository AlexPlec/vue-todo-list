import axios from 'axios';

class Task {
    constructor(tasks, filter) {
        this.tasks = tasks;
        this.filter = filter;
    }

    editTask(variables) {
        variables.selectedTaskIndex.value = variables.index;
        variables.editedTask.text =
            variables.tasks[variables.index].description;
        variables.showEditModal.value = true;
    }

    toggleTaskCompletion(index, tasks) {
        tasks[index].completed = !tasks[index].completed;
    }

    removeTask(variables) {
        const taskId = variables.tasks.value[variables.index].id;

        axios
            .delete(`http://192.168.0.101:808/api/tasks/${taskId}`)
            .then((response) => {
                console.log('Task removed successfully');
            })
            .catch((error) => {
                console.error('Error removing task:', error);
            });

        variables.tasks.splice(variables.index, 1);
    }

    cancelEditTask(variables) {
        variables.editedTask.text = '';
        variables.showEditModal.value = false;
        variables.selectedTaskIndex.value = null;
    }

    saveEditedTask(variables) {
        if (variables.selectedTaskIndex.value !== null) {
            const index = variables.selectedTaskIndex.value;
            if (index >= 0 && index < variables.tasks.length) {
                const taskId = variables.tasks[index].id;
                const updatedTask = {
                    Description: variables.editedTask.text,
                    completed: variables.tasks[index].completed,
                };

                axios
                    .put(
                        `http://192.168.0.101:808/api/tasks/${taskId}`,
                        updatedTask
                    )
                    .then((response) => {
                        console.log('Task updated successfully');

                        // Update the task in the 'tasks' array with the edited information
                        variables.tasks[index].description =
                            variables.editedTask.text;

                        variables.showEditModal.value = false;
                        variables.selectedTaskIndex.value = null;
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            } else {
                console.error('Invalid task index');
            }
        }
    }

    addTaskWithUser(variables) {
        if (variables.newTask.value.description.trim() === '') {
            return;
        }

        const taskData = {
            Description: variables.newTask.value.description,
            Completed: false,
            UserId: variables.user.id, // Include the user ID in the task object
        };

        axios
            .post('http://192.168.0.101:808/api/tasks', taskData)
            .then((response) => {
                console.log('Task sent successfully');
                variables.tasks.push(response.data);
                // You can optionally handle the response here
            })
            .catch((error) => {
                console.error('Error sending task:', error);
            });

        variables.newTask.value.description = ''; // Clear the input field
    }

    updateTodoList(tasks) {
        axios
            .get('http://192.168.0.101:808/api/tasks')
            .then((response) => {
                tasks.value = response.data;
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }

    setFilter(variables) {
        variables.filter.value = variables.filterValue;
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
}

export default Task;
