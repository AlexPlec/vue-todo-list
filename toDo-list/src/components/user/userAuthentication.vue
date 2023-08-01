<template>
    <div class="user-authentication">
        <Button :function="componentFunctions.functions.authenticationOpen" :componentVariables="{
            variables: componentVariables.variables
        }">Log In</Button>
        <div v-if="componentVariables.variables.showUserModal.value">
            <UserModal :componentFunctions="{
                functions: componentFunctions.functions
            }" :componentVariables="{
    variables: componentVariables.variables

}"></UserModal>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserAuthentication",
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