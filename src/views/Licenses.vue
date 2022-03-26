<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Licenses </strong><span style="font-size:16px;"> list of licenses</span></h3>
        <span>
        <button type="button" class="btn btn-light btn-subheader">Export</button>
        <button type="button" class="btn btn-light btn-subheader" >Show Deleted</button>
        <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-license">Create New</button>
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;"/>


    <!--ADD License Modal -->
    <!-- eslint-disable -->
    <!-- prettier-ignore 
    <div class="modal fade modal-update-asset" id="add-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add License</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" method="POST" id="myForm">
                        <div class="form-row">

                        <div style="text-align:left;">
                            <b-alert variant="success" :show="successAlert">License Added</b-alert>
                        </div>

                            <div class="form-group">
                                <label for="lname"><b>Employee Lastname</b></label>
                                <input type="text" name="lname" class="form-control" id="lname" placeholder="" v-model.lazy="UsersData.lname" />
                            </div>

                            <div class="form-group">
                                <label for="fname"><b>Employee Firstname</b></label>
                                <input type="text" name="fname" class="form-control" id="fname" placeholder="" v-model.lazy="UsersData.fname" />
                            </div>

                            <div class="form-group">
                                <label for="department"><b>Department</b></label>
                                <select name="department" id="department" class="form-control" v-model.lazy="UsersData.department">
                                    <option v-for="dep in Department">
                                        {{dep}}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="email"><b>Email</b></label>
                                <input type="text" name="email" class="form-control" id="email" placeholder="" v-model.lazy="UsersData.email" />
                            </div>

                            <div class="form-group">
                                <label for="notes"><b>Notes</b></label>
                                <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                            </div>
                            <br>
                            
                            <div style="text-align:right;">
                            <button type="button" v-show="btnAdd" class="btn btn-primary btn-sm" @click="AddEmployee()">
                            Add Employee Record
                            </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    -->
    <!--
    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit License">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete License">mdi-delete</v-icon></button>
                    </template>
                   
                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

    -->

</div>
</template>

<script>
export default {
    name: 'assets',
    data() {
        return {
            headers: [{
                    text: 'Asset ID',
                    value: 'asset_id'
                },
                {
                    text: 'Asset Image',
                    value: 'asset_image'
                },
                {
                    text: 'Asset Tag',
                    value: 'asset_tag'
                },
                {
                    text: 'Serial No.',
                    value: 'serial_no'
                },
                {
                    text: 'model',
                    value: 'model'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Category',
                    value: 'category'
                },
                {
                    text: 'Purchase Date',
                    value: 'purchase_date'
                },
                {
                    text: 'Supplier',
                    value: 'supplier'
                },
                {
                    text: 'Location',
                    value: 'location'
                },
                {
                    text: 'Notes',
                    value: 'notes'
                },
                {
                    text: 'Actions',
                    value: 'action'
                },
            ],
            recents: [{
                asset_id: '1',
                asset_image: 'image_1',
                asset_tag: 'asset_tag_1',
                serial_no: 'serial_no_1',
                model: 'model_1',
                status: 'status_1',
                category: 'category_1',
                purchase_date: 'MM-DD-YYYY',
                supplier: 'supplier_1',
                location: 'location_1',
                notes: "notes_1",
                assignee: 'employee_1',
            }, 
            {
                asset_id: '2',
                asset_image: 'image_2',
                asset_tag: 'asset_tag_2',
                serial_no: 'serial_no_2',
                model: 'model_2',
                status: 'status_2',
                category: 'category_2',
                purchase_date: 'MM-DD-YYYY',
                supplier: 'supplier_2',
                location: 'location_2',
                notes: "notes_2",
                assignee: 'employee_2',
            },
            {
                asset_id: '3',
                asset_image: 'image_3',
                asset_tag: 'asset_tag_3',
                serial_no: 'serial_no_3',
                model: 'model_3',
                status: 'status_3',
                category: 'category_3',
                purchase_date: 'MM-DD-YYYY',
                supplier: 'supplier_3',
                location: 'location_3',
                notes: "notes_3",
                assignee: 'employee_3',
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