<template>
<div class="dashboard">
    <Sidebar  />
    <Topbar  />

    <h6 class="page-header"><strong>Assets </strong></h6>
    <v-row>
        <div class="card-buttons d-flex justify-space-between">
            <!-- <div class="d-flex" style="height:2vh">
                <div class="d-grid">
                    <v-text-field v-model="search" outlined prepend-inner-icon="mdi-magnify" label="Search" dense></v-text-field> &nbsp;
                </div>
                <div class="d-grid ms-4"> -->
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
                <!-- </div>
            </div> -->
            <span class="page-buttons">
                <!--
                <button type="button" class="btn btn-light btn-subheader" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
                -->
                <button type="button" class="btn btn-light btn-subheader" @click="goDeleted()">Archives</button>
                <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-licenses" @click="openAddForm()" data-backdrop="static" data-keyboard="false">Create New</button>
            </span>
        </div>
    </v-row>

    <v-row>
        <!-- eslint-disable -->
        <!-- prettier-ignore -->
        <div id="tblUser" class="card" >
            <div class="table-responsive-sm">
                <div class="d-flex justify-content-end">
                    <!-- Pagination and Rows -->
                    
                    <div class="row align-items-center pagination-buttons"> 
                        <label class="rows-per-page-label">Rows per page:</label>
                        <div class="d-grid" >
                            <select class="custom-select form-control-sm rows-per-page-select" name="rows" id="rows" v-model.lazy="pageSize" >
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                 <option value="20">20</option>
                            </select>
                        </div>
                    
                        <div class="row pt-2">
                            <div class="col-auto ms-auto">
                                <p class="pe-5">
                                 
                                    <nav aria-label="Page navigation">
                                        <ul class="pagination pagination-sm" >
                                            <li class="page-item" >
                                                <a class="page-link page-link-lr" @click="prevPage" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li class="page-item"><a class="page-link page-link-mid">{{ page }}</a></li>
                                            <li class="page-item">
                                                <a class="page-link page-link-lr" @click="nextPage" aria-label="Next"  >
                                                    <span aria-hidden="true" >&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <table id="tblAllAsset" class="table-sm table-hover" ref="table" :data="data">
                    <thead class="">
                        <tr>
                            <th @click="sort('asset_id')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Asset ID</th>
                            <th @click="sort('asset_tag')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Asset Tag</th>
                            <th @click="sort('serialno')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Serial Number</th>
                            <th @click="sort('category')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Category</th>
                            <th @click="sort('model')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Model</th>
                            <th @click="sort('status')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Status</th>
                            <th @click="sort('purchase_date')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Purchase Date</th>
                            <th @click="sort('supplier')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Supplier</th>
                            <th @click="sort('asset_location')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Location</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in filteredAssets" :key="asset">
                            <tr v-for="asset in sortedAssets" :key="asset">
                                <td v-html="highlightMatches(asset.asset_id)">{{ asset.asset_id }}</td>
                                <td v-html="highlightMatches(asset.asset_tag)">{{ asset.asset_tag }}</td>
                                <td v-html="highlightMatches(asset.serialno)">{{ asset.serialno }}</td>
                                <td v-html="highlightMatches(asset.category)">{{ asset.category }}</td>
                                <td v-html="highlightMatches(asset.model)">{{ asset.model }}</td>
                                <v-chip :color="getColor(asset.status)" dark style="font-size:11px; height:20px; padding-left:5px; padding-right:5px; margin-top:5px; "><td v-html="highlightMatches(asset.status)">
                                    {{ asset.status }} 
                                </td></v-chip>
                                <td v-html="highlightMatches(asset.purchase_date)">{{ asset.purchase_date }}</td>
                                <td v-html="highlightMatches(asset.supplier)">{{ asset.supplier }}</td>
                                <td v-html="highlightMatches(asset.asset_location)">{{ asset.asset_location }}</td>
                                <td v-html="highlightMatches(asset.notes)">{{ asset.notes }}</td>
                                <td>
                                    <button class="btn-sm btn-action" @click="showModal(asset)" modal-no-backdrop data-toggle="modal" data-target="#upd-licenses" data-backdrop="static" data-keyboard="false">
                                        <v-icon color="success" title="Edit Asset" style="font-size:16px;">mdi-pencil</v-icon>
                                    </button>
                                    <button class="btn-sm btn-action" @click="showModalDelete(asset)" modal-no-backdrop data-toggle="modal" data-target="#delete-asset">
                                        <v-icon color="red" title="Delete Asset" style="font-size:16px;">mdi-delete</v-icon>
                                    </button>
                                </td>
                            </tr>
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
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">
                        <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Asset record updated.
                    </div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">
                        <v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                    </div>
                    <form name="updLicense" action="" method="POST">

                        <div class="form-row">
                            <div class="form-group">
                                <label for="asset_id"><b>Asset ID<span style="color: red;"> *</span></b></label>
                                <input type="text" name="asset_id" class="form-control" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                            </div>
                            <div class="form-group">
                                <label for="asset_tag"><b>Asset Tag<span style="color: red;"> *</span></b></label>
                                <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" placeholder="" readonly v-model.lazy="UsersData.asset_tag" />
                            </div>
                            <div class="form-group">
                                <label for="serialno"><b>Serial No.<span style="color: red;"> *</span></b></label>
                                <input type="number" name="serialno" class="form-control mb-3" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="model"><b>Model<span style="color: red;"> *</span></b></label>
                                <input type="text" name="model" class="form-control mb-3" id="model" placeholder="" v-model.lazy="UsersData.model" />
                            </div>
                            <div class="form-group">
                                <label for="status"><b>Status<span style="color: red;"> *</span></b></label>
                                <input type="text" name="status" class="form-control mb-3" id="status" placeholder="" readonly v-model.lazy="UsersData.status" />
                            </div>
                            <div class="form-group">
                                <label for="category"><b>Category<span style="color: red;"> *</span></b></label>
                                <select name="category" id="category" class="form-control mb-3" v-model.lazy="UsersData.category" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Category -- </option>
                                    <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>

                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="supplier"><b>Supplier<span style="color: red;"> *</span></b></label>
                                <input type="text" name="supplier" class="form-control mb-3" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                            </div>
                            <div class="form-group">
                                <label for="asset_location"><b>Location<span style="color: red;"> *</span></b></label>
                                <input type="text" name="asset_location" class="form-control mb-3" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                            </div>
                            <div class="form-group">
                                <label for="purchase_date"><b>Purchase Date<span style="color: red;"> *</span></b></label>
                                <input type="date" name="purchase_date" class="form-control mb-3" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="notes"><b>Notes</b></label>
                            <textarea name="notes" class="form-control mb-3" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                            </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" variant="primary" block @click.prevent="updateLicense()">Save Changes</button>
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
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New asset record added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>

            <div class="form-row">
                <div class="form-group">
                    <label for="asset_tag"><b>Asset Tag<span style="color: red;"> *</span></b></label>
                    <input type="text" name="asset_tag" class="form-control" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                </div>

                <div class="form-group">
                    <label for="serialno"><b>Serial Number<span style="color: red;"> *</span></b></label>
                    <input type="number" name="serialno" class="form-control" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                </div>

                <div class="form-group">
                    <label for="model"><b>Model<span style="color: red;"> *</span></b></label>
                    <input type="text" name="model" class="form-control" id="model" placeholder="" v-model.lazy="UsersData.model" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="category"><b>Category<span style="color: red;"> *</span></b></label>
                    <select name="category" id="category" class="form-control" v-model.lazy="UsersData.category" style="height:23px; padding-top:0; padding-bottom:0;">
                        <option value='0'> -- Select Category -- </option>
                        <option v-for='data in Category' :value='data.choice'>{{ data.choice }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="supplier"><b>Supplier<span style="color: red;"> *</span></b></label>
                    <input type="text" name="supplier" class="form-control" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                </div>
                <div class="form-group">
                    <label for="asset_location"><b>Asset Location<span style="color: red;"> *</span></b></label>
                    <input type="text" name="asset_location" class="form-control" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="purchase_date"><b>Purchase Date<span style="color: red;"> *</span></b></label>
                    <input type="date" name="purchase_date" class="form-control" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                </div>
                <div class="form-group">
                    <label for="notes"><b>Notes</b></label>
                    <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                </div>
            </div>

            <hr>
            <div class="modal-bottom">
                <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                <button v-show="btnAdd" class=" ms-2 mb-3 btn btn-primary"  @click.prevent="AddAsset()">Add Asset</button>
            </div>

        </form>
                </div>

            </div>
        </div>
    </div>

    <!-- Export Options Modal -->
    <div class="modal fade modal-update-asset" id="exp-options" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-asset" role="document">
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
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">From</span>
                                    <input type="date" class="start-date form-control" id="fromDate" name="fromDate" aria-describedby="addon-wrapping">
                                </div>
                            </div>
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">To</span>
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

    <!--Modal For Delete Asset-->
    <div class="modal fade modal-update-asset" id="delete-asset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Delete Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Asset record moved to archives.</div>
                
                    <form action="" method="POST">

                        <div style="display:none">
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="asset_id"><b>Asset ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                                </div>
                            </div>

     
                        </div>

                        <div style="text-align: center;">
                            <h6 class="rtn-modal-title">Are you sure you want to delete this asset?</h6>
                        </div>
                       

                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-confirm" style="background: rgb(163, 4, 4); color: white;" block @click.prevent="DeleteAsset()">Confirm</b-button>
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
import { debounce } from "lodash";
import axios from "axios";
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
import bcrypt from 'bcryptjs';
export default {
    name: "asset",
    data() {
        return {
            /*HideTableRow*/
            isActive: true,
            isHidden: false,
            /*Pagination*/
            page: 1,
            perPage: 10,
            currentPage: 1,
            pageSize:5,
            search: "",
            isSearching: false,
            pages:5,
            /*Table Sorting*/
            currentSort:'asset_id',
            currentSortDir:'desc',
            ascSort: true,
            /*Alert*/
            alertSuccess: null,
            alertError: null,
            btnAdd: true,
            UsersData: {
                user_id: null,
                asset_tag: null,
                serialno: null,
                model: null,
                status: null,
                category: null,
                purchase_date: null,
                supplier: null,
                notes: null,
                asset_location: null
            },
            Assets: [],
            Users: [],
            Category: [],
            Status: [],
            filteredAssets: [],
        };
    },
    components: {
        Topbar,
        Sidebar
    },
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
        this.getAllAssets();
        this.getDropdownCat();
        this.getDropdownStatus();
        this.highlightRTD();
    },
    watch: {
        search: {
            handler(search) {
                this.setAssetsDebounced(search)
            },
            immediate: true,
        }
    },
    methods: {
        Reset() {
            this.UsersData.asset_tag = "";
            this.UsersData.serialno = "";
            this.UsersData.model = "";
            this.UsersData.category = "";
            this.UsersData.purchase_date = "";
            this.UsersData.supplier = "";
            this.UsersData.notes = "";
            this.UsersData.asset_location = "";
        },
        /*Table Pagination*/
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.Assets.length) this.currentPage++;
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
        /*Search Filter*/
        setAssetsDebounced: debounce(function (search) {
            this.isSearching = true;
            setTimeout(function () {
                this.isSearching = false;
                this.filteredAssets = this.Assets.filter(asset =>
                    asset.asset_id.toLowerCase().includes(search.toLowerCase()) ||
                    asset.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
                    asset.serialno.toLowerCase().includes(search.toLowerCase()) ||
                    asset.category.toLowerCase().includes(search.toLowerCase()) ||
                    asset.model.toLowerCase().includes(search.toLowerCase()) ||
                    asset.status.toLowerCase().includes(search.toLowerCase()) ||
                    asset.purchase_date.toLowerCase().includes(search.toLowerCase()) ||
                    asset.supplier.toLowerCase().includes(search.toLowerCase()) ||
                    asset.asset_location.toLowerCase().includes(search.toLowerCase()) ||
                    asset.notes.toLowerCase().includes(search.toLowerCase())
                );
            }.bind(this), 1000);
        }, 2000),
        getColor(status) {
            if (status == "Ready to deploy") return 'success'
            else return '#AFABAB'
        },
        showModal(softID) {
            this.UsersData = softID;
        },
        showModalDelete(softID) {
            this.UsersData = softID;
        },
        cancelModal() {
            window.location.reload();
        },
        openAddForm() {
            this.Reset();
            this.alertError = false;
        },
        goDeleted() {
            this.$router.push('/assets/archived');
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
        AddAsset() {
            if (!this.UsersData.asset_tag || !this.UsersData.serialno || !this.UsersData.model || !this.UsersData.category || !this.UsersData.purchase_date || !this.UsersData.supplier || !this.UsersData.asset_location) {
                this.alertError = true;
            } else {
                let data = new FormData();
                data.append("asset_tag", this.UsersData.asset_tag);
                data.append("serialno", this.UsersData.serialno);
                data.append("model", this.UsersData.model);
                //data.append("status", this.UsersData.status);
                data.append("category", this.UsersData.category);
                data.append("purchase_date", this.UsersData.purchase_date);
                data.append("supplier", this.UsersData.supplier);
                data.append("notes", this.UsersData.notes);
                data.append("asset_location", this.UsersData.asset_location);
                axios
                    .post(
                        "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addasset",
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
        updateLicense() {
            if (!this.UsersData.asset_tag || !this.UsersData.serialno || !this.UsersData.model || !this.UsersData.category || !this.UsersData.purchase_date || !this.UsersData.supplier || !this.UsersData.asset_location) {
                this.alertError = true;
            } else {
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
        DeleteAsset() {
            let data = new FormData();
            //this.UsersData = user_id;
            data.append("id", this.UsersData.asset_id);

            axios
                .post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAsset", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                        this.getAllAssets();
                    }
                })
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')

            var y = 20;
            doc.text(135, y = y + 15, "ALL ASSETS RECORD"); /* x-align = 125 */
            doc.autoTable({
                html: '#tblAllAsset',
                startY: 50,
                styles: {
                    cellWidth: 'wrap'
                },
                columnStyles: {
                    1: {
                        columnWidth: 'auto'
                    }
                },
                columns: [
                    { header: 'asset_id' },
                    { header: 'asset_tag' },
                    { header: 'serial_no' },
                    { header: 'category' },
                    { header: 'model' },
                    { header: 'status' },
                    { header: 'purhase_date'},
                    { header: 'supplier' },
                    { header: 'location' },
                ],
            });
            doc.save('Report-Asset_All.pdf')
        },
        /*Search Highlight*/
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.search.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.search, 'ig');
            return text.replace(re, matchedText => `<b style="background-color: yellow;">${matchedText}</b>`);
        },
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.Assets.length / this.pages)
        },
        sortedAssets: function() {
            return this.filteredAssets.filter((row, index) => {
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
textarea {
    height: 50px !important;
    width: 310px !important;
    resize: none;
}

label,
input,
textarea,
select {
    font-size: 11px;
}

input {
    height: 23px;
    width: 100%;
}

.form-group {
    width: 150px;
    margin-top: -10px;
}

th.pointer {
    cursor: pointer;
}

.btn-primary,
.btn-secondary,
.btn-confirm {
    height: 25px;
    padding: 2px 7px 2px 7px;
}

/* .v-text-field.v-text-field--outlined .v-input__control{
    min-height: 10px;
} */

.page-item{
    font-size: 13px;
    text-align: center;
    margin: 2px;
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
.pagination-buttons{
    height:fit-content; 
    margin-bottom:5px; 
    padding-left:15px;
    margin-top:-2px;
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
</style>
