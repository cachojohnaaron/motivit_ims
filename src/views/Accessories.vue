<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Accessories </strong><span style="font-size:16px;"> list of accessories</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader">Export</button>
            <button type="button" class="btn btn-light btn-subheader">Show Deleted</button>
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-accessory">Create New</button>
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
                        <th>Accessory ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Manufacturer</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="acs in Accessory">
                        <td>{{ acs.acs_id }}</td>
                        <td>{{ acs.acs_name }}</td>
                        <td>{{ acs.acs_category }}</td>
                        <td>{{ acs.acs_manufacturer }}</td>
                        <td>{{ acs.quantity }}</td>
                        <td>{{ acs.location }}</td>
                        <td>
                            <button class="btn-sm" @click="showDeployModal(acs)" modal-no-backdrop data-toggle="modal" data-target="#deploy-accessory">
                                <v-icon color="warning" title="Deploy Accessory" style="font-size:16px;">mdi-rocket-launch</v-icon>
                            </button>
                            <button class="btn-sm" @click="showModal(acs)" modal-no-backdrop data-toggle="modal" data-target="#upd-accessory">
                                <v-icon color="success" title="Edit Accessory" style="font-size:16px;">mdi-pencil</v-icon>
                            </button>
                            <button class="btn-sm" @click="DeleteAsset(acs)">
                                <v-icon color="red" title="Delete User" style="font-size:16px;">mdi-delete</v-icon>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Update Accessory Modal -->
    <div class="modal fade modal-update-asset" id="upd-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update Accessory Information</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <form name="updAccessory" action="" method="POST">
                        <b-modal id="upd-accessory" hide-backdrop no-close-on-backdrop hide-footer content-class="shadow" title="Update Accessory Information">

                            <div style="text-align:center; border: 1px solid green; width:100%;">
                                <b-alert variant="success" :show="successAlert">Accessory Record Updated</b-alert>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_id"><b>Accessory ID</b></label>
                                    <input type="text" name="acs_id" class="form-control mb-3" id="acs_id" placeholder="" v-model.lazy="UsersData.acs_id" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_name"><b>Accessory Name</b></label>
                                    <input type="text" name="acs_name" class="form-control mb-3" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_category"><b>Category</b></label>
                                    <input type="text" name="acs_category" class="form-control mb-3" id="acs_category" placeholder="" v-model.lazy="UsersData.acs_category" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_manufacturer"><b>Manufacturer</b></label>
                                    <input type="text" name="acs_manufacturer" class="form-control mb-3" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="quantity"><b>Quantity</b></label>
                                    <input type="number" name="quantity" class="form-control mb-3" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="location"><b>Location</b></label>
                                    <input type="text" name="location" class="form-control mb-3" id="location" placeholder="" v-model.lazy="UsersData.location" />
                                </div>
                            </div>

                            <hr>
                            <div style="width:100%; text-align:right;">
                                <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                                <b-button class="ms-2 mb-3 btn btn-primary" block @click="updateAccessory()">Save Changes</b-button>
                            </div>

                        </b-modal>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Deploy Accessory Modal -->
    <div class="modal fade modal-update-asset" id="deploy-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Deploy Accessory</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form name="" action="" method="POST">
                        <b-modal id="modalDeployAccessory" hide-backdrop no-close-on-backdrop hide-footer content-class="shadow" title="Deploy Accessory">

                            <div style="text-align:center; border: 1px solid green; width:100%;">
                                <b-alert variant="success" :show="successAlert">Accessory Successfully Deployed</b-alert>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_id"><b>Accessory ID</b></label>
                                    <input type="text" name="acs_id" class="form-control mb-3" id="acs_id" placeholder="" v-model.lazy="UsersData.acs_id" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_name"><b>Accessory Name</b></label>
                                    <input type="text" name="acs_name" class="form-control mb-3" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_category"><b>Category</b></label>
                                    <input type="text" name="acs_category" class="form-control mb-3" id="acs_category" placeholder="" v-model.lazy="UsersData.acs_category" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_manufacturer"><b>Manufacturer</b></label>
                                    <input type="text" name="acs_manufacturer" class="form-control mb-3" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="quantity"><b>Quantity</b></label>
                                    <input type="number" name="quantity" class="form-control mb-3" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="location"><b>Location</b></label>
                                    <input type="text" name="location" class="form-control mb-3" id="location" placeholder="" v-model.lazy="UsersData.location" />
                                </div>
                            </div>

                            <hr>
                            <!-- Employee Data here -->
                            <p>Deploy To</p>

                            <div class="form-group">
                                <label for="employee"><b>Employee Name</b></label>
                                <select name="employee" id="employee" class="form-control" v-model.lazy="UsersData.employee">
                                    <option value="1">-- Select Employee --</option>
                                    <option v-for='data in Employees' :value='data.emp_id'>{{ data.name }}</option>
                                </select>
                            </div>

                            <hr>
                            <div style="width:100%; text-align:right;">
                                <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                                <b-button class="ms-2 mb-3 btn btn-success" block @click="deployAccessory()">Deploy</b-button>
                            </div>

                        </b-modal>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Accessory Modal -->
    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <div class="modal fade modal-update-asset" id="add-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Accessory</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="" method="POST" id="myForm">
                        <div class="form-row">
                            <div style="text-align:center; border: 1px solid green; width:100%;">
                                <b-alert variant="success" :show="successAlert">Accessory Record Added</b-alert>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="acs_name"><b>Accessory Name</b></label>
                                <input type="text" name="acs_name" class="form-control" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                            </div>

                            <div class="form-group">
                                <label for="quantity"><b>Quantity</b></label>
                                <input type="number" name="quantity" class="form-control" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                            </div>

                            <div class="form-group">
                                <label for="acs_manufacturer"><b>Manufacturer</b></label>
                                <input type="text" name="acs_manufacturer" class="form-control" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                            </div>
                        </div>
                            
                        <div class="form-row">
                            <div class="form-group">
                                <label for="location"><b>Location</b></label>
                                <input type="text" name="location" class="form-control" id="location" placeholder="" v-model.lazy="UsersData.location" />
                            </div>

                            <div class="form-group">
                                <label for="acs_category"><b>Category</b></label>
                                <select name="acs_category" id="acs_category" class="form-control" v-model.lazy="UsersData.acs_category">
                                    <option value='0'> -- Select Category -- </option>
                                    <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                        </div>

                
                        <hr>
                        <div style="width:100%; text-align:right;">
                            <b-button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-primary btn-sm"  block @click="AddAccessory()">Add Accessory</b-button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!--
    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit Accessory">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete Accessory">mdi-delete</v-icon></button>
                    </template>

                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

    -->

