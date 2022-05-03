<template>
<div class="dashboard">
    <Sidebar />
    <Topbar />
    <!-- Header Buttons -->
    
      <h6 class="page-header"><strong>Deployed Licenses</strong></h6>
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
          <button type="button" class="btn btn-light btn-subheader-third" @click="goDeleted()">Archives</button>
          <!--
          <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
          -->
        </span>
      </div>
      </v-row>

    <v-row>
    <!--Table for All Deployed Licenses-->
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
                      <li class="page-item"><a class="page-link page-link-mid" >{{ page }}</a></li>
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
        <!-- Table List -->
        <table id="table" class="table-sm table-hover" ref="table" :data="data">
          <thead>
            <tr>
              <th @click="sort('softID')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">License ID</th>
              <th @click="sort('softName')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">License Name</th>
              <th @click="sort('softCategory')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Category</th>
              <th @click="sort('softKey')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Product Key</th>
              <th @click="sort('name')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Assigned To</th>
              <th @click="sort('location')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Location</th>
              <th @click="sort('al_date')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Deployed Date</th>
              <th v-if="!isHidden">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in filteredDeployed" :key="data">
              <tr v-for="data in sortedLicenses" :key="data">
                <td v-html="highlightMatches(data.softID)">{{data.softID}}</td>
                <td v-html="highlightMatches(data.softName)">{{data.softName}}</td>
                <td v-html="highlightMatches(data.softCategory)">{{data.softCategory}}</td>
                <td v-html="highlightMatches(data.softKey)">{{data.softKey}}</td>
                <td v-html="highlightMatches(data.name)">{{data.name}}</td>
                <td v-html="highlightMatches(data.location)">{{data.location}}</td>
                <td v-html="highlightMatches(data.al_date)">{{data.al_date}}</td>
                <td v-if="!isHidden">
                  <button class="btn-sm btn-action" @click="showModalReturn(data)" modal-no-backdrop data-toggle="modal" data-target="#rtn-license" data-backdrop="static" data-keyboard="false">
                    <v-icon color="warning" title="Return License" style="font-size:16px;">mdi-refresh</v-icon>
                  </button>
                  <button class="btn-sm btn-action" @click="showModalDelete(data)" modal-no-backdrop data-toggle="modal" data-target="#delete-license">
                    <v-icon color="red" title="Remove License" style="font-size:16px;">mdi-delete</v-icon>
                  </button>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </v-row>

  <!--Working - Export  Options Modal -  but Cannot POST-->
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
                  <form name="exportOptions" action="" method="POST">
                    <!-- <div>
                      <b-form-group label="Export Range:" v-slot="{ ariaDescribedby }">
                        <b-form-radio-group v-model="selected" :options="options" :aria-describedby="ariaDescribedby" name="plain-inline" plain></b-form-radio-group>
                      </b-form-group>
                    </div> -->
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
                    <label class="mt-3">Export Options:</label>
                    <div class="row align-items-center"> 
                        <div class="d-grid col-6">
                          <button class="btn btn-primary btn-block" v-on:click="exportPDF('pdf')">PDF</button>
                        </div>
                        <div class="d-grid col-6">
                          <button class="btn btn-primary btn-block" @click="exportExcel('xlsx')">Excel</button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>

  <!--Modal For Return License Modal-->
    <div class="modal fade modal-update-asset" id="rtn-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Return License</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" method="POST">

                        <div style="display:none">
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="assign_license_id"><b>License ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="assign_license-_id" class="form-control mb-3" id="assign_license_id" placeholder="" readonly v-model.lazy="License_Data.assign_license_id" />
                                </div>
                            </div>

                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="softID"><b>Employee ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="softID" class="form-control mb-3" id="softID" placeholder="" readonly v-model.lazy="License_Data.softID" />
                                </div>
                            </div> 
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="al_emp"><b>Employee ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="al_emp" class="form-control mb-3" id="al_emp" placeholder="" readonly v-model.lazy="License_Data.al_emp" />
                                </div>
                            </div> 
                            <div class="row align-items-center"> 
                                <div class="col-auto">
                                <label for="locc_id"><b>Employee ID</b></label>
                                </div>
                                <div class="col-auto">
                                <input type="text" name="loc_id" class="form-control mb-3" id="loc_id" placeholder="" readonly v-model.lazy="License_Data.loc_id" />
                                </div>
                            </div> 
                        </div>

                        <div style="text-align: center;">
                            <h6 class="rtn-modal-title">Are you sure you want to return this license?</h6>
                        </div>
                       

                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-success" block @click.prevent="checkIn()">Yes</b-button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Modal For Delete License-->
    <div class="modal fade modal-update-asset" id="delete-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-asset" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Delete License</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert">
                        <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;License record moved to archives.
                    </div>
                    <form action="" method="POST">

                        <div style="display:none">
                          <div class="row align-items-center"> 
                              <div class="col-auto">
                              <label for="assign_license_id"><b>License ID</b></label>
                              </div>
                              <div class="col-auto">
                              <input type="text" name="assign_license_id" class="form-control mb-3" id="assign_license_id" placeholder="" readonly v-model.lazy="License_Data.assign_license_id" />
                              </div>
                          </div>
                          <div class="row align-items-center"> 
                              <div class="col-auto">
                              <label for="softID"><b>SoftID</b></label>
                              </div>
                              <div class="col-auto">
                              <input type="text" name="softID" class="form-control mb-3" id="softID" placeholder="" readonly v-model.lazy="License_Data.softID" />
                              </div>
                          </div>
                          <div class="row align-items-center"> 
                              <div class="col-auto">
                              <label for="al_emp"><b>SoftID</b></label>
                              </div>
                              <div class="col-auto">
                              <input type="text" name="al_emp" class="form-control mb-3" id="al_emp" placeholder="" readonly v-model.lazy="License_Data.al_emp" />
                              </div>
                          </div>

     
                        </div>

                        <div style="text-align: center;">
                            <h6 class="rtn-modal-title">Are you sure you want to delete this license?</h6>
                        </div>
                       

                        <hr>

                        <div class="modal-bottom-rtn">
                            <b-button class="mb-3 btn btn-secondary" data-dismiss="modal">Cancel</b-button>
                            <b-button class="ms-2 mb-3 btn btn-confirm" style="background: rgb(163, 4, 4); color: white;" block @click.prevent="removeDeployed()">Confirm</b-button>
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
import axios from "axios";
import { debounce } from "lodash";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf"
import 'jspdf-autotable'
export default {
  name: "license",
  data() {
    return {
      drawer: null,
      isHidden: false, /*HideTableRow*/
      rows: 100,
      //Alert
      successAlert: false,
      alertSuccess:false,
      warningAlert: false,
      dismissSecs: 5,
      upddeployed: 0,
      checkAlert: 0,
      /*Pagination*/
      page: 1,
      perPage: 10,
      currentPage: 1,
      pageSize:5,
      search: "",
      isSearching: false,
      pages:5,
      /*Table Sorting*/
      currentSort:'softID',
      currentSortDir:'desc',
      ascSort: true,
      //Buttons
      btnExport: true,
      btnShow: true,
      btnDeleted: true,
      btnEdit: false,
      License_Data: {
        assign_license_id: null,
        softID: null,
        softName: null,
        softCategory: null,
        softKey: null,
        softDate: null,
        softLocation: null,
      },
      LicenseData: {
        al_id: null,
        al_Name: null,
        al_Key: null,
        al_Category: null,
        al_emp: null,
        emp_id: null,
        al_location: null,
        loc_id: null,
        al_date: null,
      },
      Assign: [],
      Licenses: [],
      Location: [],
      Employee: [],
      filteredLicenses: [],
    };
  },
  components: { Topbar, Sidebar },
  created(){
    this.getAssign();
    this.getLicenses();
    this.getLocation();
    this.getEmployee();
  },
  watch: {
    search: {
      handler(search) {
        this.setLicensesDebounced(search)
      },
      immediate: true,
    }
  },
  methods:{
    goDeleted() {
      this.$router.push('/licenses/archived');  
    },
    depcountDown(upddeployed) {
      this.upddeployed = upddeployed
    },
    checkIncountDown(checkAlert) {
      this.checkAlert = checkAlert
    },
    showModal(assign_license_id){
      this.License_Data = assign_license_id;
      this.LicenseData = assign_license_id;
      this.$bvModal.show('upd-deployed')
    },
    showModalDelete(assign_license_id) {
        this.License_Data = assign_license_id;
    },
    showModalReturn(assign_license_id) {
        this.License_Data = assign_license_id;
        this.$bvModal.show('return-license')
    },
    showExport(){
      this.$bvModal.show('exp-options')
    },
    /*Table Pagination*/
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.filteredLicenses.length) this.currentPage++;
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
    setLicensesDebounced: debounce(function(search) {
      this.isSearching = true;
      setTimeout(function(){
        this.isSearching = false;
        this.filteredLicenses = this.Assign.filter(data =>
        data.softName.toLowerCase().includes(search.toLowerCase()) ||
        data.softCategory.toLowerCase().includes(search.toLowerCase()) ||
        data.softKey.toLowerCase().includes(search.toLowerCase()) ||
        data.lname.toLowerCase().includes(search.toLowerCase()) ||
        data.fname.toLowerCase().includes(search.toLowerCase()) ||
        data.location.toLowerCase().includes(search.toLowerCase()) ||
        data.al_date.toLowerCase().includes(search.toLowerCase()) 
        );
			}.bind(this),1000);
    }, 2000),
    getAssign(){
      // axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getdeployedlicense').then((res) => {
        axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getdeployedlicense').then((res) => {
          console.log(res.data.deployed_Data);
          this.Assign=res.data.deployed_Data;
      }) .catch((err) => {
          console.log(err);
      });
    },
    getLicenses(){
      axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo').then((res) => {
          console.log(res.data.license_Data);
          this.Licenses=res.data.license_Data;
      }) .catch((err) => {
          console.log(err);
      });
    },
    getLocation(){
      axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseloc').then((res) => {
          console.log(res.data.license_Location);
          this.Location=res.data.license_Location;
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
    updateDeployed(){
      let data = new FormData();
      data.append("assign_license_id",this.License_Data.assign_license_id);
      data.append("softID",this.License_Data.softID);
      data.append("emp_id", this.LicenseData.al_emp);
      data.append("loc_id",this.LicenseData.loc_id);
      data.append("al_date",this.LicenseData.al_date);
              
      axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=updatedeployed',data).then((res)=>{
        if(res.data.error){
          alert("Error");
        } else {
          // this.cancelModal();
          this.successAlert = true;
          this.upddeployed = this.dismissSecs;
          location.reload();
        }
        }).catch((err)=>{
          console.log(err);
        })
    },
    checkIn(){
      
        let data = new FormData();
        //this.License_Data = assign_license_id;
        data.append("assign_license_id", this.License_Data.assign_license_id);
        data.append("softID",this.License_Data.softID);
        data.append("emp_id", this.LicenseData.al_emp);
        data.append("loc_id",this.LicenseData.loc_id);

        axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=checkin',data).then((res) => {
          if(res.data.error) {
            console.log("Error", res.data);
          } else {
            this.getAssign();
            location.reload();  
          }
        }).catch((err) => {
          console.log(err);
        });
      },
    checkInRecords(){
      axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getcheckinrecords').then((res) => {
          console.log(res.data.checkIn_Data);
          this.Assign=res.data.checkIn_Data;
      }) .catch((err) => {
          console.log(err);
      });
    },
    //Remove Item
    removeDeployed(){
      let data = new FormData();
        //this.License_Data = assign_license_id;
        data.append("assign_license_id", this.License_Data.assign_license_id);
        data.append("softID",this.License_Data.softID);
        data.append("emp_id", this.LicenseData.al_emp);

        axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=removedeployed',data).then((res) => {
          if(res.data.error) {
            console.log("Error", res.data);
          } else {
            this.alertSuccess= true;
            setTimeout(function () {
                window.location.reload()
            }, 1000);
            this.Reset();
            this.getAssign(); 
            location.reload();
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    showDeleted(){
      axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getdeletedinfo').then((res) => {
          console.log(res.data.deployed_Data);
          this.Assign=res.data.deployed_Data;
      }) .catch((err) => {
          console.log(err);
      });
    }, //End Remove
    exportExcel(type, fn, dl) {
      var elt = document.getElementById('table');
      var wb = XLSX.utils.table_to_book(elt, {sheet:"deployed licenses", raw: true});
      // get particular column data from xlsx file with Vue js,

      return dl ?
      XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
      XLSX.writeFile(wb, fn || ('Deployed-Licenses-Data.' + (type || 'xlsx')));
    },
    exportPDF() {
      const doc = new jsPDF('l', 'mm', 'legal')
      var y = 20;
      doc.text(135, y = y + 15, "DEPLOYED LICENSE RECORDS");
      doc.autoTable({ html: '#table',
                      startY: 50,
                      styles: {
                        cellWidth: 'wrap'
                      },
                      columnStyles: {
                        1: {columnWidth: 'auto'}
                      },
                      columns: [
                        { header: 'License ID', dataKey: 'data.al_id' },
                        { header: 'License Name', dataKey: 'data.al_Name' },
                        { header: 'Category', dataKey: 'data.al_Category' },
                        { header: 'Product Key', dataKey: 'data.al_Key' },
                        { header: 'Assigned To', dataKey: 'data.al_emp' },
                        { header: 'Location', dataKey: 'data.location' },
                        { header: 'Date', dataKey: 'data.al_date' },
                      ],
                    });
      doc.save('Deployed-Licenses-Data.pdf')
    },
    highlightMatches(text) {
      const matchExists = text.toLowerCase().includes(this.search.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.search, 'ig');
      return text.replace(re, matchedText => `<b style="background-color: yellow;">${matchedText}</b>`);
    },
    // removeDeployed(al_id){
    //   if(confirm("Are you sure you want to remove this item?")){
    //     let data = new FormData();
    //     this.LicenseData = al_id;
    //     data.append("al_id",this.LicenseData.al_id);

    //     axios.post('http://localhost/motivit/IMS/src/Api/genelyn.php?action=removedeployed',data).then((res) => {
    //       if(res.data.error) {
    //         console.log("Error", res.data);
    //       } else {
    //         // this.warningAlert = true;
    //         // this.warning = this.dismissSecs
    //         // this.Reset();
    //         alert(res.data.message);
    //         this.getAssign();  
    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //   }
    // },
  },
  computed: {
    isDisabled: function(){
        return !this.al_Name || !this.al_Category ||!this.al_Key;
    },
    sortedLicenses: function() {
      return this.filteredLicenses.filter((row, index) => {
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
  th.pointer {
    cursor: pointer;
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
.btn-primary, .btn-secondary, .btn-confirm, .btn-success{
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
    margin-top: -10px;
}
</style>
