<template>
<div class="dashboard">
    <Sidebar />
    <Topbar />
    
      <h6 class="page-header"><strong>Ready to Deploy Assets </strong></h6>
      <v-row>
        <div class="card-buttons d-flex justify-space-between">
          <span class="page-buttons">
            <span>
              <input type="text" v-model="search" class="form-control mb-3" id="search" placeholder="Type to search.."/>
              <v-icon color="gray" class="search-icon">mdi-magnify</v-icon>&nbsp;
             
            </span>
            <span class="pt-3" v-if="isSearching">
              <v-chip class="blue lighten-5" style="height:25px;">
                <v-progress-circular indeterminate color="primary" size="15"></v-progress-circular>&nbsp;
                <v-text style="color:blue; font-size:11px;">Processing Data..</v-text>
              </v-chip>
            </span>
          </span>
          <span class="page-buttons">
            <!--
              <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
            -->
          </span>
      </div>
      </v-row>
   
    <v-row>
        <!-- eslint-disable -->
        <!-- prettier-ignore -->
        <div id="tblUser" class="card" style="width:100%; padding:5px;">
          <!-- <div class="d-flex justify-content-end mb-3">
              <div>
                  <label>From <input type="date" class="me-2" v-model="startDate"/></label>
                  <label>To <input type="date" v-model="endDate"/></label>
              </div>
            </div>  -->
            <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
              <div class="d-flex justify-content-end mb-3">
                    <!-- Pagination and Rows -->
                     <div class="row align-items-center pagination-buttons"> 
                       <label class="rows-per-page-label">Rows per page:</label>
                        <div class="d-grid" style="size: 3vw">
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
                <table id="tblAssetRTD" class="table-sm table-hover" ref="table" :data="data">
                   <thead class="">
                        <tr>
                            <th @click="sort('asset_id')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Asset ID</th>
                            <th @click="sort('asset_tag')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Asset Tag</th>
                            <th @click="sort('serialno')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Serial Number</th>
                            <th @click="sort('category')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Category</th>
                            <th @click="sort('model')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Model</th>
                            <th @click="sort('status')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Status</th>
                            <th>Deploy</th>
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
                          <td v-html="highlightMatches(asset.status)">{{ asset.status }}</td>
                          <td>
                              <button class="btn-sm btn-action" @click="showDeployModal(asset)" modal-no-backdrop data-toggle="modal" data-target="#deploy-asset" data-backdrop="static" data-keyboard="false">
                                  <v-icon color="warning" title="Deploy Asset" style="font-size:16px;">mdi-rocket-launch</v-icon>
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

    <!--Deploy Asset Modal-->
    <div class="modal fade modal-update-asset" id="deploy-asset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Deploy Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;Asset deployed.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    <form name="deployAsset" action="" method="POST">

                        <div class="form-row"> 
                            <div class="form-group">
                              <label for="asset_id"><b>Asset ID</b></label>
                              <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" readonly v-model.lazy="UsersData.asset_id" />
                            </div>
                            <div class="form-group">
                              <label for="asset_tag"><b>Asset Tag</b></label>
                              <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" readonly placeholder="" v-model.lazy="UsersData.asset_tag" />
                            </div>
                            <div class="form-group">
                              <label for="serialno"><b>Serial No.</b></label>
                              <input type="text" name="serialno" class="form-control mb-3" id="serialno" readonly placeholder="" v-model.lazy="UsersData.serialno" />
                            </div>
                        </div>

                        <div class="form-row"> 
                            <div class="form-group">
                              <label for="model"><b>Model</b></label>
                              <input type="text" name="model" class="form-control mb-3" id="model" readonly placeholder="" v-model.lazy="UsersData.model" />
                            </div>
                            <div class="form-group">
                              <label for="supplier"><b>Supplier</b></label>
                              <input type="text" name="supplier" class="form-control mb-3" id="supplier" readonly placeholder="" v-model.lazy="UsersData.supplier" />
                            </div>
                            <div class="form-group">
                              <label for="asset_location"><b>Location</b></label>
                              <input type="text" name="asset_location" class="form-control mb-3" id="asset_location" readonly placeholder="" v-model.lazy="UsersData.asset_location" />
                            </div>
                        </div>

                            <div class="form-group" style="margin-left:5px;">
                                <label for="employee"><b>Deploy To:<span style="color: red;"> *</span></b></label>
                                <select name="employee" id="employee" class="form-control" v-model.lazy="UsersData.employee" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value="1">-- Select Employee --</option>
                                    <option v-for='data in Employees' :value='data.emp_id'>{{ data.name }}</option>
                                </select>
                            </div> 

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-warning" block @click.prevent="deployAsset()">Deploy</button>
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
  name: "asset",
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
      currentSort:'asset_id',
      currentSortDir:'desc',
      ascSort: true,
      /*Alert*/
      alertSuccess: null,
      alertError: null,
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
    this.getAllEmployee();
    this.getDropdownEmployee();
  },
  watch: {
    search: {
      handler(search) {
        this.setAssetsRTDDebounced(search)
      },
      immediate: true,
    }
  },
  methods: {
    showDeployModal(softID){
      this.UsersData = softID;
    },
    showModal(softID){
      this.UsersData = softID;
    },
    cancelModal() {   
      this.$bvModal.hide('upd-licenses')
      this.$bvModal.hide('modalDeployAsset')
    },
    getAllAssets() {
      axios
        .get(
          "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetRTD"
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
    deployAsset() {
      if (!this.UsersData.employee ) {
            this.alertError = true;
      }
      else {
      let data = new FormData();
      data.append("asset_id", this.UsersData.asset_id);
      //data.append("emp_id", this.UsersData.emp_id);
      data.append("emp_id", this.UsersData.employee);
   
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=deployAsset',data).then((res)=>{
        if(res.data.error){
          alert("ERROR");
          console.log(res.data.error);
        } else {
          this.alertError = false;
          this.alertSuccess = true;
          setTimeout(function() {
              window.location.reload()
          }, 1000);
        }
        }).catch((err)=>{
          console.log(err);
        })  
      }      
    },
    showExport(){
            this.$bvModal.show('exp-options')
    },
    exportPDF() {
        const doc = new jsPDF('l', 'mm', 'legal')
        
        var y = 20;
        doc.text(135, y = y + 15, "Ready to Deploy Assets"); /* x-align = 125 */
        doc.autoTable({ html: '#tblAssetRTD',
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
                        ],
                        });
        doc.save('Report-Asset_RTD.pdf')
    },
    /*Table Pagination*/
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.filteredAssets.length) this.currentPage++;
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
    setAssetsRTDDebounced: debounce(function(search) {
      this.isSearching = true;
      setTimeout(function(){
				this.isSearching = false;
        this.filteredAssets = this.Assets.filter(asset =>
          asset.asset_id.toLowerCase().includes(search.toLowerCase()) ||
          asset.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
          asset.serialno.toLowerCase().includes(search.toLowerCase()) ||
          asset.category.toLowerCase().includes(search.toLowerCase()) ||
          asset.model.toLowerCase().includes(search.toLowerCase()) ||
          asset.status.toLowerCase().includes(search.toLowerCase())
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
label, input, textarea, select{
    font-size: 11px;
}
th.pointer {
    cursor: pointer;
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
