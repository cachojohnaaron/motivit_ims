<template>
<!-- eslint-disable -->
<!-- prettier-ignore -->
<div class="dashboard">
    <Sidebar />
    <Topbar />
   
    <h6 class="page-header"><strong>Manage Admin Accounts </strong></h6>
    <v-row>
    <div class="card-buttons d-flex justify-space-between" style="width:700px !important;">
        <span class="page-buttons">
        </span>
        <span class="page-buttons">
            <button type="button" class="btn btn-light btn-subheader-third" @click="openAddForm()" data-toggle="modal" data-target="#add-admin" data-backdrop="static" data-keyboard="false">Add Admin</button>
        </span>
    </div>
    </v-row>
   

    <v-row>
        <div id="tblUser" class="card" style="width:700px;padding:5px 5px 0px 5px;">
            <div class="table-responsive-sm" >
                <table id="tblAllAsset" class="table-sm table-hover">
                    <thead class="">
                        <tr>
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in Admin">
                            <td>{{ data.id }}</td>
                            <td>{{ data.fname }}  {{data.lname}}</td>
                            <td>{{ data.username }}</td>
                        
                            <td>
                                <button class="btn-sm btn-action" @click="showModal(data)" modal-no-backdrop data-toggle="modal" data-target="#upd-admin" data-backdrop="static" data-keyboard="false">
                                    <v-icon color="success" title="Edit Admin" style="font-size:16px;">mdi-pencil</v-icon>
                                </button>
                                <button class="btn-sm btn-action"  @click="showModalDelete(data)" modal-no-backdrop data-toggle="modal" data-target="#delete-admin">
                                    <v-icon color="red" title="Delete Admin" style="font-size:16px;">mdi-delete</v-icon>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-row>

    <!-- Modal For Update Admin Information-->
    <div class="modal fade modal-update-asset" id="upd-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update Admin Information</h6>
                    <button type="button" @click="cancelModal()" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;User record updated.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> *</span></div>
                    <form action="" method="POST">

                        <div class="form-row">
                            <div class="form-group">
                                <label for="admin_id"><b>Admin ID</b></label>
                                <input type="text" name="admin_id" class="form-control" id="admin_id" placeholder="" readonly v-model.lazy="UsersData.id" />
                            </div>

                            <div class="form-group">
                                <label for="fname"><b>First Name</b></label>
                                <input type="text" name="fname" class="form-control" id="fname" placeholder="" v-model.lazy="UsersData.fname" />
                            </div>

                            <div class="form-group">
                                <label for="lname"><b>Last Name</b></label>
                                <input type="text" name="lname" class="form-control" id="lname" placeholder="" v-model.lazy="UsersData.lname" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="admin_username"><b>Username<span style="color: red;"> *</span></b></label>
                                <input type="text" name="admin_username" class="form-control mb-3" id="admin_username" placeholder="" v-model.lazy="UsersData.username" />
                            </div>
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click.prevent="updateAdminInfo()">Save Changes</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal For Add Admin -->
    <div class="modal fade modal-update-asset" id="add-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-add-admin" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add admin account</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong> Admin account added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> *</span></div>
                    <form action="" method="POST">

                        <div class="form-row">
                            <div class="form-group">
                                <label for="fname"><b>First Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="admin_username" class="form-control mb-3" id="admin_username" placeholder="" v-model.lazy="UsersData.fname" />
                            </div>
                            <div class="form-group">
                                <label for="lname"><b>Last Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="admin_password" class="form-control mb-3" id="admin_password" placeholder="" v-model.lazy="UsersData.lname" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="admin_username"><b>Username<span style="color: red;"> *</span></b></label>
                                <input type="text" name="admin_username" class="form-control mb-3" id="admin_username" placeholder="" v-model.lazy="UsersData.username" />
                            </div>
                            <div class="form-group">
                                <label for="admin_password"><b>Password<span style="color: red;"> *</span></b></label>
                                <input type="text" name="admin_password" class="form-control mb-3" id="admin_password" placeholder="" v-model.lazy="UsersData.password" />
                            </div>
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click.prevent="addAdmin()">Create Account</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    <!--Modal For Delete Asset-->
    <div class="modal fade modal-update-asset" id="delete-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Delete Admin Account</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Admin account moved to archived.</div>
                
                    <form action="" method="POST">

                        <div style="display:none">
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="asset_id"><b>Admin ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                                </div>
                            </div>

     
                        </div>

                        <div style="text-align: center;">
                            <h6 class="rtn-modal-title">Are you sure you want to delete this admin account?</h6>
                        </div>
                       
                        <br>
                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-confirm" style="background: rgb(163, 4, 4); color: white;" block @click.prevent="deleteAdmin()">Confirm</b-button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import axios from "axios";
