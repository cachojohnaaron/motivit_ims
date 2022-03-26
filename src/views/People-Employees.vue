<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>People </strong><span style="font-size:16px;"> list of all employees</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader">Export</button>
            <button type="button" class="btn btn-light btn-subheader">Show Deleted</button>
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-employee">Create New</button>
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;" />
    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <div id="tblUser" class="card" style="width:100%;">
        <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
            <table class="table-sm table-striped table-hover" style="width:100%; font-size:13px;">
                <thead class="">
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users">
                        <td>{{ user.emp_id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.department }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.notes }}</td>
                        <td>
                            <button class="btn-sm" @click="showModal(user)" data-toggle="modal" data-target="#upd-licenses">
                                <v-icon color="success" title="Edit User" style="font-size:16px;">mdi-pencil</v-icon>
                            </button>
                            <button class="btn-sm" @click="DeleteEmployee(user)">
                                <v-icon color="red" title="Delete User" style="font-size:16px;">mdi-delete</v-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Update Employee Modal -->
    <div class="modal fade modal-update-asset" id="upd-licenses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update Asset Information</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form name="updLicense" action="" method="POST">
                        <div style="text-align:center; border: 1px solid green; width:100%;">
                            <b-alert variant="success" :show="successAlert">Employee Record Updated</b-alert>
                        </div>

                        <div class="form-row">
                            <div class="form-group mb-2">
                                <label for="name"><b>Name</b></label>
                                <input class="form-control" type="text" name="name" id="name" placeholder="" v-model.lazy="UsersData.name">
                            </div>

                            <div class="form-group mb-2">
                                <label for="email"><b>Email</b></label>
                                <input class="form-control" type="text" name="email" id="email" placeholder="" v-model.lazy="UsersData.email">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group mb-2">
                                <label for="department"><b>Department</b></label>
                                <input class="form-control" type="text" name="department" id="department" placeholder="" v-model.lazy="UsersData.department">
                            </div>

                            <div class="form-group mb-2">
                                <label for="notes"><b>Notes</b></label>
                                <input class="form-control" type="text" name="notes" id="notes" placeholder="" v-model.lazy="UsersData.notes">
                            </div>
                        </div>

                        <hr>
                        <div style="width:100%; text-align:right;">
                            <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click="updateLicense()">Save Changes</b-button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Employee Modal -->
    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <div class="modal fade modal-update-asset" id="add-employee" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Employee</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="" method="POST" id="myForm">
                        <div class="form-row">
                            <div style="text-align:center; border: 1px solid green; width:100%;">
                                <b-alert variant="success" :show="successAlert">Employee Record Added</b-alert>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name"><b>Employee Name</b></label>
                                <input type="text" name="name" class="form-control" id="name" placeholder="" v-model.lazy="UsersData.name" />
                            </div>

                            <div class="form-group">
                                <label for="department"><b>Department</b></label>
                                <select name="department" id="department" class="form-control" v-model.lazy="UsersData.department">
                                    <option value='0'> -- Select Department -- </option>
                                    <option v-for='data in Departments' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email"><b>Email</b></label>
                                <input type="text" name="email" class="form-control" id="email" placeholder="" v-model.lazy="UsersData.email" />
                            </div>

                            <div class="form-group">
                                <label for="notes"><b>Notes</b></label>
                                <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                            </div>
                        </div>    
                            <hr>
                        <div style="width:100%; text-align:right;">
                            <b-button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-primary btn-sm"  block @click="AddEmployee()">Add Employee</b-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

                <!--
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit Employee">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete Employee">mdi-delete</v-icon></button>
                        <button><v-icon color="gray" title="Delete Employee">mdi-eye</v-icon></button>
                    </template>

                </v-data-table>
                -->

            </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'users',
    data() {
        return {
            /**
            headers: [{
                    text: 'Name',
                    value: 'name'
                },
                {
                    text: 'Title',
                    value: 'title'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Phone',
                    value: 'phone'
                },
                {
                    text: 'Username',
                    value: 'username'
                },
                {
                    text: 'Department',
                    value: 'department'
                },
                {
                    text: 'Manager',
                    value: 'manager'
                },
                {
                    text: < v - icon > mdi - text - box - multiple < /v-icon>,
                    value: 'assets'
                },
                {
                    text: < v - icon > mdi - content - save < /v-icon>,
                    value: 'licenses'
                },
                {
                    text: < v - icon > mdi - keyboard < /v-icon>,
                    value: 'accessories'
                },
                {
                    text: 'Actions',
                    value: 'action'
                },
            ],
            recents: [{
                    name: 'employee_1',
                    title: 'position_1',
                    email: 'name@email.com_1',
                    phone: 'phone_1',
                    username: 'username_1',
                    department: 'department_1',
                    manager: 'employee_1',
                    assets: 2,
                    licenses: 1,
                    accessories: 3,
                },
                {
                    name: 'employee_2',
                    title: 'position_2',
                    email: 'name@email.com_2',
                    phone: 'phone_2',
                    username: 'username_2',
                    department: 'department_2',
                    manager: 'employee_2',
                    assets: 1,
                    licenses: 3,
                    accessories: 0,
                },
                {
                    name: 'employee_3',
                    title: 'position_3',
                    email: 'name@email.com_3',
                    phone: 'phone_3',
                    username: 'username_3',
                    department: 'department_3',
                    manager: 'employee_3',
                    assets: 2,
                    licenses: 2,
                    accessories: 1,
                },
            ],
            /*

            /**FROM AllEmployee.vue */
            successAlert: false,
            focus: false,
            UsersData: {
                user_id: null,
                name: null,
                department: null,
                email: null,
                notes: null,
                    },
            Users: [],
            Departments: [],
            /**from AllEmployee.vue */

            
        }
    },
    created() {
        /* auth
    if (localStorage.getItem('token') == "usertoken") {
        console.log("authorized");
        this.getUsers();
    }
    else {
        console.log("unauthorized");
        alert("Unauthorized\nPlease Login Again.");
        this.$router.push("/");
    }*/
        this.getAllEmployee();
        this.getDropdowns();
    },
    methods: {
        showModal(user_id) {
            this.UsersData = user_id;
            this.$bvModal.show('upd-licenses')
        },
        cancelModal() {
            this.$bvModal.hide('upd-licenses')
        },
        updateLicense() {
            let data = new FormData();
            data.append("emp_id", this.UsersData.emp_id);
            data.append("name", this.UsersData.name);
            data.append("department", this.UsersData.department);
            data.append("email", this.UsersData.email);
            data.append("notes", this.UsersData.notes);

            axios.post('http://localhost/motivit/IMS/src/Api/api.php?action=updateEmployee', data).then((res) => {
                if (res.data.error) {
                    alert("Error");
                } else {
                    //alert(res.data.message);
                    this.successAlert = true;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        getAllEmployee() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallemployee"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Users = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        DeleteEmployee(user_id) {
            let data = new FormData();
            this.UsersData = user_id;
            data.append("id", this.UsersData.emp_id);

            axios
                .post("http://localhost/motivit/IMS/src/Api/api.php?action=disableEmployee", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        this.getAllEmployee();
                        alert(res.data.message);
                    }
                })
        },
        Reset() {
        this.UsersData.name = "";
        this.UsersData.department = "";
        this.UsersData.email = "";
        this.UsersData.notes = "";
        },
        AddEmployee() {
        let data = new FormData();
        data.append("name", this.UsersData.name);
        data.append("department", this.UsersData.department);
        data.append("email", this.UsersData.email);
        data.append("notes", this.UsersData.notes);
        axios
            .post(
            "http://localhost/motivit/IMS/src/Api/api.php?action=addemployee",
            data
            )
            .then((res) => {
            if (res.data.error) {
                alert(res.data.message);
            } else {
                //alert(res.data.message);
                this.successAlert = true;
                this.Reset();
            }
            })
            .catch((err) => {
            console.log(err);
            });
        },
        getDropdowns() {
        axios
            .get(
            "http://localhost/motivit/IMS/src/Api/dropdown.php?action=ddDepartment"
            )
            .then((res) => {
            console.log(res.data.user_Data);
            this.Departments = res.data.user_Data;
            })
            .catch((err) => {
            console.log(err);
            });
        },
    },
}
</script>

<style >

textarea {
    height: 50px !important;
    width: 100%;
    resize: none;
}

</style>
