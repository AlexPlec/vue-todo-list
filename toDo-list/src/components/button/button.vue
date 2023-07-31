<template>
    <button class="btn" @click="this.function(variables)"><slot></slot></button>
</template>

<script>
    export default {
        name:"Button",
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

<style scoped>

</style>