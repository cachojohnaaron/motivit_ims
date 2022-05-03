<template>
<div class="dashboard">
    <Sidebar/>
    <Topbar />
    
    <h6 class="page-header"><strong>Archived Users</strong></h6>
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
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
            -->
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
                <label class="rows-per-page-label">Rows per page:</label>
                <div class="row align-items-center pagination-buttons"> 
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import axios from "axios";
import { debounce } from "lodash";
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
export default {
    name: 'users',
    data() {
        return {
            drawer: null,
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
            /**FROM AllEmployee.vue */
            UsersData: {
                user_id: null,
                name: null,
                department: null,
                email: null,
                notes: null,
                    },
            Users: [],
            filteredUsers: [],
            /**from AllEmployee.vue */

            
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
        getAllEmployee() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallemployeedeleted"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Users = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 15, "ALL OFFLOADED EMPLOYEES"); /* x-align = 125 */
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
            doc.save('Report-Employee_Deleted.pdf')
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
th.pointer {
    cursor: pointer;
}
textarea {
    height: 50px !important;
    width: 100%;
    resize: none;
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
    height:20px; padding-top:2px ; font-size:11px !important; margin-right:-3px; margin-left:-3px;
}
.rows-per-page-select{
    height:20px !important; padding-left:5px; padding-top:0; padding-bottom:0; font-size: 12px;
}
.rows-per-page-label{
    font-size:11px; margin-right:10px; margin-top:5px;
}
table{
    margin-top: -15px;
}
</style>
