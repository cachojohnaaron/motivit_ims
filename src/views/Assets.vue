<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Assets </strong><span style="font-size:16px;"> list of all assets</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
            <button type="button" class="btn btn-light btn-subheader">Show Deleted</button>
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-licenses" @click="Reset()" data-backdrop="static" data-keyboard="false">Create New</button>
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
                <table id="tblAllAsset" class="table-sm table-hover" style="width:100%; font-size:13px;">
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
                                <button class="btn-sm" @click="showModal(asset)" modal-no-backdrop data-toggle="modal" data-target="#upd-licenses" data-backdrop="static" data-keyboard="false">
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
                    <button type="button" @click="cancelModal()" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="updLicense" action="" method="POST">

                        <br>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="asset_id"><b>Asset ID</b></label>
                                <input type="text" name="asset_id" class="form-control" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                            </div>
                            <div class="form-group">
                                <label for="asset_tag"><b>Asset Tag</b></label>
                                <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                            </div>
                            <div class="form-group">
                                <label for="serialno"><b>Serial No.</b></label>
                                <input type="number" name="serialno" class="form-control mb-3" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="model"><b>Model</b></label>
                                <input type="text" name="model" class="form-control mb-3" id="model" placeholder="" v-model.lazy="UsersData.model" />
                            </div>
                            <div class="form-group">
                                <label for="status"><b>Status</b></label>
                                <select name="status" id="status" class="form-control mb-3" v-model.lazy="UsersData.status">
                                    <option value='0'> -- Select Status -- </option>
                                    <option v-for='data in Status' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="category"><b>Category</b></label>
                                <select name="category" id="category" class="form-control mb-3" v-model.lazy="UsersData.category">
                                    <option value='0'> -- Select Category -- </option>
                                    <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                                </select>
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
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click="updateLicense()">Save Changes</button>
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
            <br>
            <div class="form-row">
                <div class="form-group">
                    <label for="asset_tag"><b>Asset Tag</b></label>
                    <input type="text" name="asset_tag" class="form-control" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                </div>

                <div class="form-group">
                    <label for="serialno"><b>Serial Number</b></label>
                    <input type="number" name="serialno" class="form-control" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
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
                <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                <button v-show="btnAdd" class=" ms-2 mb-3 btn btn-primary"  @click="AddAsset()">Add Asset</button>
            </div>

        </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Export Options Modal -->
    <div class="modal fade modal-update-asset" id="exp-options" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--<form name="exportOptions" method="POST">-->
                        <label>Custom Date Range:</label>
                        <div class="row align-items-center"> 
                            <div class="d-grid col-6">
                            <input-group prepend="from" class="mt-3">
                                <input type="date" class="start-date form-control">
                            </input-group>
                            </div>
                            <div class="d-grid col-6">
                            <input-group prepend="to" class="mt-3">
                                <input type="date" class="end-date form-control">
                            </input-group>
                            </div>
                        </div>
                        <label class="mt-3">Export Options:</label>
                        <div class="row align-items-center"> 
                            <div class="d-grid col-6">
                            <button class="btn btn-primary btn-block" v-on:click="exportPDF('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                            <button class="btn btn-primary btn-block" @click="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>
                    <!--</form>-->
                </div>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
export default {
    name: "asset",
    data() {
        return {
            btnAdd: true,
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
            window.location.reload();
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

            axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=updateAsset', data).then((res) => {
                if (res.data.error) {
                    alert("Error");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                    window.location.reload();
                    this.getAllAssets();
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallasset"
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
                .post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAsset", data)
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
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addasset",
                    data
                )
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message);
                    } else {
                        alert(res.data.message);
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDropdownCat() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddCategory"
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
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddStatus"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Status = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 15, "ALL ASSETS RECORD"); /* x-align = 125 */
            doc.autoTable({ html: '#tblAllAsset',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [
                                { header: 'asset_id' },
                                { header: 'asset_tag' },
                                { header: 'serial_no' },
                                { header: 'category' },
                                { header: 'model' },
                                { header: 'status' },
                                { header: 'purhase_date' },
                                { header: 'supplier' },
                                { header: 'location' },

                            ],
                            });
            doc.save('Report-Asset_All.pdf')
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
