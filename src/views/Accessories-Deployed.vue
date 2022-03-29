<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Deployed Accessories </strong><span style="font-size:16px;"> list of deployed accessories</span></h3>
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
                <table id="tblAccessoryDeployed" class="table-sm table-hover" style="width:100%; font-size:13px;">
                   <thead class="">
                        <tr>
                            <th>Accessory Name</th>
                            <th>Manufacturer</th>
                            <th>Deployed To</th>
                            <th>Deploy Date</th>
                            <th>Check In</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="acs in Accessory"> 
                        <td>{{ acs.acs_name }}</td>
                        <td>{{ acs.acs_manufacturer }}</td>
                        <td>{{ acs.name }}</td>
                        <td>{{ acs.transaction_date }}</td>
                        <td>
                            <button class="btn-sm" @click="showModalReturn(acs)" modal-no-backdrop data-toggle="modal" data-target="#rtn-accessory" data-backdrop="static" data-keyboard="false">
                                <v-icon color="warning" title="Checkin" style="font-size:16px;">mdi-refresh</v-icon>
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

    <!--Modal For Return Accessory Modal-->
    <div class="modal fade modal-update-asset" id="rtn-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Check In Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <form name="returnAccessory" action="" method="POST">

                        <div style="display:none">

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
                            <h3>Are you sure to return this accessory?</h3>
                        </div>

                        <hr>
                        <div style="width:100%; text-align:right;">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-success" block @click="returnAccessory()">Yes</button>
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
  name: "accessory",
  data() {
    return {
      UsersData: {
        user_id: null,
      },
      Accessory: [],
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
    this.getAllAccessoryDeployed();
    this.getDropdownEmployee();
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
      //data.append("emp_id", this.EmployeeData.emp_id);
      data.append("emp_id", this.UsersData.emp_id);
   
      axios.post('http://localhost/motivit/motivit_ims/src/Api/api.php?action=returnAccessory',data).then((res)=>{
        if(res.data.error){
          alert("Error");
        } else {
          window.location.reload();
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
