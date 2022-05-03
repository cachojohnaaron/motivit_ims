<template>
<div class="dashboard">
    <Sidebar />
    <Topbar/>

    <h6 class="page-header"><strong>Accessories </strong></h6>
    <v-row>
        <div class="card-buttons d-flex justify-space-between">
            <span class="page-buttons">
                <span>
                    <input type="text" v-model="search" class="form-control mb-3" id="search" placeholder="Type to search.."/>
                    <v-icon color="gray" class="search-icon">mdi-magnify</v-icon>
                </span> &nbsp;
                <span class="pt-3" v-if="isSearching">
                    <v-chip class="blue lighten-5" style="height:25px;">
                        <v-progress-circular indeterminate color="primary" size="15"></v-progress-circular>&nbsp;
                        <v-text style="color:blue; font-size:11px;">Processing Data..</v-text>
                    </v-chip>
                </span>
            </span>
            <span class="page-buttons">
                <!--
                <button type="button" class="btn btn-light btn-subheader" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
                -->
                <button type="button" class="btn btn-light btn-subheader" @click="goDeleted()">Archives</button>
                <button type="button" class="btn btn-light btn-subheader-third" @click="openAddForm()" data-toggle="modal" data-target="#add-accessory" data-backdrop="static" data-keyboard="false">Create New</button>
            </span>
        </div>
    </v-row>

    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <v-row>
        <div id="tblUser" class="card" >
            <div class="table-responsive-sm" >
                <div class="d-flex justify-content-end">
                <!-- Pagination and Rows -->
                
                <div class="row align-items-center pagination-buttons"> 
                    <label class="rows-per-page-label">Rows per page:</label>
                    <div class="d-grid">
                        <select class="custom-select form-control-sm rows-per-page-select" name="rows" id="rows" v-model.lazy="pageSize">
                            <option value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <div class="row pt-2">
                        <div class="col-auto ms-auto">
                            <p class="pe-5">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination pagination-sm">
                                        <li class="page-item">
                                            <a class="page-link page-link-lr" @click="prevPage" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link page-link-mid">{{ page }}</a></li>
                                        <li class="page-item">
                                            <a class="page-link page-link-lr" @click="nextPage" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Table List -->
            <table id="tblAccessoryAll" class="table-sm table-hover" ref="table" :data="data">
                <thead class="">
                    <tr>
                        <th @click="sort('acs_id')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Accessory ID</th>
                        <th @click="sort('acs_name')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Name</th>
                        <th @click="sort('acs_category')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Category</th>
                        <th @click="sort('acs_manufacturer')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Manufacturer</th>
                        <th @click="sort('quantity')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort
