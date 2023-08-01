<template>
    <div class="buttonFilter">
        <Button :function="componentFunctions.functions.setFilter" :componentVariables="{
            variables: componentVariables.variables,
            filterValue: 'all'
        }">All</Button>
        <Button :function="componentFunctions.functions.setFilter" :componentVariables="{
            variables: componentVariables.variables,
            filterValue: 'active'
        }">Active</Button>
        <Button :function="componentFunctions.functions.setFilter" :componentVariables="{
            variables: componentVariables.variables,
            filterValue: 'completed'
        }">Completed</Button>
    </div>
</template>

<script>
export default {
    name: "ButtonFilter",
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