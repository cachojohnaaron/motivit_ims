<template>
  <v-app id="inspire">
    <v-main style="background: #F7F7F7">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<!-- v-if="!$route.meta.hideTopbar"-->

<script>
//import Sidebar from "./components/Sidebar";
//import Topbar from "./components/Topbar";
export default {
  name: "App",
  //components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    //drawer: null,
  }),
  methods: {},
};
</script>

<style>

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f7f7f7; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #1A4684; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0D1B38; 
}
.btn-subheader {
    background: #1A4684;
    color: white !important;
    padding: 2px 15px;
    border-radius: 0px;
    margin-right: 10px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.btn-subheader-third {
    background-image: linear-gradient(to right, #1A4684, #008DEA);
    color: white !important;
    padding: 2px 15px;
    border-radius: 0px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.dashboard {
    margin-top: -20px;
}

.modal-dialog {
    max-width: fit-content;
    position: relative;
    top: 20%;
}
.modal-body{
    padding-right:23px;
}

.form-group,
.form-control,
.btn {
    font-size: 11px;
}

.form-control {
    height: 30px;
}

.form-group {
    width: 200px;
    margin-left: 10px;
}

.form-group label {
    margin-bottom: -1px;
}

.modal-title {
    color: #1A4684;
    font-size: 15px;
}
.rtn-accessory, .rtn-asset{
  width: 400px;
}
.rtn-gen-rep{
  width: fit-content !important ;
}
.rtn-add-new{
  width:270px;
}

.card{
  width:100%; 
  margin-top:7px;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2);
}
.card-buttons{
  border-radius: 5px;
  width:100%; 
  background:white;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.2);
  padding: 10px;
}
.page-buttons{
  height:25px;
}
.page-buttons-dashboard{
  height:25px;
  margin-right:-15px;
  margin-top: -20px;
}

.page-header{
  margin-left:-10px;
  color: #1A4684;
  margin-bottom: 15px;
}
.page-header-dashboard{
  margin-left:-15px;
  color: #1A4684;
  margin-top: -20px;
}

.modal-bottom{
  text-align:right; 
  width:100%; 
  margin-bottom:-20px; 
  margin-top:-10px;
}
.modal-bottom-rtn{
  text-align:center; 
  width:100%; 
  margin-bottom:-20px; 
  margin-top:-10px;
}
/** 
hr{
  margin-top: -8px;
}
*/
.notes{
  margin-left:5px;
}



.alert{
  font-size:11px;
  height: 30px;
  line-height:30px;
  padding:0px 15px;
  margin-bottom: 20px;
  margin-top: -5px;
}

.table-sm, #tblUser{
  font-size: 11px;
  width: 100%;
}
.btn{
  font-size: 11px;
  border-radius: 0;
}
.btn-primary{
  background:#1A4684;
}
#search{
  width:180px; 
  display:inline-block;
  font-size: 12px;
  height: 24px;
}
.btn-action{
    height:20px;
    padding: 0;
    margin-right: 10px;
}
.input-group-text{
  height: 23px; padding-left:3px; padding-right:3px;font-size:12px;
}
.rtn-modal-title{
  font-size: 15px;
}
.close:active{
  border-style: outset;
}
</style>