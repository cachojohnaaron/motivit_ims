<template>
<div class="dashboard">
    <Sidebar :drawer="drawer"/>
    <Topbar @drawerEvent="drawer = !drawer" />
    <h6 class="page-header" style="margin-left:0px !important;">Report Generation for Accessories</h6>


    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-AllAccessory" data-backdrop="static" data-keyboard="false">All Accessories</button>
    <br>
    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-DeployedAccessories" data-backdrop="static" data-keyboard="false">Deployed Accessories</button>
    <br>
    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-AccessoriesTransactions" data-backdrop="static" data-keyboard="false">Accessories Deployment and Return Transactions</button>



    <!-- Modal For All Accessory button -->
    <div class="modal fade modal-update-asset" id="modal-AllAccessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-accessory" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <!-- List of all accessory table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllAccessories" class="table-sm table-hover" style="width:100%; font-size:13px;">
                            <thead class="">
                                <tr>
                                    <th>Accessory ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Manufacturer</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acs in Accessories" :key="acs">
                                    <td>{{ acs.acs_id }}</td>
                                    <td>{{ acs.acs_name }}</td>
                                    <td>{{ acs.acs_category }}</td>
                                    <td>{{ acs.acs_manufacturer }}</td>
                                    <td>{{ acs.quantity }}</td>
                                    <td>{{ acs.location }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_AllAccessories('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>
      
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End modal all accessory button -->

    <!-- Modal For Deployed Accessories button -->
    <div class="modal fade modal-update-asset" id="modal-DeployedAccessories" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-accessory" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="">
                    <label>Custom Date Range (Deploy Date):</label>
                        <div class="row align-items-center">
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">From</span>
                                    
                                    <input type="date" id="start-date" class="start-date form-control" v-model="UserInput.start_date">
                                </div>
                            </div>
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                   <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">To</span>
                                   <input type="date" id="end-date" class="end-date form-control" v-model="UserInput.end_date">
                                </div>
                            </div>
                        </div>
                        <div><button @click.prevent="filterAccessoriesByDeployDate()" class="btn btn-primary block">Filter</button></div>
                    </form>


                    <!-- List of all deployed accessory table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAccessoryDeployed" class="table-sm table-hover" >
                            <thead class="">
                                <tr>
                                    <th>Accessory Name</th>
                                    <th>Manufacturer</th>
                                    <th>Deployed To</th>
                                    <th>Deploy Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acs in DeployedAccessories" :key="acs"> 
                                    <td>{{ acs.acs_name }}</td>
                                    <td>{{ acs.acs_manufacturer }}</td>
                                    <td>{{ acs.name }}</td>
                                    <td>{{ acs.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered accessories by deploy date table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <table id="tblfilteredAccessories" class="table-sm table-hover" style="width:100%; font-size:13px;">
                            <thead class="">
                                <tr>
                                    <th>Accessory Name</th>
                                    <th>Manufacturer</th>
                                    <th>Deployed To</th>
                                    <th>Deploy Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acs in reportFilteredAccessoriesByDeployDate" :key="acs"> 
                                    <td>{{ acs.acs_name }}</td>
                                    <td>{{ acs.acs_manufacturer }}</td>
                                    <td>{{ acs.name }}</td>
                                    <td>{{ acs.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_allAsset('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredDeployDateOptions">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_filteredDeployedDate('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End modal all asset button -->

    <!-- Modal For Accessories transaction button -->
    <div class="modal fade modal-update-asset" id="modal-AccessoriesTransactions" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-accessory" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="">
                    <label>Custom Date Range (Transaction Date):</label>
                        <div class="row align-items-center">
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">From</span>
                                    
                                    <input type="date" id="start-date" class="start-date form-control" v-model="UserInput.start_date">
                                </div>
                            </div>
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                   <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">To</span>
                                   <input type="date" id="end-date" class="end-date form-control" v-model="UserInput.end_date">
                                </div>
                            </div>
                        </div>
                        <div><button @click.prevent="filterAccessoriesByTransactionDate()" class="btn btn-primary block">Filter</button></div>
                    </form>


                    <!-- List of all accessory transaction table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAccessoryTransactions" class="table-sm table-hover" >
                            <thead class="">
                                <tr>
                                    <th>Employee</th>
                                    <th>Transaction Type</th>
                                    <th>Accessory Name</th>
                                    <th>Manufacturer</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acs in AccessoriesTransactions" :key="acs"> 
                                    <td>{{ acs.name }}</td>
                                    <td>{{ acs.transaction_type }}</td>
                                    <td>{{ acs.acs_name }}</td>
                                    <td>{{ acs.acs_manufacturer }}</td>
                                    <td>{{ acs.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered accessories by transaction date table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <table id="tblfilteredAccessoriesTransactions" class="table-sm table-hover" style="width:100%; font-size:13px;">
                            <thead class="">
                                <tr>
                                    <th>Employee</th>
                                    <th>Transaction Type</th>
                                    <th>Accessory Name</th>
                                    <th>Manufacturer</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acs in reportFilteredAccessoriesTransactions" :key="acs"> 
                                    <td>{{ acs.name }}</td>
                                    <td>{{ acs.transaction_type }}</td>
                                    <td>{{ acs.acs_name }}</td>
                                    <td>{{ acs.acs_manufacturer }}</td>
                                    <td>{{ acs.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_AllAccessoryTransactions('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredTransactionDateOptions">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_filteredTransactionDate('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End modal all asset button -->



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
    name: "asset",
    data() {
        return {
            alertSuccess: null,
            alertError: null,

            //table data
            Accessories: [],
            DeployedAccessories: [],
            AccessoriesTransactions: [],

            //user input - date filter
            UserInput: [],

            //filtered data
            reportFilteredAccessoriesByDeployDate: [],
            reportFilteredAccessoriesTransactions: [],

            showFilteredTable: false,

            //export options
            allAssetsOption: true,
            filteredDeployDateOptions: false,
            filteredTransactionDateOptions: false,
            curdate: '',
        };
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

    
        this.getAllAccessories();
        this.getAllAccessoryDeployed();
        this.getAllAccessoryTransactions();
       
    },
    methods: {
        cancelModal() {
            window.location.reload();
        },
        getAllAccessories() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Accessories = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAccessoryDeployed() {
            axios
                .get(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessoryDeployed"
                )
                .then((res) => {
                console.log(res.data.user_Data);
                this.DeployedAccessories = res.data.user_Data;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        getAllAccessoryTransactions() {
            axios
                .get(
                "http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=getAllAccessoryTransactions"
                )
                .then((res) => {
                console.log(res.data.user_Data);
                this.AccessoriesTransactions = res.data.user_Data;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        filterAccessoriesByDeployDate() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterAccessoriesByDeployDate', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredAccessoriesByDeployDate = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allAssetsOption = false;
                    this.filteredDeployDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },    
        filterAccessoriesByTransactionDate() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterAccessoryTransactions', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredAccessoriesTransactions = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allAssetsOption = false;
                    this.filteredTransactionDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },      
        PDF_AllAccessories() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "ALL ACCESSORIES RECORD"); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAllAccessories',
                            startY: 25,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Accessories_All.pdf')
        },
        PDF_AllAccessoryTransactions() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "ALL ACCESSORIES TRANSACTIONS"); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAccessoryTransactions',
                            startY: 25,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Accessories_Transactions.pdf')
        },
        PDF_filteredDeployedDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(115, y = y + 0, "Deployed Accessories from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredAccessories',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Accessories_Deployed.pdf')
        },
        PDF_filteredTransactionDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(100, y = y + 0, "Accessories Deploy And Return Transactions from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredAccessoriesTransactions',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Accessories_FilteredTransactions.pdf')
        },
    },
};
</script>
<style scoped>
.btn-gen-rep{
    margin-top: 5px;
    background: #1A4684;
    border: none;
    border-radius: 0px;
}
label, input, textarea, select{
    font-size: 11px;
}
input{
    height:23px;
    width:100%;
}
.form-group{
    width: 150px;
    margin-top: -10px;
}
.btn-primary, .btn-secondary, .btn-success{
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
</style>