import { ref, reactive } from 'vue';
class Variables {
    constructor() {
        this.tasks = reactive([]);
        this.newTask = ref({ description: '' });
        this.filter = ref('all');
        this.showEditModal = ref(false);
        this.showUserModal = ref(false);
        this.editedTask = reactive({});
        this.selectedTaskIndex = ref(null);
        this.showSignUp = ref(true);
        this.showLogIn = ref(false);
        this.loginUser = reactive({
            login: '',
        });
        this.user = reactive({
            id: '',
            login: '',
            autoLogin: false,
        });
        this.newUser = reactive({
            login: '',
            autoLogin: false,
        });
    }
}
export default Variables;
