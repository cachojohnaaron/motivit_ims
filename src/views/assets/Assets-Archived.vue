<template>
<div class="dashboard">
    <Sidebar />
    <Topbar  />
    
        <h6 class="page-header"><strong>Archived Assets </strong></h6>
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
                <table id="tblAllAsset" class="table-sm table-hover" >
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
                        <tr v-for="asset in filteredAssets" :key="asset">
                            <td v-html="highlightMatches(asset.asset_id)">{{ asset.asset_id }}</td>
                            <td v-html="highlightMatches(asset.asset_tag)">{{ asset.asset_tag }}</td>
                            <td v-html="highlightMatches(asset.serialno)">{{ asset.serialno }}</td>
                            <td v-html="highlightMatches(asset.category)">{{ asset.category }}</td>
                            <td v-html="highlightMatches(asset.model)">{{ asset.model }}</td>
                            <td v-html="highlightMatches(asset.status)">{{ asset.status }}</td>
                            <td v-html="highlightMatches(asset.purchase_date)">{{ asset.purchase_date }}</td>
                            <td v-html="highlightMatches(asset.supplier)">{{ asset.supplier }}</td>
                            <td v-html="highlightMatches(asset.asset_location)">{{ asset.asset_location }}</td>
                            <td v-html="highlightMatches(asset.notes)">{{ asset.notes }}</td>
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
            isSearching: false,
            search: '',
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
    },
    watch: {
        search: {
        handler(search) {
            this.setAssetsArchivedDebounced(search)
        },
        immediate: true,
        }
    },
    methods: {
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getdeletedasset"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Assets = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        exportPDF() {
            const doc = new jsPDF('l', 'mm', 'legal')
            
            var y = 20;
            doc.text(135, y = y + 15, "ALL DELETED ASSETS RECORD"); /* x-align = 125 */
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
            doc.save('Report-Asset_Deleted.pdf')
        },
        setAssetsArchivedDebounced: debounce(function(search) {
            this.isSearching = true;
            setTimeout(function(){
				this.isSearching = false;
                this.filteredAssets = this.Assets.filter(assetArchived =>
                assetArchived.asset_id.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.serialno.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.category.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.model.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.status.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.purchase_date.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.supplier.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.asset_location.toLowerCase().includes(search.toLowerCase()) ||
                assetArchived.notes.toLowerCase().includes(search.toLowerCase())
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
                return asset.asset_id.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.asset_tag.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.serialno.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.category.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.model.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.status.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.purchase_date.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.supplier.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.asset_location.toLowerCase().includes(this.search.toLowerCase()) ||
                    asset.notes.toLowerCase().includes(this.search.toLowerCase());      
            });
        }
    }
    */
};
</script>

<style scoped>
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
.btn-primary, .btn-secondary, .btn-warning{
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
