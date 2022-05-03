<template>
<div class="dashboard">
    <Sidebar />
    <Topbar />
    <!-- Header Buttons -->
    
        <h6 class="page-header"><strong>Deployed Licenses</strong></h6>
        <v-row>
      <div class="card-buttons d-flex justify-space-between">
        <span class="page-buttons">
          <input type="text" v-model="search" class="form-control mb-3" id="search" placeholder="Type to search.."/> &nbsp;
        </span>
        <span class="page-buttons">
          <button type="button" class="btn btn-light btn-subheader" @click="goDeleted()">Show Deleted</button>
          <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
        </span>
      </div>
      </v-row>

    <v-row>
    <!--Table for All Deployed Licenses-->
    <div id="tblUser" class="card" >
      <div class="d-flex justify-content-end mb-3">
        <!-- Search and Table Row -->
        <label class="me-5 pt-3 ms-2">Rows per page:</label>
        <div class="row align-items-center"> 
          <div class="d-grid" style="size: 3vw">
            <select class="custom-select form-control-sm" name="rows" id="rows" v-model.lazy="pageSize">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        
      </div> 
      <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
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
              <td v-html="highlightMatches(data.softID)">{{data.softID}}</td>
              <td v-html="highlightMatches(data.softName)">{{data.softName}}</td>
              <td v-html="highlightMatches(data.softCategory)">{{data.softCategory}}</td>
              <td v-html="highlightMatches(data.softKey)">{{data.softKey}}</td>
              <td v-html="highlightMatches(data.name)">{{data.name}}</td>
              <td v-html="highlightMatches(data.location)">{{data.location}}</td>
              <td v-html="highlightMatches(data.al_date)">{{data.al_date}}</td>
              <td v-if="!isHidden">
                <button class="btn-sm btn-action" @click="checkIn(data)" modal-no-backdrop data-toggle="modal" data-target="#rtn-license" data-backdrop="static" data-keyboard="false">
                  <v-icon color="warning" title="Return License" style="font-size:16px;">mdi-refresh</v-icon>
                </button>
                <button class="btn-sm btn-action" @click="removeDeployed(data)" modal-no-backdrop data-toggle="modal" data-target="#rtn-license" data-backdrop="static" data-keyboard="false">
                  <v-icon color="red" title="Remove License" style="font-size:16px;">mdi-delete</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
        <div class="row pt-2">
            <div class="col-auto ms-auto">
                <p class="pe-5">
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <span class="me-5 pt-3">Showing page <b>{{ page }}</b> of <b>{{ pages }}</b> pages</span>
                            <li class="page-item"><a class="page-link" @click="prevPage"><v-icon color="gray">mdi-skip-previous</v-icon></a></li>
                            <li class="page-item"><a class="page-link" @click="nextPage"><v-icon color="gray">mdi-skip-next</v-icon></a></li>
                        </ul>
                    </nav>
                </p>
            </div>
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

</div>
</template>


<script>
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import axios from "axios";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf"
import 'jspdf-autotable'
import bcrypt from 'bcryptjs';
export default {
  name: "license",
  data() {
    return {
      drawer: null,
      isHidden: false, /*HideTableRow*/
      rows: 100,
      //Alert
      successAlert: false,
      warningAlert: false,
      dismissSecs: 5,
      upddeployed: 0,
      checkAlert: 0,
      /*Pagination*/
      page: 1,
      perPage: 10,
      currentPage: 1,
      pageSize:5,
      search: '',
      pages:null,
      /*Table Sorting*/
      currentSort:'softName',
      currentSortDir:'asc',
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
    };
  },
  components: { Topbar, Sidebar },
  created(){
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
    

    this.getAssign();
    this.getLicenses();
    this.getLocation();
    this.getEmployee();
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
    showExport(){
      this.$bvModal.show('exp-options')
    },
    nextPage:function() {
            if((this.currentPage*this.pageSize) < this.Licenses.length) this.currentPage++;
            this.page=this.currentPage;
    },
    prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
            this.page=this.currentPage;
    },
    sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
    },
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
    checkIn(assign_license_id){
      if(confirm("Are you sure you want to return this item?")){
        let data = new FormData();
        this.License_Data = assign_license_id;
        data.append("assign_license_id", this.License_Data.assign_license_id);
        data.append("softID",this.License_Data.softID);
        data.append("emp_id", this.LicenseData.al_emp);
        data.append("loc_id",this.LicenseData.loc_id);

        axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=checkin',data).then((res) => {
          if(res.data.error) {
            console.log("Error", res.data);
          } else {
            this.checkAlert = this.dismissSecs;
            this.getAssign();
            location.reload();  
          }
        }).catch((err) => {
          console.log(err);
        });
      }
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
    removeDeployed(assign_license_id){
      if(confirm("Are you sure you want to remove this item?")){
        let data = new FormData();
        this.License_Data = assign_license_id;
        data.append("assign_license_id", this.License_Data.assign_license_id);
        data.append("softID",this.License_Data.softID);
        data.append("emp_id", this.LicenseData.al_emp);

        axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=removedeployed',data).then((res) => {
          if(res.data.error) {
            console.log("Error", res.data);
          } else {
            this.warningAlert = true;
            this.warning = this.dismissSecs
            this.Reset();
            this.getAssign(); 
            location.reload();
          }
        }).catch((err) => {
          console.log(err);
        });
      } 
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
    filteredDeployed() {
      return this.Assign.filter((data) => {
        return data.softName.toLowerCase().includes(this.search.toLowerCase())
            ||  data.softCategory.toLowerCase().includes(this.search.toLowerCase())
            ||  data.softKey.toLowerCase().includes(this.search.toLowerCase())
            ||  data.lname.toLowerCase().includes(this.search.toLowerCase())
            ||  data.fname.toLowerCase().includes(this.search.toLowerCase())
            ||  data.location.toLowerCase().includes(this.search.toLowerCase())
            ||  data.al_date.toLowerCase().includes(this.search.toLowerCase());
      }).filter((row, index) => {
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
.btn-primary, .btn-secondary{
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
