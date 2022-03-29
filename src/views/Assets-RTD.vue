<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Assets </strong><span style="font-size:16px;"> list of ready to deploy assets</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;" />

    <v-row>
        <!-- 
            <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;"> 
                    <v-text-field class="p-0 m-0 mt-2" dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px;" />
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button><v-icon color="success" title="Edit Asset">mdi-pencil</v-icon></button>
                        <button><v-icon color="red" title="Delete Asset">mdi-delete</v-icon></button>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        -->
        <!-- eslint-disable -->
        <!-- prettier-ignore -->

        <div id="tblUser" class="card" style="width:100%;">
            <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
                <table id="tblAssetRTD" class="table-sm table-hover" style="width:100%; font-size:13px;">
                   <thead class="">
                        <tr>
                            <th>Asset ID</th>
                            <th>Asset Tag</th>
                            <th>Serial Number</th>
                            <th>Category</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Deploy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asset in Assets">
                        <td>{{ asset.asset_id }}</td>  
                        <td>{{ asset.asset_tag }}</td>
                        <td>{{ asset.serialno }}</td>
                        <td>{{ asset.category }}</td>
                        <td>{{ asset.model }}</td>
                        <td>{{ asset.status }}</td>
                        <td>
                            <button class="btn-sm" @click="showDeployModal(asset)" modal-no-backdrop data-toggle="modal" data-target="#deploy-asset" data-backdrop="static" data-keyboard="false">
                                <v-icon color="warning" title="Deploy Accessory" style="font-size:16px;">mdi-rocket-launch</v-icon>
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
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Generate Report</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
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
                     <form name="deployAsset" action="" method="POST">

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="asset_id"><b>Asset ID</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="asset_id" class="form-control mb-3" id="asset_id" placeholder="" v-model.lazy="UsersData.asset_id" />
                            </div>
                        </div>

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="asset_tag"><b>Asset Tag</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="asset_tag" class="form-control mb-3" id="asset_tag" readonly placeholder="" v-model.lazy="UsersData.asset_tag" />
                            </div>
                        </div> 

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="serialno"><b>Serial No.</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="serialno" class="form-control mb-3" id="serialno" readonly placeholder="" v-model.lazy="UsersData.serialno" />
                            </div>
                        </div>

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="model"><b>Model</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="model" class="form-control mb-3" id="model" readonly placeholder="" v-model.lazy="UsersData.model" />
                            </div>
                        </div>

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="supplier"><b>Supplier</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="supplier" class="form-control mb-3" id="supplier" readonly placeholder="" v-model.lazy="UsersData.supplier" />
                            </div>
                        </div>

                        <div class="row align-items-center"> 
                            <div class="col-auto">
                            <label for="asset_location"><b>Location</b></label>
                            </div>
                            <div class="col-auto">
                            <input type="text" name="asset_location" class="form-control mb-3" id="asset_location" readonly placeholder="" v-model.lazy="UsersData.asset_location" />
                            </div>
                        </div>

                        <hr>
                        <!-- Employee Data here -->
                        <p>Deploy To</p>


                            <div class="form-group">
                                <label for="employee"><b>Employee Name</b></label>
                                <select name="employee" id="employee" class="form-control" v-model.lazy="UsersData.employee">
                                    <option value="1">-- Select Employee --</option>
                                    <option v-for='data in Employees' :value='data.emp_id'>{{ data.name }}</option>
                                </select>
                            </div> 

                        <hr>
                        <div style="width:100%; text-align:right;">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-success" block @click="deployAsset()">Deploy</button>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf" /*npm install jspdf --save*/
//import * as XLSX from 'xlsx' /*npm install xlsx*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
export default {
  name: "asset",
  data() {
    return {
      UsersData: {
        user_id: null,
      },
      EmployeeData: {
        emp_id: null,
      },
      Assets: [],
      Employees: [],
    };
  },
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
  methods: {
    showDeployModal(softID){
      this.UsersData = softID;
      this.$bvModal.show('modalDeployAsset')
    },
    showModal(softID){
      this.UsersData = softID;
      this.$bvModal.show('upd-licenses')
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
      let data = new FormData();
      data.append("asset_id", this.UsersData.asset_id);
      //data.append("emp_id", this.UsersData.emp_id);
      data.append("emp_id", this.UsersData.employee);
   
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=deployAsset',data).then((res)=>{
        if(res.data.error){
          alert("ERROR");
          console.log(res.data.error);
        } else {
          alert(res.data.message);
          window.location.reload();
          //console.log(res.data.message);
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
    
  },
};
</script>

<style scoped>
textarea {
    height: 50px !important;
    width: 410px;
    resize: none;
}

</style>
