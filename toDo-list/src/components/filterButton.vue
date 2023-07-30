<template>
    <button class="btn" @click="this.function(variables)"
        :class="{ 'active-filter': (variables.filter === variables.filterValue) }">
        {{ variables.filterValue }}
    </button>
</template>

<script>
export default {
    name: "FilterButton",
    props: {
        function: {
            type: Function,
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