<template>
<!-- eslint-disable -->
<!-- prettier-ignore -->
<div class="dashboard">
    
    <Sidebar/>
    <Topbar />
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h6 class="page-header"><strong>Admin Profile </strong></h6>
        <span class="page-buttons">
            <button type="button" class="btn btn-light btn-subheader-third" @click="goAnotherPage()">Manage Other Admin Account</button>
        </span>
    </v-subheader>
    <div class="card">
        <p>Account Information</p>
        <div v-for="data in AdminData">
            <h4 style="font-size:12px;"><strong> Admin ID: </strong><span style="font-size:11px;">{{ data.id }} </span></h4>
            <h4 style="display: inline;font-size:12px;"><strong>Name: </strong><span style="font-size:11px;">{{ data.fname }} {{data.lname}} </span></h4>
            <br>
            <h4 style="display: inline;font-size:12px;"><strong>Username: </strong><span style="font-size:11px;">{{ data.username }}  </span></h4>
            
            
            <!--
            <h4 style="display: inline;font-size:12px;"><strong>Password:</strong> <span style="font-size:11px;">**** </span>
            </h4>
            -->
            <br><br>
            
        </div>
        <button  class="btn btn-subheader" data-toggle="modal" data-target="#upd-username" @click="Reset()" data-backdrop="static" data-keyboard="false">Change Username </button>
        <button  class="btn btn-subheader" data-toggle="modal" data-target="#change-pass" @click="Reset()" data-backdrop="static" data-keyboard="false">Change Password</button>
    </div>
    <!-- Modal For Update Username-->
    <div class="modal fade modal-update-asset" id="upd-username" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Change Username</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">Username Changed.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">Please fill up all of the required fields<span style="color: red;"> *</span></div>
                    <form action="" method="POST">

                        
                        <div class="form-row">

                            <div class="form-group">
                                <label for="new_username"><b>Enter New Username:<span style="color: red;"> *</span></b></label>
                                <input type="text" name="new_username" class="form-control mb-3" id="new_username" placeholder="" v-model.lazy="UsersData.new_username" />
                            </div>
                 
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click.prevent="updateUsername()">Save Changes</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>


    <!-- Modal For Change Password-->
    <div class="modal fade modal-update-asset" id="change-pass" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Change Password</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">Password Changed.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">Please fill up all of the required fields<span style="color: red;"> *</span></div>
                    <form action="" method="POST">

                        
                        <div class="form-row">

                            <div class="form-group">
                        
                                <label for="new_password"><b>Enter new password: <span style="color: red;"> *</span></b></label>
                                <input type="text" name="new_password" class="form-control mb-3" id="new_password" placeholder="" v-model.lazy="UsersData.new_password" />
                            </div>
                 
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click.prevent="updatePassword()">Save Changes</button>
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
import bcrypt from 'bcryptjs';

export default {
    name: "asset",
    data() {
        return {
            alertSuccess: null,
            alertError: null,
            UsersData: [],
            AdminID: '',
            AdminData: [],
    
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

        this.AdminID = this.$session.get('login-session');
        this.getCurrentAdmin();
    },
    methods: {
        cancelModal() {
            window.location.reload();
        },
        getCurrentAdmin() {
           let data = new FormData();
            data.append("id", this.AdminID);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=getcurrentadmin', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AdminData = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });            
        },
        updateUsername() {
        if (!this.UsersData.new_username) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("id", this.AdminID);
            data.append("new_username", this.UsersData.new_username);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=updateusername', data)
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
        updatePassword() {
        if (!this.UsersData.new_password) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("id", this.AdminID);
            data.append("new_password", this.UsersData.new_password);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=updatepassword', data)
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
        Reset() {
            this.UsersData.new_username = "";
            this.UsersData.new_password = "";
        },
        goAnotherPage() {
            this.$router.push('/manage-admins');
        }
    

    },
};
</script>

<style scoped>


textarea {
    height: 50px !important;
    width: 410px;
    resize: none;
}
.card{
    width: 250px !important;
    padding: 10px;
}
.btn-subheader{
    margin-top: 2px;
}
.btn-primary, .btn-secondary, .btn-success{
    height:25px;
    padding: 2px 7px 2px 7px;
}
hr{
    margin-top: -10px;
}
</style>
