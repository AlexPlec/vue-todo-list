<template>
    <div class="buttonFilter">
        <Button :function="functions.setFilter" :variables="{
            filter: variables.filter,
            filterValue: 'all'
          }">All</Button>
          <Button :function="functions.setFilter" :variables="{
            filter: variables.filter,
            filterValue: 'active'
          }">Active</Button>
          <Button :function="functions.setFilter" :variables="{
            filter: variables.filter,
            filterValue: 'completed'
          }">Completed</Button>
    </div>
</template>

<script>
    export default {
        name:"ButtonFilter",
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

<style scoped>

</style>