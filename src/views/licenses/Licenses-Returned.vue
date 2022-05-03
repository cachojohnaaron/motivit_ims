<template>
<div class="dashboard">
    <Sidebar />
    <Topbar  />
   
      <h6 class="page-header"><strong>Returned Licenses </strong></h6>
    <v-row>
      <div class="card-buttons d-flex justify-space-between">
        <span class="page-buttons">
        </span>
        <span class="page-buttons">
            <button type="button" class="btn btn-light btn-subheader-third" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
        </span>
      </div>
      </v-row>
    
  <v-row>
    <!--Working Deployed Licenses Table -->
    <div id="tblUser" class="card" style="width:100%;">
        <div class="table-responsive-sm" style="padding:0px 5px 0px 5px">
          <table id="table" class="table-sm table-hover" ref="table" :data="data">
              <thead>
                <tr>
                  <th>License ID<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>License Name<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>Category<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>Product Key<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>Assigned To<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>Location<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  <th>Deployed Date<span v-html="sortArrow" style="cursor: pointer;"></span></th>
                  
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
                  
                </tr>
              </tbody>
            </table>
        </div>
    </div>
    </v-row>
  

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
      search: '',
      isHidden: false, /*HideTableRow*/
      page: 1, /*Pagination*/
      rows: 100,
      perPage: 10,
      currentPage: 1,
      ascSort: true,
      //Alert
      successAlert: false,
      warningAlert: false,
      dismissSecs: 5,
      upddeployed: 0,
      checkAlert: 0,
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
    

    //this.getAssign();
    this.getLicenses();
    this.getLocation();
    this.getEmployee();
    //this.showDeleted();
    this.checkInRecords();
  },
  methods:{
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
    getAssign(){
      axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getdeployedlicense').then((res) => {
          console.log(res.data.deployed_Data);
          this.Assign=res.data.deployed_Data;
      }) .catch((err) => {
          console.log(err);
      });
    },
    getLicenses(){
      axios.get('http://localhost/motivit/IMS_licenses/src/Api/genelyn.php?action=getlicenseinfo').then((res) => {
          console.log(res.data.license_Data);
          this.Licenses=res.data.license_Data;
      }) .catch((err) => {
          console.log(err);
      });
    },
    getLocation(){
      axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getlicenseloc').then((res) => {
          console.log(res.data.license_Location);
          this.Location=res.data.license_Location;
      }) .catch((err) => {
          console.log(err);
      });
    },
    getEmployee(){
      axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getemployee').then((res) => {
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
              
      axios.post('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=updatedeployed',data).then((res)=>{
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

        axios.post('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=checkin',data).then((res) => {
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
      axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getcheckinrecords').then((res) => {
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

        axios.post('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=removedeployed',data).then((res) => {
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
      axios.get('http://localhost/motivit/IMS_Licenses/src/Api/genelyn.php?action=getdeletedinfo').then((res) => {
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
      return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
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
    sortArrow() {
      if (this.ascSort) {
        return "&#9652;"; // up arrow
      } else {
        return "&#9662;"; // down arrow
      }
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
      });
    }
  }

};
</script>
<style scoped>



</style>
