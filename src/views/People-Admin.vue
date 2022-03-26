<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>People </strong><span style="font-size:16px;"> list of all admins</span></h3>
        <span>
        <button type="button" class="btn btn-light btn-subheader">Export</button>
        <button type="button" class="btn btn-light btn-subheader" >Show Deleted</button>
        <button type="button" class="btn btn-light btn-subheader-third">Create New</button>
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;"/>
    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit Employee">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete Employee">mdi-delete</v-icon></button>
                        
                    </template>
                   
                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

</div>
</template>

<script>
export default {
    name: 'assets',
    data() {
        return {
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
                    text: <v-icon>mdi-text-box-multiple</v-icon>,
                    value: 'assets'
                },
                {
                    text: <v-icon>mdi-content-save</v-icon>,
                    value: 'licenses'
                },
                {
                    text: <v-icon>mdi-keyboard</v-icon>,
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
                accessories:3,
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
                accessories:0,
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
                accessories:1,
            },
            ],
        }
    },
}
</script>
<style scoped>
.btn-subheader{
    background:#028AD3;
    color:white;
    padding: 2px 15px;
    border-radius: 0px;
    margin-right: 10px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}
.btn-subheader-third{
    background-image: linear-gradient(to right, #028AD3 , #19E1E5);
    color:white;
    padding: 2px 15px;
    border-radius: 0px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}
.dashboard{
    margin-top: -20px;
}
</style>