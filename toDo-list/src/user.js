import axios from 'axios';

class User {
    constructor(
        loginUser,
        user,
        tasks,
        showUserModal,
        newUser,
        showSignUp,
        showLogIn
    ) {
        this.loginUser = loginUser;
        this.user = user;
        this.tasks = tasks;
        this.showUserModal = showUserModal;
        this.newUser = newUser;
        this.showSignUp = showSignUp;
        this.showLogIn = showLogIn;
    }
    createUserLogin() {
        if (this.loginUser.login.trim() === '') {
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
                        (user) => user.login === this.loginUser.login
                    );
                    const filtredTasksArray = tasksArray.filter(
                        (task) => task.userId === filteredUsers[0].id
                    );

                    if (filteredUsers.length > 0) {
                        this.user.id = filteredUsers[0].id;

                        this.tasks.splice(
                            0,
                            this.tasks.length,
                            ...filtredTasksArray
                        ); // Replace tasks with filtered tasks
                        this.showUserModal.value = false;
                        this.loginUser.login = '';
                    } else {
                        console.error('Invalid login');
                    }
                })
            )
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    }
    createUser() {
        if (this.newUser.login.trim() === '') {
            return;
        }

        const userData = {
            Login: this.newUser.login,
            AutoLogin: this.newUser.autoLogin,
        };

        axios
            .post('http://192.168.0.101:808/api/users', userData)
            .then((response) => {
                console.log('User created successfully');
                // Optionally handle the response here
                this.newUser.login = '';
                this.newUser.autoLogin = false;
                this.showUserModal.value = false;

                // Fetch the user data and update the 'user' object
                axios
                    .get(
                        `http://192.168.0.101:808/api/users/${response.data.id}`
                    )
                    .then((response) => {
                        this.user.id = response.data.id;
                        this.user.login = response.data.login;
                        this.user.autoLogin = response.data.autoLogin;
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

    toggleSignUp() {
        this.showSignUp.value = !this.showSignUp.value;
        this.showLogIn.value = !this.showLogIn.value;
    }
}

export default User;
