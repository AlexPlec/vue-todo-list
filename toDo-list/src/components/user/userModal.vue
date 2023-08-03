<template>
    <div class="userModal">
        <div class="loginArea" v-show="componentVariables.variables.showSignUp.value">
            <Input v-model="componentVariables.variables.loginUser.login" :variables="{
                description: componentVariables.variables.loginUser.login,
                text: 'Login'
            }" />
            <Button :function="componentFunctions.functions.createUserLogin" :componentVariables="{
                variables: componentVariables.variables,
            }">AcceptLogin</Button>
            <Button :function="componentFunctions.functions.toggleSignUp" :componentVariables="{
                variables: componentVariables.variables,
            }">Sign Up</Button>
        </div>
        <div class="registerArea" v-show="componentVariables.variables.showLogIn.value">
            <Input v-model="componentVariables.variables.newUser.login" :variables="{
                description: componentVariables.variables.newUser.login,
                text: 'Registration'
            }" />
            <Button :function="componentFunctions.functions.createUser" :componentVariables="{
                variables: componentVariables.variables,
            }">acceptRegister</Button>
            <Button :function="componentFunctions.functions.toggleSignUp" :componentVariables="{
                variables: componentVariables.variables,
            }">Log In</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserModal",
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
.userModal {
    position: fixed;
    width: 200px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.loginArea,
.registerArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.button,.input {
    margin-bottom: 70px;
}
</style>