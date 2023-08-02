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

<style scoped>

.taskModal {
    position: fixed;
    width: 200px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input, .button {
    width: 100%;
  }

</style>