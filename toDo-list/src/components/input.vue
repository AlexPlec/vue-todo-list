<template>
    <input class="input" v-model="variables.description" v-bind:placeholder="text">
</template>

<script>
    export default {
        name:"Input",
        props: {
            variables: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                text: this.variables.text,
            }
        }
    }
</script>

<style scoped>

</style>