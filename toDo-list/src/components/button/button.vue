<template>
    <button class="btn" @click="this.function(componentVariables)">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        function: {
            type: Function,
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