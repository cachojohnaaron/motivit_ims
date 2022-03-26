<template>
<div class="dashboard">

    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Dashboard</strong> <span style="font-size:16px;"> dashboard and statistics</span></h3>

        <span>
            <v-text-field dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px; display:inline-block;" />&nbsp;
            <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>

                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on" class="btn-subheader-third">
                        Create New
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="[text] in links" :key="text" link>

                        <v-list-item-content>
                            <v-list-item-title>{{ text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>

                        <v-list-tile v-for="subItem in item.items" :key="subItem.title" style="margin-left:20px;">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title><br>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>{{ subItem.action }}</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>

                    </v-list-group>
                </v-list>
            </v-menu>

        </span>
        <!--
            <v-btn color="success">
                View Orders
            </v-btn>
-->
    </v-subheader>
    <hr style="margin-top:-5px;" />
    <br>
    <v-row>
        <v-col lg="7" cols="12">
            <!--
                <v-alert dense text type="success">
                    Login successfully! Welcome to <strong>Inventory Management System</strong>
                </v-alert>
-->
<!--
            <v-row>
                <v-col lg="6" cols="12" v-for="(item,index) in activityLog" :key="index">
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">{{ item.title }}</div>
                                <span class="card-amount">{{item.amount}}</span>
                            </div>
                            <v-icon style="color:#45E1E9; font-size:100px; margin-left:20px; margin-bottom:-20px; ">{{ item.icon }}</v-icon>
                            
                            <v-avatar size="60" :color="item.color" style="border: 3px solid white">
                                <span style="color: white">{{item.amount}} +</span>
                            </v-avatar>
                            
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            
        
            -->
            <v-row>
                <v-col lg="6" cols="12" >
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Assets</div>
                                <span class="card-amount">{{Assets.length}}</span>
                            </div>
                            <v-icon style="color:#45E1E9; font-size:100px; margin-left:20px; margin-bottom:-20px; ">mdi-text-box-multiple</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="6" cols="12" >
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Licenses</div>
                                <span class="card-amount">n/a</span>
                            </div>
                            <v-icon style="color:#45E1E9; font-size:100px; margin-left:20px; margin-bottom:-20px; ">mdi-content-save</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="6" cols="12" >
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Accessories</div>
                                <span class="card-amount">{{Accessories.length}}</span>
                            </div>
                            <v-icon style="color:#45E1E9; font-size:100px; margin-left:20px; margin-bottom:-20px; ">mdi-keyboard</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="6" cols="12" >
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Employees</div>
                                <span class="card-amount">{{Users.length}}</span>
                            </div>
                            <v-icon style="color:#45E1E9; font-size:100px; margin-left:20px; margin-bottom:-20px; ">mdi-account-group-outline</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>

        </v-col>

        <v-col cols="12" lg="5">
            <v-card>
                <v-card-title style="color:#028AD3;">Deployed Assets</v-card-title>

            </v-card>

        </v-col>

    </v-row>

    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <span style="margin-left: 15px; color:#028AD3;"><strong> Recent Activity </strong></span>
                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <!--
                    <template v-slot:item.action="">
                        <v-btn color="success" outlined small shaped>View</v-btn>
                    </template>
-->
                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

</div>
</template>

<script>
import axios from "axios";
export default {
    name: "Dashboard",
    data() {
        return {
            activityLog: [{
                    title: 'Total Assets',
                    amount: '5,234',
                    icon: 'mdi-text-box-multiple',

                },
                {
                    title: 'Total Licenses',
                    amount: '432',
                    icon: 'mdi-content-save',

                },
                {
                    title: 'Total Accessories',
                    amount: '2,351',
                    icon: 'mdi-keyboard',

                },
                {
                    title: 'Total Employees',
                    amount: '1,052',
                    icon: 'mdi-account-group-outline',

                },

            ],
            headers: [

                {
                    text: 'Date',
                    value: 'date'
                },
                {
                    text: 'Action',
                    value: 'action'
                },
                {
                    text: 'Item',
                    value: 'item'
                },
                {
                    text: 'Assignee',
                    value: 'assignee'
                },
                //{text: 'Actions', value: 'action'},
            ],
            recents: [{
                    date: 'MM-DD-YYYY',
                    action: 'action_1',
                    item: "Item Model Type / Name 1",
                    assignee: 'Employee_1',
                },
                {
                    date: 'MM-DD-YYYY',
                    action: 'action_2',
                    item: "Item Model Type / Name 2",
                    assignee: 'Employee_2',
                },
            ],
            items: [{
                //action: 'restaurant',
                title: 'People',
                active: false,
                items: [{
                        title: 'Admin'
                    },
                    {
                        title: 'Employee'
                    }
                ]
            }],
            links: [
                ["Asset"],
                ["License"],
                ["Accessories"],
            ],
            UsersData: {
                user_id: null,
            },
            Users: [],
            Assets: [],
            Accessories: [],
            assetRTD: [],
            assetDeployed: [],
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
        this.getAllAssets();
        this.getAllAccessory();
        this.getAllAssetRTD();
        this.getAllAssetDeployed();
    },
    methods: {
        onButtonClick(item) {
            console.log('click on ' + item.no)
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
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallasset"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Assets = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAccessory() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallaccessory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Accessories = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssetRTD() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallassetRTD"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.assetRTD = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssetDeployed() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=getallassetDeployed"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.assetDeployed = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },

}
</script>

<style scoped>
.overlap-icon {
    position: absolute;
    top: -33px;
    text-align: center;
    padding-top: 12px;
}

.dashboard {
    margin-top: -15px;
}

.cards-db {
    background-image: linear-gradient(to right, #028AD3, #19E1E5);
    padding: 20px 30px 20px 20px
}

.card-title {
    color: white;
}

.card-amount {
    font-size: 30px;
    font-family: arial black;
    margin-top: 50px;
    color: white;
}

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
</style>
