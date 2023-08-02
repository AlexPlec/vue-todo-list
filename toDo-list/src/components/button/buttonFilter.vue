<template>
    <div class="buttons-filter">
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

<style scoped>

.buttons-filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
.button {
    width: 100%;
}
</style>