Orange: items <= 5
Red: items = 0">Quantity</th>
                        <th @click="sort('location')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="acs in filteredAccessory" :key="acs">
                        <tr v-for="acs in sortedAccessory" :key="acs">
                            <td v-html="highlightMatches(acs.acs_id)">{{ acs.acs_id }}</td>
                            <td v-html="highlightMatches(acs.acs_name)">{{ acs.acs_name }}</td>
                            <td v-html="highlightMatches(acs.acs_category)">{{ acs.acs_category }}</td>
                            <td v-html="highlightMatches(acs.acs_manufacturer)">{{ acs.acs_manufacturer }}</td>
                            <v-chip :color="getColor(acs.quantity)" style="font-size:11px; height:20px; padding-left:1px; padding-right:1px; margin-top:5px;">
                                <td v-html="highlightMatches(acs.quantity)">{{ acs.quantity }}</td>
                            </v-chip>
                            <td v-html="highlightMatches(acs.location)">{{ acs.location }}</td>
                            <td>
                                <button class="btn-sm btn-action" @click="showDeployModal(acs)" modal-no-backdrop data-toggle="modal" data-target="#deploy-accessory" data-backdrop="static" data-keyboard="false">
                                    <v-icon color="warning" title="Deploy Accessory" style="font-size:16px;">mdi-rocket-launch</v-icon>
                                </button>
                                <button class="btn-sm btn-action" @click="showModal(acs)" modal-no-backdrop data-toggle="modal" data-target="#upd-accessory" data-backdrop="static" data-keyboard="false">
                                    <v-icon color="success" title="Edit Accessory" style="font-size:16px;">mdi-pencil</v-icon>
                                </button>
                                <button class="btn-sm btn-action"  @click="showModalDelete(acs)" modal-no-backdrop data-toggle="modal" data-target="#delete-accessory">
                                    <v-icon color="red" title="Delete Accessory" style="font-size:16px;">mdi-delete</v-icon>
                                </button>
                            </td>
                        </tr>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </v-row>

    <!-- Export Options Modal -->
    <div class="modal fade modal-update-asset" id="exp-options" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-accessory" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Export Date Range -->
                    <label>Custom Date Range:</label>
                    <div class="row align-items-center">
                        <div class="d-grid col-6">
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>From</small></span>
                                <input type="date" class="start-date form-control" id="fromDate" name="fromDate" aria-describedby="addon-wrapping">
                            </div>
                        </div>
                        <div class="d-grid col-6">
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>To</small></span>
                                <input type="date" class="end-date form-control" id="toDate" name="toDate" aria-describedby="addon-wrapping">
                            </div>
                        </div>
                    </div>
                    <!-- Export Options (xlsx/jspdf) -->
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

    <!-- Update Accessory Modal -->
    <div class="modal fade modal-update-asset" id="upd-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update Accessory Information</h6>
                    <button type="button" class="close" @click="cancelModal()" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">
                        <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>&nbsp;Accessory record updated!
                    </div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">
                        <v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> *</span>
                    </div>
                    <form name="updAccessory" action="" method="POST">
                        <b-modal id="upd-accessory" hide-backdrop no-close-on-backdrop hide-footer content-class="shadow" title="Update Accessory Information">

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_id"><b>Accessory ID<span style="color: red;"> *</span></b></label>
                                    <input type="text" name="acs_id" class="form-control mb-3" id="acs_id" placeholder="" readonly v-model.lazy="UsersData.acs_id" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_name"><b>Accessory Name<span style="color: red;"> *</span></b></label>
                                    <input type="text" name="acs_name" class="form-control mb-3" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_category"><b>Category<span style="color: red;"> *</span></b></label>
                                    <select name="acs_category" id="acs_category" class="form-control mb-3" v-model.lazy="UsersData.acs_category" style="height:23px; padding-top:0; padding-bottom:0;">
                                        <option value='0'> -- Select Category -- </option>
                                        <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_manufacturer"><b>Manufacturer<span style="color: red;"> *</span></b></label>
                                    <input type="text" name="acs_manufacturer" class="form-control mb-3" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="location"><b>Location<span style="color: red;"> *</span></b></label>
                                    <input type="text" name="location" class="form-control mb-3" id="location" placeholder="" v-model.lazy="UsersData.location" />
                                </div>
                                <div class="form-group mb-2" style="width:100px;">
                                    <label for="quantity"><b>Quantity<span style="color: red;"> *</span></b></label>
                                    <input type="number" name="quantity" class="form-control mb-3" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                                </div>
                            </div>

                            <hr>
                            <div class="modal-bottom">
                                <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                                <button class="ms-2 mb-3 btn btn-primary" block @click.prevent="updateAccessory()">Save Changes</button>
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
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">
                        <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Accessory deployed.
                    </div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">
                        <v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                    </div>
                    <form name="" action="" method="POST">
                        <b-modal id="modalDeployAccessory" hide-backdrop no-close-on-backdrop hide-footer content-class="shadow" title="Deploy Accessory">

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_id"><b>Accessory ID</b></label>
                                    <input type="text" name="acs_id" class="form-control mb-3" id="acs_id" placeholder="" readonly v-model.lazy="UsersData.acs_id" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_name"><b>Accessory Name</b></label>
                                    <input type="text" name="acs_name" class="form-control mb-3" id="acs_name" placeholder="" readonly v-model.lazy="UsersData.acs_name" />
                                </div>
                                <div class="form-group mb-2">
                                    <label for="acs_category"><b>Category</b></label>
                                    <input type="text" name="acs_category" class="form-control mb-3" id="acs_category" placeholder="" readonly v-model.lazy="UsersData.acs_category" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group mb-2">
                                    <label for="acs_manufacturer"><b>Manufacturer</b></label>
                                    <input type="text" name="acs_manufacturer" class="form-control mb-3" id="acs_manufacturer" placeholder="" readonly v-model.lazy="UsersData.acs_manufacturer" />
                                </div>

                                <div class="form-group mb-2">
                                    <label for="location"><b>Location</b></label>
                                    <input type="text" name="location" class="form-control mb-3" id="location" placeholder="" readonly v-model.lazy="UsersData.location" />
                                </div>
                                <div class="form-group mb-2" style="width:100px;">
                                    <label for="quantity"><b>Quantity</b></label>
                                    <input type="number" name="quantity" class="form-control mb-3" id="quantity" placeholder="" readonly v-model.lazy="UsersData.quantity" />
                                </div>
                            </div>

                            <hr>

                            <div class="form-group">
                                <label for="employee"><b>Deploy To:<span style="color: red;"> *</span></b></label>
                                <select name="employee" id="employee" class="form-control" v-model.lazy="UsersData.employee" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value="1">-- Select Employee --</option>
                                    <option v-for='data in Employees' :value='data.emp_id'>{{ data.name }}</option>
                                </select>
                            </div>

                            <hr>
                            <div class="modal-bottom">
                                <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                                <button class="ms-2 mb-3 btn btn-warning" block @click.prevent="deployAccessory()">Deploy</button>
                            </div>

                        </b-modal>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Accessory Modal -->
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
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">
                        <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New accessory record added.
                    </div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">
                        <v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                    </div>

                    <form action="" method="POST" id="myForm">

                        <div class="form-row">
                            <div class="form-group">
                                <label for="acs_name"><b>Accessory Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="acs_name" class="form-control" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                            </div>
                            <div class="form-group">
                                <label for="location"><b>Location<span style="color: red;"> *</span></b></label>
                                <input type="text" name="location" class="form-control" id="location" placeholder="" v-model.lazy="UsersData.location" />
                            </div>
                            <div class="form-group">
                                <label for="acs_manufacturer"><b>Manufacturer<span style="color: red;"> *</span></b></label>
                                <input type="text" name="acs_manufacturer" class="form-control" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="acs_category"><b>Category<span style="color: red;"> *</span></b></label>
                                <select name="acs_category" id="acs_category" class="form-control" v-model.lazy="UsersData.acs_category" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Category -- </option>
                                    <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                            <div class="form-group" style="width:100px;">
                                <label for="quantity"><b>Quantity<span style="color: red;"> *</span></b></label>
                                <input type="number" name="quantity" class="form-control" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                            </div>
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm" block @click.prevent="AddAccessory()">Add Accessory</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

     <!--Modal For Delete Accessory Modal-->
    <div class="modal fade modal-update-asset" id="delete-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Delete Accessory</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Accessory record moved to archives.</div>
                
                    <form action="" method="POST">

                        <div style="display:none">
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="asset_id"><b>Accessory ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.acs_id" />
                                </div>
                            </div>

     
                        </div>

                        <div style="text-align: center;">
                            <h6 class="rtn-modal-title">Are you sure you want to delete this accessory?</h6>
                        </div>
                        <br>

                        <hr>
                       

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-confirm" style="background: rgb(163, 4, 4); color: white;" block @click.prevent="DeleteAccessory()">Confirm</b-button>
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
import {
    debounce
} from "lodash";
import axios from "axios";
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
export default {
    name: 'accessory',
    data() {
        return {
            /*Pagination*/
            page: 1,
            perPage: 10,
            currentPage: 1,
            pageSize:5,
            search: "",
            isSearching: false,
            pages:5,
            /*Table Sorting*/
            currentSort:'acs_id',
            currentSortDir:'desc',
            ascSort: true,
            alertSuccess: null,
            alertError: null,
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
            filteredAccessory: [],
        };
    },
    components: {
        Topbar,
        Sidebar
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
    watch: {
        search: {
            handler(search) {
                this.setAccessoriesDebounced(search)
            },
            immediate: true,
        }
    },
    methods: {
        getColor(quantity) {
            if (quantity <= 5 && quantity >=1) return 'orange'
            else if (quantity == 0) return '#EB6363'
            else return 'rgba(255, 0, 0, 0.0)'
        },
        showModal(user_id) {
            this.UsersData = user_id;
        },
        showDeployModal(user_id) {
            this.UsersData = user_id;
        },
        showModalDelete(softID) {
            this.UsersData = softID;
        },
        cancelModal() {
            window.location.reload();
        },
        updateAccessory() {
            if (!this.UsersData.acs_name || !this.UsersData.acs_category || !this.UsersData.acs_manufacturer || !this.UsersData.quantity || !this.UsersData.location) {
                this.alertError = true;
            } else {
                let data = new FormData();
                data.append("acs_id", this.UsersData.acs_id);
                data.append("acs_name", this.UsersData.acs_name);
                data.append("acs_category", this.UsersData.acs_category);
                data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
                data.append("quantity", this.UsersData.quantity);
                data.append("location", this.UsersData.location);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=updateAccessory', data).then((res) => {
                    if (res.data.error) {
                        alert("Error");
                        window.location.reload();
                    } else {
                        this.alertError = false;
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessory"
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
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddEmployee"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Employees = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        DeleteAccessory() {
            let data = new FormData();
            //this.UsersData = user_id;
            data.append("id", this.UsersData.acs_id);

            axios
                .post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAccessory", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                        this.getAllAccessories();
                    }
                })
        },
        deployAccessory() {
            if (!this.UsersData.employee) {
                this.alertError = true;
            } else {
                let data = new FormData();
                data.append("acs_id", this.UsersData.acs_id);
                data.append("emp_id", this.UsersData.employee);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=deployAccessory', data).then((res) => {
                    if (res.data.error) {
                        alert("Error");
                    } else {
                        this.alertError = false;
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);

                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },

        /**FROM AddAccessory.vue */
        Reset() {
            this.UsersData.acs_name = "";
            this.UsersData.acs_category = "";
            this.UsersData.acs_manufacturer = "";
            this.UsersData.quantity = "";
            this.UsersData.location = "";
        },
        openAddForm() {
            this.Reset();
            this.alertError = false;
        },
        AddAccessory() {
            if (!this.UsersData.acs_name || !this.UsersData.acs_category || !this.UsersData.acs_manufacturer || !this.UsersData.quantity || !this.UsersData.location) {
                this.alertError = true;
            } else {
                let data = new FormData();
                data.append("acs_name", this.UsersData.acs_name);
                data.append("acs_category", this.UsersData.acs_category);
                data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
                data.append("quantity", this.UsersData.quantity);
                data.append("location", this.UsersData.location);
                axios
                    .post(
                        "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addaccessory",
                        data
                    )
                    .then((res) => {
                        if (res.data.error) {
                            alert(res.data.message);
                        } else {
                            this.alertError = false;
                            this.alertSuccess = true;
                            setTimeout(function () {
                                window.location.reload()
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        getDropdowns() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddAccessoryCategory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Category = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goDeleted() {
            this.$router.push('/accessories/archived');
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')

            var y = 20;
            doc.text(135, y = y + 15, "ALL ACCESSORY RECORD"); /* x-align = 125 */
            doc.autoTable({
                html: '#tblAccessoryAll',
                startY: 50,
                styles: {
                    cellWidth: 'wrap'
                },
                columnStyles: {
                    1: {
                        columnWidth: 'auto'
                    }
                },
                columns: [{
                        header: 'asset_id'
                    },
                    {
                        header: 'asset_tag'
                    },
                    {
                        header: 'serial_no'
                    },
                    {
                        header: 'category'
                    },
                    {
                        header: 'model'
                    },
                    {
                        header: 'status'
                    },
                    {
                        header: 'purhase_date'
                    },
                    {
                        header: 'supplier'
                    },
                    {
                        header: 'location'
                    },

                ],
            });
            doc.save('Report-Accessory_All.pdf')
        },
        /*Table Pagination*/
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.filteredAccessory.length) this.currentPage++;
            this.page=this.currentPage;
        },
        prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
            this.page=this.currentPage;
        },
        /*Table Sorting*/
        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='desc'?'asc':'desc';
            } this.currentSort = s;
        },
        setAccessoriesDebounced: debounce(function (search) {
            this.isSearching = true;
            setTimeout(function () {
                this.isSearching = false;
                this.filteredAccessory = this.Accessory.filter(acs =>
                    acs.acs_id.toLowerCase().includes(search.toLowerCase()) ||
                    acs.acs_name.toLowerCase().includes(search.toLowerCase()) ||
                    acs.acs_category.toLowerCase().includes(search.toLowerCase()) ||
                    acs.acs_manufacturer.toLowerCase().includes(search.toLowerCase()) ||
                    acs.quantity.toLowerCase().includes(search.toLowerCase()) ||
                    acs.location.toLowerCase().includes(search.toLowerCase())
                );
            }.bind(this), 1000);
        }, 2000),
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.search.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.search, 'ig');
            return text.replace(re, matchedText => `<b style="background-color: yellow;">${matchedText}</b>`);
        }
    },
    computed: {
        sortedAccessory: function() {
            return this.filteredAccessory.filter((row, index) => {
                let start = (this.currentPage-1)*this.pageSize;
                let end = this.currentPage*this.pageSize;
                if(index >= start && index < end) return true;
            }).sort((a,b) => {
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            });
        }
    }
};
</script>

<style scoped>


.dashboard {
    margin-top: -20px;
}

label,
input,
textarea,
select {
    font-size: 11px;
}

th.pointer {
    cursor: pointer;
}

input {
    height: 23px;
    width: 100%;
}

.form-group {
    width: 150px;
    margin-top: -10px;
}

.btn-primary,
.btn-secondary,
.btn-warning,
.btn-confirm {
    height: 25px;
    padding: 2px 7px 2px 7px;
}

.modal-header {
    height: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.close {
    height: 20px;
    padding-top: 0;
    margin-top: 0px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 2px;
    text-decoration: none;
}

hr {
    margin-top: -10px;
}
.pagination-buttons{
    height:fit-content; 
    margin-bottom:-10px; 
    padding-left:15px;
    margin-top:5px;
}
.page-link-lr{
    height:20px; padding-top:0;
}
.page-link-mid{
    height:20px; padding-top:2px; font-size:11px; margin-right:-3px; margin-left:-3px;
}
.rows-per-page-select{
    height:20px !important; padding-left:5px; padding-top:0; padding-bottom:0; 
}
.rows-per-page-label{
    font-size:11px; margin-right:10px; margin-top:5px;
}
table{
    margin-top: -15px;
}
</style>
