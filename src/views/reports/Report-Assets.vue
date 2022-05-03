<template>
<div class="dashboard">
    <Sidebar :drawer="drawer"/>
    <Topbar @drawerEvent="drawer = !drawer" />
    <h6 class="page-header" style="margin-left:0px !important;">Report Generation for Assets</h6>


    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-AllAsset" data-backdrop="static" data-keyboard="false">All Assets</button>
    <br>
    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-RTDAsset" data-backdrop="static" data-keyboard="false">RTD Assets</button>
    <br>
    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-DeployedAssets" data-backdrop="static" data-keyboard="false">Deployed Assets</button>
    <br>
    <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-AssetsTransactions" data-backdrop="static" data-keyboard="false">Assets Deployment and Return Transaction</button>



    <!-- Modal For All Asset button -->
    <div class="modal fade modal-update-asset" id="modal-AllAsset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:11px;">
        <div class="modal-dialog rtn-gen-rep" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="">
                    <label>Custom Date Range (Purchase Date):</label>
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
                        <div><button @click.prevent="filterAsset()" class="btn btn-primary block">Filter</button></div>
                    </form>


                    <!-- List of all asset table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllAsset" class="table-sm table-hover" style="width:100%; font-size:11px;">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in Assets" :key="asset">
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
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered assets by purchase date table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <table id="tblfilteredAsset" class="table-sm table-hover" style="width:100%; font-size:11px;">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in reportFilteredAssets" :key="asset">
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
                        <div class="row align-items-center" v-if="filteredDateOptions">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_filteredPurchaseDate('pdf')">PDF</button>
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


    <!-- Modal For Rtd Asset button -->
    <div class="modal fade modal-update-asset" id="modal-RTDAsset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:11px;">
        <div class="modal-dialog rtn-gen-rep" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <!-- List of rtd asset table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllAssetRTD" class="table-sm table-hover" style="width:100%; font-size:11px;">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in AssetsRTD" :key="asset">
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
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_rtdAsset('pdf')">PDF</button>
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
    <!-- End modal RTD asset button -->

    <!-- Modal For Deployed Assets button -->
    <div class="modal fade modal-update-asset" id="modal-DeployedAssets" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-gen-rep" role="document">
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
                        <div><button @click.prevent="filterAssetByDeployDate()" class="btn btn-primary block">Filter</button></div>
                    </form>


                    <!-- List of deployed asset table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllAssetDeployed" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Asset Tag</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Model</th>
                                    <th>Status</th>
                                    <th>Deployed To</th>
                                    <th>Deploy Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in AssetsDeployed" :key="asset">
                                    <td>{{ asset.asset_tag }}</td>
                                    <td>{{ asset.serialno }}</td>
                                    <td>{{ asset.category }}</td>
                                    <td>{{ asset.model }}</td>
                                    <td>{{ asset.status }}</td>
                                    <td>{{ asset.name }}</td>
                                    <td>{{ asset.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered assets by deploy date table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <table id="tblfilteredAssetdeploydate" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Asset Tag</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Model</th>
                                    <th>Status</th>
                                    <th>Deployed To</th>
                                    <th>Deploy Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in reportFilteredAssetsByDeployDate" :key="asset">
                                    <td>{{ asset.asset_tag }}</td>
                                    <td>{{ asset.serialno }}</td>
                                    <td>{{ asset.category }}</td>
                                    <td>{{ asset.model }}</td>
                                    <td>{{ asset.status }}</td>
                                    <td>{{ asset.name }}</td>
                                    <td>{{ asset.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_DeployedAsset('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredByDeployDateOptions">
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

    <!-- Modal For Assets deployment and return transaction button -->
    <div class="modal fade modal-update-asset" id="modal-AssetsTransactions" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog rtn-gen-rep" role="document">
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
                        <div><button @click.prevent="filterAssetByTransactionDate()" class="btn btn-primary block">Filter</button></div>
                    </form>


                    <!-- List of all asset dep and return transaction table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllAssetsTransactions" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Employee</th>
                                    <th>Transaction Type</th>
                                    <th>Asset Tag</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Model</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in AssetsTransactions" :key="asset">
                                    <td>{{ asset.name }}</td>
                                    <td>{{ asset.transaction_type }}</td>
                                    <td>{{ asset.asset_tag }}</td>
                                    <td>{{ asset.serialno }}</td>
                                    <td>{{ asset.category }}</td>
                                    <td>{{ asset.model }}</td>
                                    <td>{{ asset.transaction_date }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered assets by date of transaction table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <table id="tblfilteredAssetTransactionDate" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>Employee</th>
                                    <th>Transaction Type</th>
                                    <th>Asset Tag</th>
                                    <th>Serial Number</th>
                                    <th>Category</th>
                                    <th>Model</th>
                                    <th>Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="asset in reportFilteredAssetsTransactions" :key="asset">
                                    <td>{{ asset.name }}</td>
                                    <td>{{ asset.transaction_type }}</td>
                                    <td>{{ asset.asset_tag }}</td>
                                    <td>{{ asset.serialno }}</td>
                                    <td>{{ asset.category }}</td>
                                    <td>{{ asset.model }}</td>
                                    <td>{{ asset.transaction_date }}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allAssetsOption">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_AssetsTransactions('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredByAssetsTransactionsOptions">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_filteredAssetsTransactions('pdf')">PDF</button>
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
    <!-- End modal asset deployment and return transaction button -->



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
            Assets: [],
            AssetsRTD: [],
            AssetsDeployed: [],
            AssetsTransactions: [],

            //user input - date filter
            UserInput: [],

            //filtered data
            reportFilteredAssets: [],
            reportFilteredAssetsByDeployDate: [],
            reportFilteredAssetsTransactions: [],

            showFilteredTable: false,

            //export options
            allAssetsOption: true,
            filteredDateOptions: false,
            filteredByDeployDateOptions: false,
            filteredByAssetsTransactionsOptions: false,
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

    
        this.getAllAssets();
        this.getAllAssetsRTD();
        this.getAllAssetsDeployed();
        this.getAllAssetTransactions();
       
    },
    methods: {
        cancelModal() {
            window.location.reload();
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
        getAllAssetsRTD() {
            axios
                .get(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetRTD"
                )
                .then((res) => {
                console.log(res.data.user_Data);
                this.AssetsRTD = res.data.user_Data;
                })
                .catch((err) => {
                console.log(err);
                });
        },
        getAllAssetsDeployed() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetDeployed"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssetsDeployed = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssetTransactions() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=getAllAssetTransactions"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssetsTransactions = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        filterAsset() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterAsset', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredAssets = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allAssetsOption = false;
                    this.filteredDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 
        filterAssetByDeployDate() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterAssetByDeployDate', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredAssetsByDeployDate = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allAssetsOption = false;
                    this.filteredByDeployDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },    
        filterAssetByTransactionDate() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterAssetTransactions', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredAssetsTransactions = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allAssetsOption = false;
                    this.filteredByAssetsTransactionsOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },      
        PDF_allAsset() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "ALL ASSETS RECORD"); /* x-align = 125 */
            doc.autoTable({ html: '#tblAllAsset',
                            startY: 25,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_All.pdf')
        },
        PDF_rtdAsset() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "Ready to Deploy Assets "); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAllAssetRTD',
                            startY: 30,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_All.pdf')
        },
        PDF_DeployedAsset() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "List of Deployed Assets"); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAllAssetDeployed',
                            startY: 30,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_Deployed.pdf')
        },
        PDF_AssetsTransactions() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "List of All Assets Deployment and Return Transactions"); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAllAssetsTransactions',
                            startY: 30,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_Deployment-Return_Transactions.pdf')
        },
        PDF_filteredPurchaseDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(115, y = y + 0, "Purchased Assets from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredAsset',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_All.pdf')
        },
        PDF_filteredDeployedDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(115, y = y + 0, "List of Deployed Assets from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredAssetdeploydate',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_FilterBy_DeployDate.pdf')
        },
        PDF_filteredAssetsTransactions() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(100, y = y + 0, "List of Assets Return and Deploy Transactions from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredAssetTransactionDate',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8],
                            });
            doc.save('Report-Asset_FilterBy_ReturnDeploy_Transactions.pdf')
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