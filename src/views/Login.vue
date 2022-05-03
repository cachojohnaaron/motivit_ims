<template>
<div class="login-page">
    <div class="card-login">
    <div class="card-body">
        <img src="../assets/logo.png" alt="MotivIT IMS Logo" style="height:50px; display:inline; float:left; margin-right:15px;">
        <div class="login-page-header"><strong>MotivIT - Inventory Management System Login </strong></div>
            
        
          <form ref="form" action="" method="POST">
           
            <br>
            <form-group label-for="usernameLabel1">
                <input class="login-input form-control" type="text" name="username" v-model="Admin.username" required placeholder="Enter Username">
            </form-group>
            
            <form-group label-for="exampleInput2">
                <input class="login-input form-control" type="password" name="password" v-model="Admin.password" required placeholder="Enter Password">
            </form-group>
            
            <div>
                <button class="btn-login btn btn-light" @click.prevent="onLogin()">Login</button>
            </div>
           
        </form>

    </div>

</div>
</div>

</template>

<script>

import axios from "axios";
import bcrypt from 'bcryptjs';

export default {
    name: 'login',
    data() {
        return {

            AdminID: [],
            
            Admin: {
                username: null,
                password: null
            },
            errorAlert: false,
            successAlert: false,
        }
    },

    created() {

    if(this.$session.exists('login-session')) {
        var i = this.$session.get('login-session');
        var j = this.$session.get('login-session-enc');

        bcrypt.compare(i, j, (err, res) => {
            if (res == 1) 
            this.$router.push({ path: '/dashboard' })
        })
    }  
    else {
        this.$router.push({ path: '/' })
    }

    },


    methods: {
        /* eslint-disable */
        onLogin() {
            var data = new FormData();
            data.append('username', this.Admin.username);
            data.append('password', this.Admin.password);
            axios
                .post(
                    "http://localhost/motivit/motivit_ims/src/Api/admin-api.php?action=login",
                    data
                )
                .then((res) => {
                    if (res.data.error) {
                        console.log("Error", res.data);
                        alert(res.data.message);
                    } 
                    else {
                        console.log("Success", res.data.message);
                        this.AdminID = res.data.user_Data;

                        var parsedobj = JSON.parse(JSON.stringify(this.AdminID))
                        console.log(parsedobj[0].id);

                        const salt = bcrypt.genSaltSync(10);
                        var hashed = bcrypt.hashSync(parsedobj[0].id, salt);

                        this.$session.set("login-session-enc", hashed);
                        //localStorage.setItem("login-session-enc", hashed);
                        this.$session.set("login-session", parsedobj[0].id);

                        this.$router.push('/dashboard');


                     

                        
            
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                });
        }

    },
}
</script>

<style scoped>
.card-login{
    width: 300px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    text-align: center;
    background: white;
    border-radius: 10px !important;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.3);
}
.login-page-header{
    color: #183351;
    font-size: 15px;
    text-align: left !important;
    margin-top: 3px;
}
.btn-login{
    background-image: linear-gradient(to right, #1A4684, #008DEA);
    color:white;
    padding: 2px 15px;
    border-radius: 0px;
    border: none;
    width: 100%;
    height: 30px;
    font-size: 12px;
    margin-top:10px;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2);
}

.login-input{
    
    width:100%;
    height:30px;
    font-size:11px;
    margin-bottom:5px;
    padding-left: 10px;
    border-radius: 5px;
}
.card{
    margin: 0 auto;
    top: 50%;
}


</style>
