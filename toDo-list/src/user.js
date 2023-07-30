import axios from 'axios';

class User {
    createUserLogin(variables) {
        if (variables.loginUser.login.trim() === '') {
            return;
        }

        axios
            .all([
                axios.get('http://192.168.0.101:808/api/tasks'),
                axios.get('http://192.168.0.101:808/api/users'),
            ])
            .then(
                axios.spread((tasksResponse, usersResponse) => {
                    const usersArray = usersResponse.data;
                    const tasksArray = tasksResponse.data;
                    const filteredUsers = usersArray.filter(
                        (user) => user.login === variables.loginUser.login
                    );
                    const filtredTasksArray = tasksArray.filter(
                        (task) => task.userId === filteredUsers[0].id
                    );

                    if (filteredUsers.length > 0) {
                        variables.user.id = filteredUsers[0].id;

                        variables.tasks.splice(
                            0,
                            variables.tasks.length,
                            ...filtredTasksArray
                        ); // Replace tasks with filtered tasks
                        variables.showUserModal.value = false;
                        variables.loginUser.login = '';
                    } else {
                        console.error('Invalid login');
                    }
                })
            )
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    }
    createUser(variables) {
        if (variables.newUser.login.trim() === '') {
            return;
        }

        const userData = {
            Login: variables.newUser.login,
            AutoLogin: variables.newUser.autoLogin,
        };

        axios
            .post('http://192.168.0.101:808/api/users', userData)
            .then((response) => {
                console.log('User created successfully');
                variables.newUser.login = '';
                variables.newUser.autoLogin = false;
                variables.showUserModal.value = false;

                // Fetch the user data and update the 'user' object
                axios
                    .get(
                        `http://192.168.0.101:808/api/users/${response.data.id}`
                    )
                    .then((response) => {
                        variables.user.id = response.data.id;
                        variables.user.login = response.data.login;
                        variables.user.autoLogin = response.data.autoLogin;
                    })
                    .catch((error) => {
                        console.error('Error retrieving user:', error);
                    });
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }
    authenticationOpen(variables) {
        variables.showUserModal.value = !variables.showUserModal.value;
    }

    toggleSignUp(variables) {
        variables.showSignUp.value = !variables.showSignUp.value;
        variables.showLogIn.value = !variables.showLogIn.value;
    }
}

export default User;
