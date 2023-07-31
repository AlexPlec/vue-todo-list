<template>
    <div class="task-list-content">
        <ul class="task-list">
            <li v-for="(task, index) in functions.filteredTasks" :key="index" :class="{ completed: task.completed }">
                <TaskTemplate :functions="{
                    toggleTaskCompletion: functions.toggleTaskCompletion,
                    editTask: functions.editTask,
                    removeTask: functions.removeTask
                }" :variables="{
    task: task,
    index: index,
    tasks: variables.tasks,
    selectedTaskIndex: variables.selectedTaskIndex,
    editedTask: variables.editedTask,
    showEditModal: variables.showEditModal
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