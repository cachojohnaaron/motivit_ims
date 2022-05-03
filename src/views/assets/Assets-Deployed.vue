<template>
<div class="dashboard">
    <Sidebar/>
    <Topbar/>
    
        <h6 class="page-header"><strong>Deployed Assets </strong></h6>
    <v-row>
        <div class="card-buttons d-flex justify-space-between">
            <span class="page-buttons">
                <input type="text" v-model="search" class="form-control mb-3" id="search" placeholder="Type to search.." /> &nbsp;
                <span class="me-2 pt-3" v-if="isSearching">
                    <v-chip class="blue lighten-5" style="height:25px;">
                        <v-progress-circular indeterminate color="primary" size="15"></v-progress-circular>&nbsp;
                        <v-text style="color:blue; font-size:11px;">Processing Data..</v-text>
                    </v-chip>
                </span>
            </span>

            <span class="page-buttons">
                <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
            </span>
        </div>
    </v-row>
    

    <v-row>

        <!-- eslint-disable -->
        <!-- prettier-ignore -->

        <div id="tblUser" class="card" style="width:100%; padding:5px;">
           
            <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                <table id="tblAssetDeployed" class="table-sm table-hover">
                    <thead class="">
                        <tr>
                            <th>Asset Tag</th>
                            <th>Serial Number</th>
                            <th>Category</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Deployed To</th>
                            <th>Deploy Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in filteredAssets" :key="asset">
                            <td v-html="highlightMatches(asset.asset_tag)">{{ asset.asset_tag }}</td>
                            <td v-html="highlightMatches(asset.serialno)">{{ asset.serialno }}</td>
                            <td v-html="highlightMatches(asset.category)">{{ asset.category }}</td>
                            <td v-html="highlightMatches(asset.model)">{{ asset.model }}</td>
                            <td v-html="highlightMatches(asset.status)">{{ asset.status }}</td>
                            <td v-html="highlightMatches(asset.name)">{{ asset.name }}</td>
                            <td v-html="highlightMatches(asset.transaction_date)">{{ asset.transaction_date }}</td>
                            <td>
                                <button class="btn-sm btn-action" @click="showModalReturn(asset)" modal-no-backdrop data-toggle="modal" data-target="#rtn-asset">
                                    <v-icon color="warning" title="Return Asset" style="font-size:16px;">mdi-refresh</v-icon>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-row>

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
                                    <span class="input-group-text" id="addon-wrapping"  data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">To</span>
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

<!--Modal For Return Asset Modal-->
    <div class="modal fade modal-update-asset" id="rtn-asset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Return Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                            <h6 class="rtn-modal-title">Are you sure you want to return this asset?</h6>
                        </div>
                        <br>

                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-success" block @click.prevent="returnAsset()">Yes</b-button>
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
            search: '',
            isSearching: false,
            UsersData: {
                user_id: null,
            },
            EmployeeData: {
                emp_id: null,
            },
            Assets: [],
            Employees: [],
            filteredAssets: [],
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
        this.getAllEmployee();
        this.getDropdownEmployee();
    },
    watch: {
        search: {
        handler(search) {
            this.setAssetsDeployedDebounced(search)
        },
        immediate: true,
        }
    },
    methods: {
        showModal(softID) {
            this.UsersData = softID;
            this.$bvModal.show('upd-licenses')
        },
        showModalReturn(softID) {
            this.UsersData = softID;
            this.$bvModal.show('return-asset')
        },
        cancelModal() {
            this.$bvModal.hide('upd-licenses')
            this.$bvModal.hide('return-asset')
        },
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetDeployed"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Assets = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllEmployee() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallemployee2"
                )
                .then((res) => {
                    console.log(res.data.emp_Data);
                    this.Users = res.data.emp_Data;
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
        returnAsset() {
            let data = new FormData();
            data.append("asset_id", this.UsersData.asset_id);
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
        showExport(){
            this.$bvModal.show('exp-options')
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 15, "ALL DEPLOYED ASSETS"); /* x-align = 125 */
            doc.autoTable({ html: '#tblAssetDeployed',
                            startY: 50,
                            styles: {
                                cellWidth: 'wrap'
                            },
                            columnStyles: {
                                1: {columnWidth: 'auto'}
                            },
                            columns: [
                                { header: 'asset_tag' },
                                { header: 'serial_no' },
                                { header: 'category' },
                                { header: 'model' },
                                { header: 'status' },
                                { header: 'deployed_to' },
                                { header: 'deploy_date'},

                            ],
                            });
            doc.save('Report-Asset_All.pdf')
        },
        setAssetsDeployedDebounced: debounce(function(search) {
            this.isSearching = true;
            setTimeout(function(){
				this.isSearching = false;
                this.filteredAssets = this.Assets.filter(assetDeployed =>
                assetDeployed.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.serialno.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.category.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.model.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.status.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.name.toLowerCase().includes(search.toLowerCase()) ||
                assetDeployed.transasction_date.toLowerCase().includes(search.toLowerCase())
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
    /**
    computed: {
        filteredAssets() {
            return this.Assets.filter((asset) => {
                return asset.asset_tag.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.serialno.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.category.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.status.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.transaction_date.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    }
    */
};
</script>

<style scoped>

textarea {
    height: 50px !important;
    width: 310px !important;
    resize: none;
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
hr{
    margin-top: -10px;
}

</style>