import bcrypt from "bcryptjs";

export default {
    name: "manage-admin",
    data() {
        return {
            alertSuccess: null,
            alertError: null,
            UsersData: [],
            Admin: [],
        };
    },
     components: { Topbar, Sidebar },
    created() {
    
    if(this.$session.exists('login-session')) {
        var i = this.$session.get('login-session');
        var j = this.$session.get('login-session-enc');

        bcrypt.compare(i, j, (err, res) => {
            if (res == 0) 
            this.$router.push({ path: '/' })
        })
    }  
    else {
        this.$router.push({ path: '/' })
    }

        this.getAllAdmin();
    },
    methods: {
        showModal(softID) {
            this.UsersData = softID;
        },
        cancelModal() {
            window.location.reload();
        },
        showModalDelete(softID) {
            this.UsersData = softID;
        },
        getAllAdmin() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/api/admin-api.php?action=getalladmin"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Admin = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        openAddForm() {
            this.Reset();
            this.alertError = false;
        },
        updateAdminInfo() {
        if (!this.UsersData.username || !this.UsersData.password) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("id", this.UsersData.id);
            data.append("fname", this.UsersData.fname);
            data.append("lname", this.UsersData.lname);
            data.append("username", this.UsersData.username);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=updateadmininfo', data)
                .then((res) => {
                    if (res.data.error) {
                        alert("Error");
                        window.location.reload();
                    } else {
                        this.alertError = false;
                        this.alertSuccess = true;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                }) 
            }        
        },
        addAdmin() {
        if (!this.UsersData.username || !this.UsersData.password || !this.UsersData.fname || !this.UsersData.lname) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("fname", this.UsersData.fname);
            data.append("lname", this.UsersData.lname);
            data.append("username", this.UsersData.username);
            data.append("password", this.UsersData.password);
            axios
                .post(
                "http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=addadmin",
                data
                )
                .then((res) => {
                if (res.data.error) {
                    alert(res.data.message);
                } else {
                    this.alertError = false;
                    this.alertSuccess = true;
                    setTimeout(function() {
                        window.location.reload()
                    }, 1000);
                }
                })
                .catch((err) => {
                console.log(err);
                });
            }
        },                
        deleteAdmin() {
            let data = new FormData();
            data.append("id", this.UsersData.id);

            axios
                .post("http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=disableAdmin", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                        this.getAllAdmin();
                    }
                })
        },
        Reset() {
            this.UsersData.id = "";
            this.UsersData.username = "";
            this.UsersData.password = "";
        },
              
    },
};
</script>

<style scoped>
.dashboard{
    width: fit-content;
}
.success
{
 font-weight: bold;
 color:#009933;
 background-color: #ccffcc;
 border:1px solid #009933;
}

.danger
{
 font-weight: bold;
 color:#ff0000;
 background-color: #ffe6e6;
 border:1px solid #ff0000;
}

label, input, textarea, select{
    font-size: 11px;
}
input{
    height:23px;
    width:100%;
}
.form-group{
    width: 150px;
    margin-top: -10px;
}
.btn-primary, .btn-secondary, .btn-confirm{
    height:25px;
    padding: 2px 7px 2px 7px;
}
.modal-header{
    height:30px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.close{
    height:20px;
    padding-top: 0;
    margin-top: 0px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 2px;
    text-decoration: none;
}
hr{
    margin-top: -10px;
}
.rtn-add-admin{
    width:355px;
}

</style>
