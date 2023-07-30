<template>
    <div class="taskModal">
        <!-- <input class="task-input" v-model="variables.editedTask.text"> -->
        <Input :variables="{
            description: variables.editedTask.text
          }" />
        <Button :function="functions.saveEditedTask" :variables="{
            selectedTaskIndex: variables.selectedTaskIndex,
            tasks: variables.tasks,
            editedTask: variables.editedTask,
            showEditModal: variables.showEditModal
        }">Save</Button>
        <Button :function="functions.cancelEditTask" :variables="{
            editedTask: variables.editedTask,
            showEditModal: variables.showEditModal,
            selectedTaskIndex: variables.selectedTaskIndex
        }">Cancel</Button>
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