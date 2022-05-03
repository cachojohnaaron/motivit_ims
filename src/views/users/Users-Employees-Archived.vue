<template>
<div class="dashboard">
    <Sidebar/>
    <Topbar />
    
    <h6 class="page-header"><strong>Archived Users</strong></h6>
    <v-row>
    <div class="card-buttons d-flex justify-space-between">
        <span class="page-buttons">
        </span>
        <span class="page-buttons">
            <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
        </span>
    </div>
    </v-row>

    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <v-row>
    <div id="tblUser" class="card" style="width:100%;">
        <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
            <table id="tblEmployeeAll" class="table-sm table-hover" >
                <thead class="">
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users">
                        <td>{{ user.emp_id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.department }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.notes }}</td>
                        <td>
       
                        </td>
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
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
import bcrypt from 'bcryptjs';
export default {
    name: 'users',
    data() {
        return {
            drawer: null,
            /**FROM AllEmployee.vue */
            UsersData: {
                user_id: null,
                name: null,
                department: null,
                email: null,
                notes: null,
                    },
            Users: [],
            /**from AllEmployee.vue */

            
        }
        
    },
    
    components: { Topbar, Sidebar },
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

    
        this.getAllEmployee();
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
    },
}
</script>

<style >

textarea {
    height: 50px !important;
    width: 100%;
    resize: none;
}

</style>
