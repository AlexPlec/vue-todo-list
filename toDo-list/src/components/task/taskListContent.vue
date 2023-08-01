<template>
    <div class="task-list-content">
        <ul class="task-list">
            <li v-for="(task, index) in componentFunctions.functions.filteredTasks" :key="index"
                :class="{ completed: task.completed }">
                <TaskTemplate :componentFunctions="{ functions: componentFunctions.functions }" :componentVariables="{
                    variables: componentVariables.variables,
                    task: task,
                    index: index
                }">
                </TaskTemplate>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "TaskListContent",
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