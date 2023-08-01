<template>
    <div class="taskModal">
        <Input v-model="componentVariables.variables.editedTask.text" :variables="{
            description: componentVariables.variables.editedTask.text
        }" />
        <Button :function="componentFunctions.functions.saveEditedTask" :componentVariables="{
            variables: componentVariables.variables,
        }">Save</Button>
        <Button :function="componentFunctions.functions.cancelEditTask" :componentVariables="{
            variables: componentVariables.variables,
        }">Cancel</Button>
    </div>
</template>

<script>
export default {
    name: 'TaskModal',
    props: {
        componentFunctions: {
            type: Object,
            required: true
        },
        componentVariables: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped></style>