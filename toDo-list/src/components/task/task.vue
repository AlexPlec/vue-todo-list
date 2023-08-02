<template>
    <div class="task">
        <span class="task-text" @click="componentFunctions.functions.toggleTaskCompletion(componentVariables.index,
            componentVariables.variables.tasks
        )">{{ componentVariables.task.description }}</span>
        <Button :function="componentFunctions.functions.editTask" :componentVariables="{
            variables: componentVariables
        }">Edit</Button>
        <Button :function="componentFunctions.functions.removeTask" :componentVariables="{
            variables: componentVariables
        }">Remove</Button>
    </div>
</template>

<script>
export default {
    name: "TaskTemplate",
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
};
</script>

<style scoped>
.task {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    background-color: #17B978;
    border-radius: 10px;
    /* Add border-radius for rounded corners */
    border-style: solid;
    border-color: black;
    border-width: 2px;
}

.task-text {
    display: inline-block;
    width: 100px;
    /* Set a fixed width for the task elements */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.completed {
    text-decoration: line-through;
}
</style>