</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'accessory',
    data() {
        return {
            successAlert: false,
            UsersData: {
                user_id: null,
                acs_name: null,
                acs_category: null,
                acs_manufacturer: null,
                quantity: null,
                location: null
            },
            Accessory: [],
            Employees: [],
            Users: [],
            Category: [],
        };
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
        this.getAllAssets();
        this.getDropdownEmployee();
        this.getDropdowns();
    },
    methods: {
        showModal(user_id) {
            this.UsersData = user_id;
            this.$bvModal.show('upd-accessory')
        },
        showDeployModal(user_id) {
            this.UsersData = user_id;
            this.$bvModal.show('modalDeployAccessory')
        },
        cancelModal() {
            this.$bvModal.hide('upd-accessory')
            this.$bvModal.hide('modalDeployAccessory')
        },
        updateAccessory() {
            let data = new FormData();
            data.append("acs_id", this.UsersData.acs_id);
            data.append("acs_name", this.UsersData.acs_name);
            data.append("acs_category", this.UsersData.acs_category);
            data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
            data.append("quantity", this.UsersData.quantity);
            data.append("location", this.UsersData.location);

            axios.post('http://localhost/motivit/IMS/src/Api/api.php?action=updateAccessory', data).then((res) => {
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
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallaccessory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Accessory = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDropdownEmployee() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/dropdown.php?action=ddEmployee"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Employees = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        DeleteAsset(user_id) {
            let data = new FormData();
            this.UsersData = user_id;
            data.append("id", this.UsersData.acs_id);

            axios
                .post("http://localhost/motivit/IMS/src/Api/api.php?action=disableAccessory", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        this.getAllAssets();
                        alert(res.data.message);
                    }
                })
        },
        deployAccessory() {
            let data = new FormData();
            data.append("acs_id", this.UsersData.acs_id);
            //data.append("emp_id", this.EmployeeData.emp_id);
            data.append("emp_id", this.UsersData.employee);

            axios.post('http://localhost/motivit/IMS/src/Api/api.php?action=deployAccessory', data).then((res) => {
                if (res.data.error) {
                    alert("Error");
                } else {
                    alert(res.data.message);
                    location.reload();
                    //this.successAlert = true;
                }
            }).catch((err) => {
                console.log(err);
            })
        },

        /**FROM AddAccessory.vue */
        Reset() {
            this.UsersData.acs_name = "";
            this.UsersData.acs_category = "";
            this.UsersData.acs_manufacturer = "";
            this.UsersData.quantity = "";
            this.UsersData.location = "";
        },
        AddAccessory() {
            let data = new FormData();
            data.append("acs_name", this.UsersData.acs_name);
            data.append("acs_category", this.UsersData.acs_category);
            data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
            data.append("quantity", this.UsersData.quantity);
            data.append("location", this.UsersData.location);
            axios
                .post(
                "http://localhost/motivit/IMS/src/Api/api.php?action=addaccessory",
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
                "http://localhost/motivit/IMS/src/Api/dropdown.php?action=ddAccessoryCategory"
                )
                .then((res) => {
                console.log(res.data.user_Data);
                this.Category = res.data.user_Data;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        /**FROM AddAccessory.vue */

    },
};
</script>

<style scoped>
.btn-subheader {
    background: #028AD3;
    color: white;
    padding: 2px 15px;
    border-radius: 0px;
    margin-right: 10px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.btn-subheader-third {
    background-image: linear-gradient(to right, #028AD3, #19E1E5);
    color: white;
    padding: 2px 15px;
    border-radius: 0px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.dashboard {
    margin-top: -20px;
}
</style>
