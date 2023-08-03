import axios from 'axios';

class User {
    createUserLogin(componentVariables) {
        if (componentVariables.variables.loginUser.login.trim() === '') {
            return;
        }

        axios
            .all([
                axios.get('http://localhost:5204/api/tasks'),
                axios.get('http://localhost:5204/api/users'),
            ])
            .then(
                axios.spread((tasksResponse, usersResponse) => {
                    const usersArray = usersResponse.data;
                    const tasksArray = tasksResponse.data;
                    const filteredUsers = usersArray.filter(
                        (user) =>
                            user.login ===
                            componentVariables.variables.loginUser.login
                    );
                    const filtredTasksArray = tasksArray.filter(
                        (task) => task.userId === filteredUsers[0].id
                    );

                    if (filteredUsers.length > 0) {
                        componentVariables.variables.user.id =
                            filteredUsers[0].id;

                        componentVariables.variables.tasks.splice(
                            0,
                            componentVariables.variables.tasks.length,
                            ...filtredTasksArray
                        ); // Replace tasks with filtered tasks
                        componentVariables.variables.showUserModal.value = false;
                        componentVariables.variables.loginUser.login = '';
                    } else {
                        console.error('Invalid login');
                    }
                })
            )
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    }
    createUser(componentVariables) {
        if (componentVariables.variables.newUser.login.trim() === '') {
            return;
        }

        const userData = {
            Login: componentVariables.variables.newUser.login,
            AutoLogin: componentVariables.variables.newUser.autoLogin,
        };

        axios
            .post('http://localhost:5204/api/users', userData)
            .then((response) => {
                console.log('User created successfully');
                componentVariables.variables.newUser.login = '';
                componentVariables.variables.newUser.autoLogin = false;
                componentVariables.variables.showUserModal.value = false;

                // Fetch the user data and update the 'user' object
                axios
                    .get(
                        `http://localhost:5204/api/users/${response.data.id}`
                    )
                    .then((response) => {
                        componentVariables.variables.user.id = response.data.id;
                        componentVariables.variables.user.login =
                            response.data.login;
                        componentVariables.variables.user.autoLogin =
                            response.data.autoLogin;
                    })
                    .catch((error) => {
                        console.error('Error retrieving user:', error);
                    });
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }
    authenticationOpen(componentVariables) {
        componentVariables.variables.showUserModal.value =
            !componentVariables.variables.showUserModal.value;
    }

    toggleSignUp(componentVariables) {
        componentVariables.variables.showSignUp.value =
            !componentVariables.variables.showSignUp.value;
        componentVariables.variables.showLogIn.value =
            !componentVariables.variables.showLogIn.value;
    }
}

export default User;
