<template>
    <div class="userModal">
        <div class="loginArea" v-show="variables.showSignUp.value">
            <input class="loginInput" v-model="variables.loginUser.login" placeholder="Login">
            <Button :function="functions.createUserLogin"
            :variables="{
                loginUser: variables.loginUser,
                user: variables.user,
                tasks:variables.tasks,
                showUserModal:variables.showUserModal,
            }"
            >AcceptLogin</Button>
            <Button :function="functions.toggleSignUp" :variables="{
                showSignUp: variables.showSignUp,
                showLogIn: variables.showLogIn
            }">Sign Up</Button>
        </div>
        <div class="registerArea" v-show="variables.showLogIn.value">
            <input class="registrationInput" v-model="variables.newUser.login" placeholder="Registration">
            <Button :function="functions.createUser" :variables="{
                newUser: variables.newUser,
                showUserModal: variables.showUserModal,
                user: variables.user
            }">acceptRegister</Button>
            <Button :function="functions.toggleSignUp" :variables="{
                showSignUp: variables.showSignUp,
                showLogIn: variables.showLogIn
            }">Log In</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserModal",
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

<style scoped></style>