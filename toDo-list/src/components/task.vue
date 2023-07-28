<template>
    <div class="task">
        <span class="task-text" @click="functions.toggleTaskCompletion(variables.index,
            variables.tasks
        )">{{ variables.task.description }}</span>
        <button class="btn-task" @click="functions.editTask(variables.index,
            variables.selectedTaskIndex,
            variables.tasks,
            variables.editedTask,
            variables.showEditModal)
            ">Edit</button>
        <button class="btn-task" @click="functions.removeTask(variables.index,
            variables.tasks
        )">Remove</button>
    </div>
</template>

<script>
export default {
    name: "TaskTemplate",
    props: {
        functions: {
            type: Object,
            required: true
        },
        variables: {
            type: Object,
            required: true
        }
    }
};
</script>