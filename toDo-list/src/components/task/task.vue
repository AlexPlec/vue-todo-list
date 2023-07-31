<template>
    <div class="task">
        <span class="task-text" @click="functions.toggleTaskCompletion(variables.index,
            variables.tasks
        )">{{ variables.task.description }}</span>
        <Button :function="functions.editTask" :variables="{
            index: variables.index,
            selectedTaskIndex: variables.selectedTaskIndex,
            tasks: variables.tasks,
            editedTask: variables.editedTask,
            showEditModal: variables.showEditModal
        }">Edit</Button>
        <Button :function="functions.removeTask" :variables="{
            index: variables.index,
            tasks: variables.tasks
        }">Remove</Button>
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