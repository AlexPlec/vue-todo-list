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