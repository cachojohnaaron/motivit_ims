<template>
<div class="dashboard">
    <Sidebar />
    <Topbar />
    
    <h6 class="page-header"><strong>Employees </strong></h6>
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
            <button type="button" class="btn btn-light btn-subheader"  @click="goDeleted()">Archives</button>
            <button type="button" class="btn btn-light btn-subheader-third" @click="openAddForm()" data-toggle="modal" data-target="#add-employee" data-backdrop="static" data-keyboard="false">Create New</button>
        </span>
    </div>
    </v-row>
  
    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <v-row>
    <div id="tblUser" class="card">
        <div class="table-responsive-sm" >
            <div class="d-flex justify-content-end">
                <!-- Pagination and Rows -->
                
                <div class="row align-items-center pagination-buttons"> 
                    <label class="rows-per-page-label">Rows per page:</label>
                    <div class="d-grid" >
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
            <table id="tblEmployeeAll" class="table-sm table-hover" ref="table" :data="data">
                <thead class="">
                    <tr>
                        <th @click="sort('emp_id')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Employee ID</th>
                        <th @click="sort('name')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Name</th>
                        <th @click="sort('department')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Department</th>
                        <th @click="sort('email')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Email</th>
                        <th @click="sort('notes')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user">
                        <tr v-for="user in sortedUsers" :key="user">
                        <td v-html="highlightMatches(user.emp_id)">{{ user.emp_id }}</td>
                        <td v-html="highlightMatches(user.name)">{{ user.name }}</td>
                        <td v-html="highlightMatches(user.department)">{{ user.department }}</td>
                        <td v-html="highlightMatches(user.email)">{{ user.email }}</td>
                        <td v-html="highlightMatches(user.notes)">{{ user.notes }}</td>
                        <td>
                            <button class="btn-sm btn-action" @click="showModal(user)" data-toggle="modal" data-target="#upd-licenses" data-backdrop="static" data-keyboard="false">
                                <v-icon color="success" title="Edit User" style="font-size:16px;">mdi-pencil</v-icon>
                            </button>
                            <button class="btn-sm btn-action" @click="showModalDelete(user)" modal-no-backdrop data-toggle="modal" data-target="#delete-employee">
                                <v-icon color="red" title="Delete User" style="font-size:16px;">mdi-delete</v-icon>
                            </button>
                            <button class="btn-sm btn-action" @click="getAssignedItems(user)" data-toggle="modal" data-target="#assigned-items" data-backdrop="static" data-keyboard="false">
                                <v-icon color="gray" title="View User Information" style="font-size:16px;">mdi-eye</v-icon>
                            </button>
                        </td>
                        </tr>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </v-row>

    <!-- Assigned items Modal -->
    <div class="modal fade" id="assigned-items" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="exampleModalLabel">Assigned Items to</span>
                    <b>
                    <input class="modal-title modal-title-assign" readonly type="text" name="name" id="name" placeholder="" v-model.lazy="UsersData.name" disabled>
                    </b>
                    <button @click="cancelModal()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">Item Returned.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert">An Error Occured.</div>
        
                <form method="POST"

                    <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                        <table class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Asset Tag</th>
                                    <th>Asset Model</th>
                                    <th>Transaction Date</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in AssignedItems">
                                    <td>{{ item.asset_tag }}</td>
                                    <td>{{ item.model }}</td>
                                    <td>{{ item.transaction_date }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr>

                     <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                        <table class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Category</th>
                                    <th>License Name</th>
                                    <th>Transaction Date</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in AssignedItemsLicenses">
                                    <td>{{ item.softCategory }}</td>
                                    <td>{{ item.softName }}</td>
                                    <td>{{ item.transaction_date }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr>

                    <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                        <table class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Category</th>
                                    <th>Accessory Name</th>
                                    <th>Transaction Date</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in AssignedItemsAccessory">
                                    <td>{{ item.acs_category }}</td>
                                    <td>{{ item.acs_name }}</td>
                                    <td>{{ item.transaction_date }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            
                </div>
            </div>
        </div>
    </div>

    <!-- Update Employee Modal -->
    <div class="modal fade modal-update-asset" id="upd-licenses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update Employee Information</h6>
                    <button type="button" @click="cancelModal()" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Employee record updated.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    <form name="updLicense" action="" method="POST">

                        <div class="form-row">
                            <div class="form-group mb-2">
                                <label for="name"><b>Name<span style="color: red;"> *</span></b></label>
                                <input class="form-control" type="text" name="name" id="name" placeholder="" v-model.lazy="UsersData.name">
                            </div>

                            <div class="form-group mb-2">
                                <label for="email"><b>Email<span style="color: red;"> *</span></b></label>
                                <input class="form-control" type="text" name="email" id="email" placeholder="" v-model.lazy="UsersData.email">
                            </div>
                            <div class="form-group mb-2">
                                <label for="department"><b>Department<span style="color: red;"> *</span></b></label>
                                <select name="department" id="department" class="form-control" v-model.lazy="UsersData.department" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Department -- </option>
                                    <option v-for='data in Departments' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="notes"><b>Notes</b></label>
                                <textarea class="form-control" name="notes" id="notes" placeholder="" v-model.lazy="UsersData.notes"/>
                            </div>
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
                    <!--<form name="exportOptions" method="POST">-->
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


    <!-- Add Employee Modal -->
    <div class="modal fade modal-update-asset" id="add-employee" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" >
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Employee</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New employee record added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    
                    <form action="" method="POST" id="myForm">
              
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name"><b>Employee Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="name" class="form-control" id="name" placeholder="" v-model.lazy="UsersData.name" />
                            </div>

                            <div class="form-group">
                                <label for="email"><b>Email<span style="color: red;"> *</span></b></label>
                                <input type="text" name="email" class="form-control" id="email" placeholder="" v-model.lazy="UsersData.email" />
                            </div>

                            <div class="form-group">
                                <label for="department"><b>Department<span style="color: red;"> *</span></b></label>
                                <select name="department" id="department" class="form-control" v-model.lazy="UsersData.department" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Department -- </option>
                                    <option v-for='data in Departments' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                            
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="notes"><b>Notes</b></label>
                                <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                            </div>
                        </div>    
                            <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm"  block @click.prevent="AddEmployee()">Add Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

<!--Modal For Return Asset Modal-->
    <div class="modal fade modal-update-asset" id="rtn-asset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content" style="background: #d4dce6;">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Return Asset</h6>
                </div>
                <div class="modal-body">
                    <form action="" method="POST">

                        <div style="display:none;">
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="asset_id"><b>Asset ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                                </div>
                            </div>

                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="emp_id"><b>Employee ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="emp_id" class="form-control mb-3" id="emp_id" placeholder="" readonly v-model.lazy="UsersData.emp_id" />
                                </div>
                            </div> 
                        </div>

                        <div style="text-align: center;">
                            <h6>Are you sure you want to return this asset?</h6>
                        </div>

                        <hr>

                        <div class="modal-bottom">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-success" block @click.prevent="returnAsset()">Yes</b-button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Modal For Delete Employee-->
    <div class="modal fade modal-update-asset" id="delete-employee" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Delete Employee</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Employee record moved to archives.</div>
                
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
                            <h6 class="rtn-modal-title">Are you sure you want to delete employee?</h6>
                        </div>
                       

                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-confirm" style="background: rgb(163, 4, 4); color: white;" block @click.prevent="DeleteEmployee()">Confirm</b-button>
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
export default {
    name: 'users',
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
            currentSort:'emp_id',
            currentSortDir:'desc',
            ascSort: true,
            alertSuccess: null,
            alertError: null,
            tbl_assignedItemsAsset: null,
            UsersData: {
                user_id: null,
                name: null,
                department: null,
                email: null,
                notes: null,
                },
            Users: [],
            Departments: [],
            AssignedItems: [],
            AssignedItemsAccessory: [],
            AssignedItemsLicenses: [],
            filteredUsers: [],
        }
    },
    
    components: { Topbar, Sidebar },
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
        this.getDropdowns();
        //this.getAssignedItems();
    },
    watch: {
      search: {
      handler(search) {
          this.setEmployeesDebounced(search)
      },
      immediate: true,
      }
  },
    methods: {
        showModal(user_id) {
            this.UsersData = user_id;
        },
        showModalDelete(emp_id) {
            this.UsersData = emp_id;
        },
        cancelModal() {
            window.location.reload();
        },
        updateLicense() {
        /* eslint-disable */
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!this.UsersData.name || !this.UsersData.department || !this.UsersData.email ) {
                this.alertError = true;
            }
            else if (!this.UsersData.email.match(mailformat))
            {
                alert("Please input a valid email address!");
            }
            else {
                let data = new FormData();
                data.append("emp_id", this.UsersData.emp_id);
                data.append("name", this.UsersData.name);
                data.append("department", this.UsersData.department);
                data.append("email", this.UsersData.email);
                data.append("notes", this.UsersData.notes);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=updateEmployee', data).then((res) => {
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
        getAllEmployee() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallemployee"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Users = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAssignedItems(user_id) {        
            let data = new FormData();
            this.UsersData = user_id;
            data.append("emp_id", this.UsersData.emp_id);

            axios.post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getAssignedItems",
                data
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssignedItems = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });

            axios.post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getAssignedItemsAccessory",
                data
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssignedItemsAccessory = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });

            axios.post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getAssignedItemsLicenses",
                data
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssignedItemsLicenses = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        DeleteEmployee() {
            let data = new FormData();
            
            data.append("id", this.UsersData.emp_id);

            axios
                .post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableEmployee", data)
                .then((res) => {
                    if (res.data.error) {
                        alert("ERR");
                    } else {
                        this.alertSuccess = true;
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                        this.getAllEmployee();
                        
                    }
                })
        },
        showModalReturn(user_id) {
            this.UsersData = user_id;
            this.AssignedItems = user_id;
        },
        returnAsset() {
            let data = new FormData();
            data.append("asset_id", this.AssignedItems.asset_id);
            //data.append("emp_id", this.EmployeeData.emp_id);
            data.append("emp_id", this.UsersData.emp_id);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=returnAsset', data).then((res) => {
                if (res.data.error) {
                    alert("Error");
                } else {
                    location.reload();
                    this.$bvModal.hide('return-asset')
                    //alert(res.data.message);
                    
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        Reset() {
        this.UsersData.name = "";
        this.UsersData.department = "";
        this.UsersData.email = "";
        this.UsersData.notes = "";
        },
        openAddForm() {
            this.Reset();
            this.alertError = false;
        },
        AddEmployee() {
        /* eslint-disable */
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (!this.UsersData.name || !this.UsersData.department || !this.UsersData.email ) {
            this.alertError = true;
        }
        else if (!this.UsersData.email.match(mailformat))
        {
            alert("Please input a valid email address!");
        }
        else {
            let data = new FormData();
            data.append("name", this.UsersData.name);
            data.append("department", this.UsersData.department);
            data.append("email", this.UsersData.email);
            data.append("notes", this.UsersData.notes);
            axios
                .post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addemployee",
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
        getDropdowns() {
        axios
            .get(
            "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddDepartment"
            )
            .then((res) => {
            console.log(res.data.user_Data);
            this.Departments = res.data.user_Data;
            })
            .catch((err) => {
            console.log(err);
            });
        },
        goDeleted() {
          this.$router.push('/users-employees/archived');  
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 15, "ALL EMPLOYEE RECORD"); /* x-align = 125 */
            doc.autoTable({ html: '#tblEmployeeAll',
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
            doc.save('Report-Employee_All.pdf')
        },
        /*Table Pagination*/
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.filteredUsers.length) this.currentPage++;
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
        setEmployeesDebounced: debounce(function(search) {
            this.isSearching = true;
            setTimeout(function(){
				this.isSearching = false;
                this.filteredUsers = this.Users.filter(users =>
                users.emp_id.toLowerCase().includes(search.toLowerCase()) ||
                users.name.toLowerCase().includes(search.toLowerCase()) ||
                users.department.toLowerCase().includes(search.toLowerCase()) ||
                users.email.toLowerCase().includes(search.toLowerCase()) ||
                users.notes.toLowerCase().includes(search.toLowerCase())
                );
			}.bind(this),1000);
        }, 2000),
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.search.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.search, 'ig');
            return text.replace(re, matchedText => `<b style="background-color: yellow;">${matchedText}</b>`);
        }
    },
    computed: {
        sortedUsers: function() {
            return this.filteredUsers.filter((row, index) => {
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
}
</script>

<style >


textarea {
    height: 50px !important;
    width: 310px !important;
    resize: none;
}
label, input, textarea, select, .form-control{
    font-size: 11px;
}
input, .form-control{
    height:23px;
    width:100%;
}
th.pointer {
    cursor: pointer;
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
.modal-title-assign{
    background:white;border: none; width: fit-content; padding:0; margin-left:5px;
}
.pagination-buttons{
    height:fit-content; 
    margin-bottom:-10px; 
    padding-left:15px;
    margin-top:5px;
}
.page-link-lr{
    height:20px; padding-top:0 !important;
}
.page-link-mid{
    height:20px; padding: top 2px !important; font-size:11px !important; margin-right:-3px; margin-left:-3px;
}
.rows-per-page-select{
    height:20px !important; padding-left:5px !important; padding-top:0 !important; padding-bottom:0 !important; font-size: 12px;
}
.rows-per-page-label{
    font-size:11px; margin-right:10px; margin-top:5px;
}
table{
    margin-top: -15px;
}


</style>
