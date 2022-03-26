<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Assets </strong><span style="font-size:16px;"> list of all assets</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader">Export</button>
            <button type="button" class="btn btn-light btn-subheader">Show Deleted</button>
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-licenses">Create New</button>
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;" />

    <v-row>
        <!-- 
            <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit Asset">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete Asset">mdi-delete</v-icon></button>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        -->
        <!-- eslint-disable -->
        <!-- prettier-ignore -->

        <div id="tblUser" class="card" style="width:100%;">
            <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                <table class="table-sm table-hover" style="width:100%; font-size:13px;">
                    <thead class="">
                        <tr>
                            <th>Asset ID</th>
                            <th>Asset Tag</th>
                            <th>Serial Number</th>
                            <th>Category</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Purchase Date</th>
                            <th>Supplier</th>
                            <th>Location</th>
                            <th>Notes</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in Assets">
                            <td>{{ asset.asset_id }}</td>
                            <td>{{ asset.asset_tag }}</td>
                            <td>{{ asset.serialno }}</td>
                            <td>{{ asset.category }}</td>
                            <td>{{ asset.model }}</td>
                            <td>{{ asset.status }}</td>
                            <td>{{ asset.purchase_date }}</td>
                            <td>{{ asset.supplier }}</td>
                            <td>{{ asset.asset_location }}</td>
                            <td>{{ asset.notes }}</td>
                            <td>
                                <button class="btn-sm" @click="showModal(asset)" modal-no-backdrop data-toggle="modal" data-target="#upd-licenses">
                                    <v-icon color="success" title="Edit Asset" style="font-size:16px;">mdi-pencil</v-icon>
                                </button>
                                <button class="btn-sm" @click="DeleteAsset(asset)">
                                    <v-icon color="red" title="Delete Asset" style="font-size:16px;">mdi-delete</v-icon>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-row>

    <!-- Modal For Update Asset Information-->
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

                        <div style="text-align:center;border: 1px solid green; width:100%;">
                            <b-alert variant="success" :show="successAlert">Asset Record Updated</b-alert>
                        </div><br>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="asset_id"><b>Asset ID</b></label>
                                <input type="text" name="asset_id" class="form-control" id="asset_id" placeholder="" v-model.lazy="UsersData.asset_id" />
                            </div>
                            <div class="form-group">
                                <label for="asset_tag"><b>Asset Tag</b></label>
                                <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                            </div>
                            <div class="form-group">
                                <label for="serialno"><b>Serial No.</b></label>
                                <input type="text" name="serialno" class="form-control mb-3" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="model"><b>Model</b></label>
                                <input type="text" name="model" class="form-control mb-3" id="model" placeholder="" v-model.lazy="UsersData.model" />
                            </div>
                            <div class="form-group">
                                <label for="status"><b>Status</b></label>
                                <input type="text" name="status" class="form-control mb-3" id="status" placeholder="" v-model.lazy="UsersData.status" />
                            </div>
                            <div class="form-group">
                                <label for="category"><b>Category</b></label>
                                <input type="text" name="category" class="form-control mb-3" id="category" placeholder="" v-model.lazy="UsersData.category" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="supplier"><b>Supplier</b></label>
                                <input type="text" name="supplier" class="form-control mb-3" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                            </div>
                            <div class="form-group">
                                <label for="asset_location"><b>Location</b></label>
                                <input type="text" name="asset_location" class="form-control mb-3" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                            </div>
                            <div class="form-group">
                                <label for="purchase_date"><b>Purchase Date</b></label>
                                <input type="date" name="purchase_date" class="form-control mb-3" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="notes"><b>Notes</b></label>
                            <textarea type="text" name="notes" class="form-control mb-3" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
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

    <!--Modal For Create New Asset-->
    <div class="modal fade modal-update-asset" id="add-licenses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" method="POST" id="myForm">
            <div class="form-row">
              <div style="text-align:center; border: 1px solid green; width:100%;">
                <b-alert variant="success" :show="successAlert">Asset Record Added</b-alert>
              </div>
            </div>
            <br>
            <div class="form-row">
                <div class="form-group">
                    <label for="asset_tag"><b>Asset Tag</b></label>
                    <input type="text" name="asset_tag" class="form-control" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                </div>

                <div class="form-group">
                    <label for="serialno"><b>Serial Number</b></label>
                    <input type="text" name="serialno" class="form-control" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                </div>

                <div class="form-group">
                    <label for="model"><b>Model</b></label>
                    <input type="text" name="model" class="form-control" id="model" placeholder="" v-model.lazy="UsersData.model" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="status"><b>Status</b></label>
                    <select name="status" id="status" class="form-control" v-model.lazy="UsersData.status">
                        <option value='0'> -- Select Status -- </option>
                        <option v-for='data in Status' :value='data.choice'>{{ data.choice }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="category"><b>Category</b></label>
                    <select name="category" id="category" class="form-control" v-model.lazy="UsersData.category">
                        <option value='0'> -- Select Category -- </option>
                        <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="purchase_date"><b>Purchase Date</b></label>
                    <input type="date" name="purchase_date" class="form-control" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="supplier"><b>Supplier</b></label>
                    <input type="text" name="supplier" class="form-control" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                </div>
                <div class="form-group">
                    <label for="asset_location"><b>Asset Location</b></label>
                    <input type="text" name="asset_location" class="form-control" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                </div>
            </div>
            <div class="form-group">
                <label for="notes"><b>Notes</b></label>
                <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
            </div>

               <hr>
            <div style="width:100%; text-align:right;">
                <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                <b-button v-show="btnAdd" class=" ms-2 mb-3 btn btn-primary"  @click="AddAsset()">Add Asset</b-button>
            </div>

        </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Update Asset Modal
    <b-modal id="upd-licenses" hide-backdrop no-close-on-backdrop hide-footer content-class="shadow" title="Update Asset Information">
        <form name="updLicense" action="" method="POST">

            <div style="text-align:left;">
                <b-alert variant="success" :show="successAlert">Asset Record Updated</b-alert>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="asset_id"><b>Asset ID</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" v-model.lazy="UsersData.asset_id" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="asset_tag"><b>Asset Tag</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="serialno"><b>Serial No.</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="serialno" class="form-control mb-3" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="model"><b>Model</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="model" class="form-control mb-3" id="model" placeholder="" v-model.lazy="UsersData.model" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="status"><b>Status</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="status" class="form-control mb-3" id="status" placeholder="" v-model.lazy="UsersData.status" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="category"><b>Category</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="category" class="form-control mb-3" id="category" placeholder="" v-model.lazy="UsersData.category" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="purchase_date"><b>Purchase Date</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="purchase_date" class="form-control mb-3" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="supplier"><b>Supplier</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="supplier" class="form-control mb-3" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="asset_location"><b>Location</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="asset_location" class="form-control mb-3" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-auto">
                    <label for="notes"><b>Notes</b></label>
                </div>
                <div class="col-auto">
                    <input type="text" name="notes" class="form-control mb-3" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                </div>
            </div>

            <hr>
            <b-button class="mt-3 mb-3" block @click="cancelModal()">Cancel</b-button>
            <b-button class="mt-3 ms-2 mb-3" variant="primary" block @click="updateLicense()">Save</b-button>

        </form>
    </b-modal>
    -->
</div>
</template>

<script>
/**
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

 */

import axios from "axios";
export default {
    name: "asset",
    data() {
        return {
            btnAdd: true,
            successAlert: false,
            UsersData: {
                user_id: null,

                /**From AddAsset.vue */
                asset_tag: null,
                serialno: null,
                model: null,
                status: null,
                category: null,
                purchase_date: null,
                supplier: null,
                notes: null,
                asset_location: null
                /**From AddAsset.vue */
            },
            Assets: [],
            /**From AddAsset.vue */
            Users: [],
            Category: [],
            Status: [],
            /**From AddAsset.vue */
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
        this.getDropdownCat();
        this.getDropdownStatus();
    },
    methods: {
        showModal(softID) {
            this.UsersData = softID;
            this.$bvModal.show('upd-licenses')
        },
        cancelModal() {
            this.$bvModal.hide('upd-licenses')
        },
        updateLicense() {
            let data = new FormData();
            data.append("asset_id", this.UsersData.asset_id);
            data.append("asset_tag", this.UsersData.asset_tag);
            data.append("serialno", this.UsersData.serialno);
            data.append("model", this.UsersData.model);
            data.append("status", this.UsersData.status);
            data.append("category", this.UsersData.category);
            data.append("purchase_date", this.UsersData.purchase_date);
            data.append("supplier", this.UsersData.supplier);
            data.append("notes", this.UsersData.notes);
            data.append("asset_location", this.UsersData.asset_location);

            axios.post('http://localhost/motivit/IMS/src/Api/api.php?action=updateAsset', data).then((res) => {
                if (res.data.error) {
                    alert("Error");
                } else {
                    //alert(res.data.message);
                    this.successAlert = true;
                    this.getAllAssets();
                }
            }).catch((err) => {
                console.log(err);
            })
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
        DeleteAsset(user_id) {
            let data = new FormData();
            this.UsersData = user_id;
            data.append("id", this.UsersData.asset_id);

            axios
                .post("http://localhost/motivit/IMS/src/Api/api.php?action=disableAsset", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {

                        alert(res.data.message);
                        this.getAllAssets();
                    }
                })
        },
        /**From AddAsset.vue */
        Reset() {
            this.UsersData.asset_tag = "";
            this.UsersData.serialno = "";
            this.UsersData.model = "";
            this.UsersData.status = "";
            this.UsersData.category = "";
            this.UsersData.purchase_date = "";
            this.UsersData.supplier = "";
            this.UsersData.notes = "";
            this.UsersData.asset_location = "";
        },
        AddAsset() {
            let data = new FormData();
            data.append("asset_tag", this.UsersData.asset_tag);
            data.append("serialno", this.UsersData.serialno);
            data.append("model", this.UsersData.model);
            data.append("status", this.UsersData.status);
            data.append("category", this.UsersData.category);
            data.append("purchase_date", this.UsersData.purchase_date);
            data.append("supplier", this.UsersData.supplier);
            data.append("notes", this.UsersData.notes);
            data.append("asset_location", this.UsersData.asset_location);
            //this.Check();
            axios
                .post(
                    "http://localhost/motivit/IMS/src/Api/api.php?action=addasset",
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
        getDropdownCat() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/dropdown.php?action=ddCategory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Category = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDropdownStatus() {
            axios
                .get(
                    "http://localhost/motivit/IMS/src/Api/dropdown.php?action=ddStatus"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Status = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**From AddAsset.vue */
    },
};
</script>

<style scoped>


textarea {
    height: 50px !important;
    width: 410px;
    resize: none;
}


</style>
