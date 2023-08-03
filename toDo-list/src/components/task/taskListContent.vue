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

<style scoped>
.task-list-content {
    background-color: #555;
    border-radius: 10px;
    flex-grow: 1;
    /* Take up remaining vertical space */
    align-items: flex-start;
    /* Align content to the top */
    overflow-y: auto;
    border-style: solid;
    border-color: black;
    border-width: 2px;
}

.task-list {
    padding-left: 0;
    max-height: 70px;
    /* Adjust the height as needed */
    min-height: 70px;
    overflow-y: scroll;
}

.task-list::-webkit-scrollbar {
    width: 10px;
    /* Set the width of the scrollbar */
}

.task-list::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* Set the background color of the scrollbar track */
    border-radius: 5px;
}

.task-list::-webkit-scrollbar-thumb {
    background-color: #888;
    /* Set the color of the scrollbar thumb */
    border-radius: 5px;
    /* Set the border-radius of the scrollbar thumb */
}

.task-list::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    /* Set the color of the scrollbar thumb on hover */
}
</style>