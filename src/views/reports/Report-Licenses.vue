<template>
<div class="dashboard">
    <Sidebar :drawer="drawer"/>
    <Topbar @drawerEvent="drawer = !drawer" />
    <h6 class="page-header" style="margin-left:0px !important;">Report Generation for Licenses</h6>

    <v-alert icon="mdi-clock-fast" prominent text type="info"  style="width:fit-content;">
      <small>Show all lead generation form responses received between the chosen dates.</small>
    </v-alert>

  
        
            <button class="btn btn-primary btn-gen-rep me-3" data-toggle="modal" data-target="#modal-AllLicenses" data-backdrop="static" data-keyboard="false">All Licenses</button>
            <br>
            <button class="btn btn-primary btn-gen-rep" data-toggle="modal" data-target="#modal-Deployed" data-backdrop="static" data-keyboard="false">Deployed</button>
           
    <!--All Licenses Modal-->
    <div class="modal fade modal-update-asset" id="modal-AllLicenses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:11px;">
        <div class="modal-dialog rtn-gen-rep" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="exportOptions" action="">
                        <!-- Export Date Range -->
                        <label>Custom Date Range (Date of Purchase):</label>
                        <div class="row align-items-center">
                        <div class="d-grid col-md-18 ps-3">
                            <div class="input-group mt-3 mb-3">
                                <button class="btn btn-primary btn-block form-control" @click.prevent="filterLicenses()">Filter</button>&nbsp;
                                <span class="input-group-text" id="addon-wrapping" style="height: 1.5rem" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>From</small>
                                </span>
                                    <input type="date" class="start-date form-control" id="start-date" name="fromDate" aria-describedby="addon-wrapping" v-model="UserInput.start_date">
                                &nbsp;<span class="input-group-text" id="addon-wrapping" style="height: 1.5rem" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>To</small>
                                </span>
                                    <input type="date" id="end-date" class="end-date form-control" name="toDate" aria-describedby="addon-wrapping"  v-model="UserInput.end_date">
                                
                            </div>
                        </div>
                        </div>
                        <!-- Export Options (xlsx/jspdf) -->
                        <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allLicensesOption">
                            <div style="margin-left:12px; margin-top:10px; width:100px;">
                                <button class="btn btn-primary btn-block" @click.self.prevent="PDF_allLicense('pdf')">PDF</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredDateOptions">
                            <div style="margin-left:12px; margin-top:10px; width:100px;"> 
                                <button class="btn btn-primary btn-block" @click.self.prevent="PDF_filteredPurchaseDate('pdf')">PDF</button>
                            </div>
                        </div>
                    </form>
                       
                        <!-- Licenses Table Summary -->
                        <div class="container">
                           <div class="table-responsive-sm" style="display: none;">
                                <!-- List of all licenses table -->
                                <table id="tblAllLicense" class="table-sm table-hover" style="width:100%; font-size:11px;">
                                    <thead>
                                        <tr>
                                            <th>License ID</th>
                                            <th>License Name</th>
                                            <th>Category</th>
                                            <th>Product Key</th>
                                            <th>Licensed To Name</th>
                                            <th>Licensed To Email</th>
                                            <th>Manufacturer</th>
                                            <th>Total</th>
                                            <th>Available</th>
                                            <th>Date of Purchase</th>
                                            <th>Expired On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in Licenses" :key="data">
                                            <td>{{data.softID}}</td>
                                            <td>{{data.softName}}</td>
                                            <td>{{data.softCategory}}</td>
                                            <td>{{data.softKey}}</td>
                                            <td>{{data.softToName}}</td>
                                            <td>{{data.softToEmail}}</td>
                                            <td>{{data.softManufacturer}}</td>
                                            <td>{{data.softTotal}}</td>
                                            <td>{{data.softAvailable}}</td>
                                            <td>{{data.softDate}}</td>
                                            <td>{{data.softExpired}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- filtered assets by purchase date table -->
                            <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                                <hr>
                                <label>Filtered Row Summary:</label>
                                <table id="tblfilteredLicense" class="table-sm table-striped table-hover" style="width:100%; font-size:11px;">
                                    <thead>
                                        <tr>
                                            <th>License ID</th>
                                            <th>License Name</th>
                                            <th>Category</th>
                                            <th>Product Key</th>
                                            <th>Licensed To Name</th>
                                            <th>Licensed To Email</th>
                                            <th>Manufacturer</th>
                                            <th>Total</th>
                                            <th>Available</th>
                                            <th>Date of Purchase</th>
                                            <th>Expired On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in reportFilteredLicenses" :key="data">
                                            <td>{{data.softID}}</td>
                                            <td>{{data.softName}}</td>
                                            <td>{{data.softCategory}}</td>
                                            <td>{{data.softKey}}</td>
                                            <td>{{data.softToName}}</td>
                                            <td>{{data.softToEmail}}</td>
                                            <td>{{data.softManufacturer}}</td>
                                            <td>{{data.softTotal}}</td>
                                            <td>{{data.softAvailable}}</td>
                                            <td>{{data.softDate}}</td>
                                            <td>{{data.softExpired}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End All Licenses Modal-->

    <!-- Modal For Deployed Assets button -->
    <div class="modal fade modal-update-asset" id="modal-Deployed" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
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
                    <label>Custom Date Range (Date of Purchase):</label>
                        <div class="row align-items-center">
                        <div class="d-grid col-md-18 ps-3">
                            <div class="input-group mt-3 mb-3">
                                 <button class="btn btn-primary btn-block form-control" @click.prevent="filterLicenseByDeployDate()">Filter</button>&nbsp;
                                <span class="input-group-text" id="addon-wrapping" style="height: 1.5rem" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>From</small></span>
                                <input type="date" class="start-date form-control" id="start-date" name="fromDate" aria-describedby="addon-wrapping" v-model="UserInput.start_date">
                                &nbsp;<span class="input-group-text" id="addon-wrapping" style="height: 1.5rem" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase"><small>To</small></span>
                                <input type="date" id="end-date" class="end-date form-control" name="toDate" aria-describedby="addon-wrapping"  v-model="UserInput.end_date">
                               
                            </div>
                        </div>
                        </div>
                    </form>

                    <form name="exportOptions" action="" method="POST">
                        <label class="mt-3">Export Options:</label>

                        <!-- Export buttons option 1-->
                        <div class="row align-items-center" v-if="allDeployedOption">
                            <div style="margin-left:12px; margin-top:10px; width:100px;">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_DeployedLicense('pdf')">PDF</button>
                            </div>
                        </div>

                        <!-- Export button option 2 -->
                        <div class="row align-items-center" v-if="filteredByDeployDateOptions">
                            <div style="margin-left:12px; margin-top:10px; width:100px;">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="PDF_filteredDeployedDate('pdf')">PDF</button>
                            </div>
                        </div>
                        
                    </form>


                    <!-- List of deployed asset table -->
                    <div class="table-responsive-sm" style="display: none;">
                        <table id="tblAllLicenseDeployed" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>License ID</th>
                                    <th>License Name</th>
                                    <th>Category</th>
                                    <th>Product Key</th>
                                    <th>Assigned To</th>
                                    <th>Location</th>
                                    <th>Deployed Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in Assign" :key="data">
                                    <td>{{data.softID}}</td>
                                    <td>{{data.softName}}</td>
                                    <td>{{data.softCategory}}</td>
                                    <td>{{data.softKey}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{data.location}}</td>
                                    <td>{{data.al_date}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- filtered license by deploy date table -->
                    <div class="table-responsive-sm" style="" v-if="showFilteredTable">
                        <hr>
                        <label>Filtered Row Summary:</label>
                        <table id="tblfilteredLicenseDeploy" class="table-sm table-hover" style="width:100%; font-size:11px;">
                            <thead class="">
                                <tr>
                                    <th>License ID</th>
                                    <th>License Name</th>
                                    <th>Category</th>
                                    <th>Product Key</th>
                                    <th>Assigned To</th>
                                    <th>Location</th>
                                    <th>Deployed Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in reportFilteredLicenseByDeployDate" :key="data">
                                    <td>{{data.softID}}</td>
                                    <td>{{data.softName}}</td>
                                    <td>{{data.softCategory}}</td>
                                    <td>{{data.softKey}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{data.location}}</td>
                                    <td>{{data.al_date}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

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
import jsPDF from "jspdf";
export default {
    name: "reports-licenses",
    data() {
        return {
            //user input - date filter
            UserInput: [],
            
            //table data
            Licenses: [],
            Assign: [], 
            Employee: [],
            Location: [],

            //filtered data
            reportFilteredLicenses: [],
            reportFilteredLicenseByDeployDate: [],
            // reportFilteredAssetsTransactions: [],

            showFilteredTable: false,

            //export options
            allLicensesOption: true,
            allDeployedOption: true,
            filteredDateOptions: false,
            filteredByDeployDateOptions: false,
            curdate: '',
        };
    },
    components: { Topbar, Sidebar },
    created() {
        this.getLicenses();
        this.getAssign();
        this.getEmployee();
        this.getLocation();
    },
    methods: {
        cancelModal() {
            window.location.reload();
        },
        getLicenses() {
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo').then((res) => {
                console.log(res.data.license_Data);
                this.Licenses = res.data.license_Data;
            }).catch((err) => {
                console.log(err);
            });
        },
        getAssign(){
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getdeployedlicense').then((res) => {
            console.log(res.data.deployed_Data);
            this.Assign=res.data.deployed_Data;
        }) .catch((err) => {
            console.log(err);
        });
        },
        getEmployee(){
        axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getemployee').then((res) => {
            console.log(res.data.license_Employee);
            this.Employee=res.data.license_Employee;
        }) .catch((err) => {
            console.log(err);
        });
        },
        filterLicenses() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterLicense', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredLicenses = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allLicensesOption = false;
                    this.filteredDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 
        filterLicenseByDeployDate() {
            let data = new FormData();
            data.append("start_date", this.UserInput.start_date);
            data.append("end_date", this.UserInput.end_date);

            axios.post('http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=filterLicenseByDeployDate', data)
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.reportFilteredLicenseByDeployDate = res.data.user_Data;
                    this.showFilteredTable = true;
                    this.allDeployedOption = false;
                    this.filteredByDeployDateOptions = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        },    
        PDF_allLicense() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "ALL LICENSES RECORD"); /* x-align = 125 */
            doc.autoTable({ html: '#tblAllLicense',
                            startY: 25,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8,9,10],
                            });
            doc.save('Report-Licenses_All.pdf')
        },
        PDF_DeployedLicense() {
            this.curdate = new Date().toLocaleString();
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 0, "List of Deployed Licenses"); /* x-align = 125 */
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblAllLicenseDeployed',
                            startY: 30,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6],
                            });
            doc.save('Report-Licenses_Deployed.pdf')
        },
        PDF_filteredPurchaseDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(115, y = y + 0, "Purchased Licenses from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(143, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredLicense',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6,7,8,9,10],
                            });
            doc.save('Report-Licenses_All.pdf')
        },
        PDF_filteredDeployedDate() {
            this.curdate = new Date().toLocaleString();

            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(115, y = y + 0, "List of Deployed Licenses from '"+this.UserInput.start_date+"' to '"+this.UserInput.end_date+"'");
            doc.text(125, y = y + 5, "As of "+this.curdate );
            doc.autoTable({ html: '#tblfilteredLicenseDeploy',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [0,1,2,3,4,5,6],
                            });
            doc.save('Report-License_FilterBy_DeployDate.pdf')
        },
    }
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