import axios from 'axios';

class Task {
    constructor(tasks, filter) {
        this.tasks = tasks;
        this.filter = filter;
    }

    editTask(componentVariables) {
        componentVariables.variables.variables.selectedTaskIndex.value =
            componentVariables.variables.index;
        componentVariables.variables.variables.editedTask.text =
            componentVariables.variables.variables.tasks[
                componentVariables.variables.index
            ].description;
        componentVariables.variables.variables.showEditModal.value = true;
    }

    toggleTaskCompletion(index, tasks) {
        tasks[index].completed = !tasks[index].completed;
    }

    removeTask(componentVariables) {
        const taskId =
            componentVariables.variables.variables.tasks.value[
                componentVariables.variables.index
            ].id;

        axios
            .delete(`http://localhost:5204/api/tasks/${taskId}`)
            .then((response) => {
                console.log('Task removed successfully');
            })
            .catch((error) => {
                console.error('Error removing task:', error);
            });

        componentVariables.variables.variables.tasks.splice(
            componentVariables.variables.index,
            1
        );
    }

    cancelEditTask(componentVariables) {
        componentVariables.variables.editedTask.text = '';
        componentVariables.variables.showEditModal.value = false;
        componentVariables.variables.selectedTaskIndex.value = null;
    }

    saveEditedTask(componentVariables) {
        if (componentVariables.variables.selectedTaskIndex.value !== null) {
            const index = componentVariables.variables.selectedTaskIndex.value;
            if (
                index >= 0 &&
                index < componentVariables.variables.tasks.length
            ) {
                const taskId = componentVariables.variables.tasks[index].id;
                const updatedTask = {
                    Description: componentVariables.variables.editedTask.text,
                    completed:
                        componentVariables.variables.tasks[index].completed,
                };

                axios
                    .put(
                        `http://localhost:5204/api/tasks/${taskId}`,
                        updatedTask
                    )
                    .then((response) => {
                        console.log('Task updated successfully');

                        // Update the task in the 'tasks' array with the edited information
                        console.log(
                            componentVariables.variables.editedTask.text
                        );
                        componentVariables.variables.tasks[index].description =
                            componentVariables.variables.editedTask.text;

                        componentVariables.variables.showEditModal.value = false;
                        componentVariables.variables.selectedTaskIndex.value =
                            null;
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
            } else {
                console.error('Invalid task index');
            }
        }
    }

    addTaskWithUser(componentVariables) {
        if (
            componentVariables.variables.newTask.value.description.trim() === ''
        ) {
            return;
        }

        const taskData = {
            Description: componentVariables.variables.newTask.value.description,
            Completed: false,
            UserId: componentVariables.variables.user.id, // Include the user ID in the task object
        };

        axios
            .post('http://localhost:5204/api/tasks', taskData)
            .then((response) => {
                console.log('Task sent successfully');
                componentVariables.variables.tasks.push(response.data);
                // You can optionally handle the response here
            })
            .catch((error) => {
                console.error('Error sending task:', error);
            });

        componentVariables.variables.newTask.value.description = ''; // Clear the input field
    }

    updateTodoList(tasks) {
        axios
            .get('http://localhost:5204/api/tasks')
            .then((response) => {
                tasks.value = response.data;
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }

    setFilter(componentVariables) {
        componentVariables.variables.filter.value =
            componentVariables.filterValue;
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
