<template>
<div class="dashboard">
    <Sidebar />
    <Topbar  />
    
      <h6 class="page-header"><strong>Deployed Accessories </strong></h6>
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
          <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
            -->
        </span>
      </div>
      </v-row>
  
    <v-row>
        
        <!-- eslint-disable -->
        <!-- prettier-ignore -->

        <div id="tblUser" class="card">
            <div class="table-responsive-sm" >
              <div class="d-flex justify-content-end">
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
                <table id="tblAccessoryDeployed" class="table-sm table-hover" ref="table" :data="data">
                   <thead class="">
                        <tr>
                            <th @click="sort('acs_name')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Accessory Name</th>
                            <th @click="sort('acs_manufacturer')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Manufacturer</th>
                            <th @click="sort('name')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Deployed To</th>
                            <th @click="sort('transaction_date')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Deploy Date</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="acs in filteredAccessory" :key="acs"> 
                        <tr v-for="acs in sortedAccessory" :key="acs">
                        <td v-html="highlightMatches(acs.acs_name)">{{ acs.acs_name }}</td>
                        <td v-html="highlightMatches(acs.acs_manufacturer)">{{ acs.acs_manufacturer }}</td>
                        <td v-html="highlightMatches(acs.name)">{{ acs.name }}</td>
                        <td v-html="highlightMatches(acs.transaction_date)">{{ acs.transaction_date }}</td>
                        <td>
                            <button class="btn-sm btn-action" @click="showModalReturn(acs)" modal-no-backdrop data-toggle="modal" data-target="#rtn-accessory" data-backdrop="static" data-keyboard="false">
                                <v-icon color="warning" title="Return Accessory" style="font-size:16px;">mdi-refresh</v-icon>
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
        <div class="modal-dialog rtn-accessory" role="document">
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

    <!--Modal For Return Accessory Modal-->
    <div class="modal fade modal-update-asset" id="rtn-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-accessory" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Return Accessory</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <form name="returnAccessory" action="" method="POST">

                        <div style="display: none;">

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="acs_id"><b>Trans</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="assign_accessory_id" class="form-control mb-3" id="assign_accessory_id" placeholder="" readonly v-model.lazy="UsersData.assign_accessory_id" />
                            </div>
                        </div> 
                      
                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="acs_id"><b>Accessory ID</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="acs_id" class="form-control mb-3" id="acs_id" placeholder="" readonly v-model.lazy="UsersData.acs_id" />
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
                            <h6 class="rtn-modal-title">Are you sure you want to return this accessory?</h6>
                        </div>

                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-success" block @click.prevent="returnAccessory()">Yes</button>
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
  name: "accessory",
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
            currentSort:'acs_id',
            currentSortDir:'desc',
            ascSort: true,
      UsersData: {
        user_id: null,
      },
      Accessory: [],
      Employees: [],
      filteredAccessory: [],
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
    this.getAllAccessoryDeployed();
    this.getDropdownEmployee();
  },
  watch: {
      search: {
      handler(search) {
          this.setAccessoriesDeployedDebounced(search)
      },
      immediate: true,
      }
  },
  methods: {
    showModal(user_id){
      this.UsersData = user_id;
      this.$bvModal.show('upd-accessory')
    },
    showModalReturn(user_id){
      this.UsersData = user_id;
      this.$bvModal.show('return-accessory')
    },
    showDeployModal(user_id){
      this.UsersData = user_id;
      this.$bvModal.show('modalDeployAccessory')
    },
    cancelModal() {   
      this.$bvModal.hide('upd-accessory')
      this.$bvModal.hide('modalDeployAccessory')
      this.$bvModal.hide('return-accessory')
    },
    updateAccessory() {
      let data = new FormData();
      data.append("acs_id", this.UsersData.acs_id);
      data.append("acs_name", this.UsersData.acs_name);
      data.append("acs_category", this.UsersData.acs_category);
      data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
      data.append("quantity", this.UsersData.quantity);
      data.append("location", this.UsersData.location);
    
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=updateAccessory',data).then((res)=>{
        if(res.data.error){
          alert("Error");
        } else {
          alert(res.data.message);
        }
        }).catch((err)=>{
          console.log(err);
        })
    },

    getAllAccessoryDeployed() {
      axios
        .get(
          "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessoryDeployed"
        )
        .then((res) => {
          console.log(res.data.user_Data);
          this.Accessory = res.data.user_Data;
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
    DeleteAsset(user_id) {
        let data = new FormData();
        this.UsersData = user_id;
        data.append("id",this.UsersData.acs_id);

        axios
        .post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAccessory",data)
        .then((res) => {
            if(res.data.error) {
                alert("ERR");
            }
            else {
                this.getAllAssets();
                alert(res.data.message);
            }
        })
    },
    deployAccessory() {
      let data = new FormData();
      data.append("acs_id", this.UsersData.acs_id);
      //data.append("emp_id", this.EmployeeData.emp_id);
      data.append("emp_id", this.UsersData.employee);
   
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=deployAccessory',data).then((res)=>{
        if(res.data.error){
          alert("Error");
        } else {
          window.location.reload
          //alert(res.data.message);
        }
        }).catch((err)=>{
          console.log(err);
        })        
    },
    returnAccessory() {
      let data = new FormData();
      data.append("acs_id", this.UsersData.acs_id);
      data.append("emp_id", this.UsersData.emp_id);
      data.append("assign_accessory_id", this.UsersData.assign_accessory_id);
   
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=returnAccessory',data).then((res)=>{
        if(res.data.error){
          alert("Error");
        } else {
          this.$router.go();
        }
        }).catch((err)=>{
          console.log(err);
        })        
    },
    showExport(){
            this.$bvModal.show('exp-options')
        },
    exportPDF() {
          const doc = new jsPDF('l', 'mm', 'legal')
          
          var y = 20;
          doc.text(135, y = y + 15, "ALL ASSETS RECORD"); /* x-align = 125 */
          doc.autoTable({ html: '#tblAccessoryDeployed',
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
                              { header: 'dd' },

                          ],
                          });
          doc.save('Report-Accessory_Deployed.pdf')
    },
    /*Table Pagination*/
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.filteredAccessory.length) this.currentPage++;
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
    setAccessoriesDeployedDebounced: debounce(function(search) {
            this.isSearching = true;
            setTimeout(function(){
				this.isSearching = false;
                this.filteredAccessory = this.Accessory.filter(acs =>
                acs.acs_name.toLowerCase().includes(search.toLowerCase()) ||
                acs.acs_manufacturer.toLowerCase().includes(search.toLowerCase()) ||
                acs.name.toLowerCase().includes(search.toLowerCase()) ||
                acs.transaction_date.toLowerCase().includes(search.toLowerCase())
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
        sortedAccessory: function() {
            return this.filteredAccessory.filter((row, index) => {
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
label, input, textarea, select{
    font-size: 11px;
}
input{
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
