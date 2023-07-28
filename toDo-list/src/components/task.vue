<template>
    <div class="task">
        <span class="task-text" @click="functions.toggleTaskCompletion(index, tasks)">{{ task.description }}</span>
        <button class="btn-task" @click="functions.editTask(index)">Edit</button>
        <button class="btn-task" @click="functions.removeTask(index)">Remove</button>
    </div>
</template>

<script>
export default {
    name: "TaskTemplate",
    props: {
        functions: {
            type: Object,
            required: true,
        },
        task: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        tasks: {
            type:Array,
            required: true,
        }
    },
};
</script>