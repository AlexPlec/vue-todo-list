<template>
    <div class="taskModal">
        <input class="task-input" v-model="variables.editedTask.text">
        <button class="btn-modal" @click="functions.saveEditedTask(
            variables.selectedTaskIndex,
            variables.tasks,
            variables.editedTask,
            variables.showEditModal
        )">Save</button>
        <button class="btn-modal" @click="functions.cancelEditTask(
            variables.editedTask,
            variables.showEditModal,
            variables.selectedTaskIndex)
            ">Cancel</button>
    </div>
</template>

<script>
export default {
    name: 'TaskModal',
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
}
</script>

<style scoped></style>