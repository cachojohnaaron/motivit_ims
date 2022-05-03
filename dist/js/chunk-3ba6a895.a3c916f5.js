(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ba6a895"],{"105d":function(t,e,a){"use strict";a("560a")},"33c3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("Sidebar"),a("Topbar"),t._m(0),a("v-row",[a("div",{staticClass:"card-buttons d-flex justify-space-between"},[a("span",{staticClass:"page-buttons"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control mb-3",attrs:{type:"text",id:"search",placeholder:"Type to search.."},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v("   "),t.isSearching?a("span",{staticClass:"me-2 pt-3"},[a("v-chip",{staticClass:"blue lighten-5",staticStyle:{height:"25px"}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"15"}}),t._v("  "),a("v-text",{staticStyle:{color:"blue","font-size":"11px"}},[t._v("Processing Data..")])],1)],1):t._e()]),a("span",{staticClass:"page-buttons"},[a("button",{staticClass:"btn btn-light btn-subheader-third",attrs:{type:"button","data-toggle":"modal","data-target":"#exp-options","data-backdrop":"static","data-keyboard":"false"},on:{click:function(e){return t.showExport()}}},[t._v("Export")])])])]),a("v-row",[a("div",{staticClass:"card",staticStyle:{width:"100%",padding:"5px"},attrs:{id:"tblUser"}},[a("div",{staticClass:"table-responsive-sm",staticStyle:{padding:"0px 5px 0px 5px"}},[a("table",{staticClass:"table-sm table-hover",attrs:{id:"tblAssetDeployed"}},[a("thead",{},[a("tr",[a("th",[t._v("Asset Tag")]),a("th",[t._v("Serial Number")]),a("th",[t._v("Category")]),a("th",[t._v("Model")]),a("th",[t._v("Status")]),a("th",[t._v("Deployed To")]),a("th",[t._v("Deploy Date")]),a("th",[t._v("Action")])])]),a("tbody",t._l(t.filteredAssets,(function(e){return a("tr",{key:e},[a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.asset_tag))}},[t._v(t._s(e.asset_tag))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.serialno))}},[t._v(t._s(e.serialno))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.category))}},[t._v(t._s(e.category))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.model))}},[t._v(t._s(e.model))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.status))}},[t._v(t._s(e.status))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.name))}},[t._v(t._s(e.name))]),a("td",{domProps:{innerHTML:t._s(t.highlightMatches(e.transaction_date))}},[t._v(t._s(e.transaction_date))]),a("td",[a("button",{staticClass:"btn-sm btn-action",attrs:{"modal-no-backdrop":"","data-toggle":"modal","data-target":"#rtn-asset"},on:{click:function(a){return t.showModalReturn(e)}}},[a("v-icon",{staticStyle:{"font-size":"16px"},attrs:{color:"warning",title:"Return Asset"}},[t._v("mdi-refresh")])],1)])])})),0)])])])]),a("div",{staticClass:"modal fade modal-update-asset",staticStyle:{"font-size":"13px"},attrs:{id:"exp-options",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog rtn-asset",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Generate Report")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(e){return t.cancelModal()}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),a("div",{staticClass:"modal-body"},[a("label",[t._v("Custom Date Range:")]),t._m(1),a("label",{staticClass:"mt-3"},[t._v("Export Options:")]),a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"d-grid col-6"},[a("button",{staticClass:"btn btn-primary btn-block",on:{click:function(e){return t.exportPDF("pdf")}}},[t._v("PDF")])]),a("div",{staticClass:"d-grid col-6"},[a("button",{staticClass:"btn btn-primary btn-block",on:{click:function(e){return t.exportExcel("xlsx")}}},[t._v("Excel")])])])])])])]),a("div",{staticClass:"modal fade modal-update-asset",attrs:{id:"rtn-asset",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog rtn-asset",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(2),a("div",{staticClass:"modal-body"},[a("form",{attrs:{action:"",method:"POST"}},[a("div",{staticStyle:{display:"none"}},[a("div",{staticClass:"row align-items-center"},[t._m(3),a("div",{staticClass:"col-auto"},[a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.asset_id,expression:"UsersData.asset_id",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"asset_id",id:"asset_id",placeholder:"",readonly:""},domProps:{value:t.UsersData.asset_id},on:{change:function(e){return t.$set(t.UsersData,"asset_id",e.target.value)}}})])]),a("div",{staticClass:"row align-items-center"},[t._m(4),a("div",{staticClass:"col-auto"},[a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.emp_id,expression:"UsersData.emp_id",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"emp_id",id:"emp_id",placeholder:"",readonly:""},domProps:{value:t.UsersData.emp_id},on:{change:function(e){return t.$set(t.UsersData,"emp_id",e.target.value)}}})])])]),t._m(5),a("br"),a("hr"),a("div",{staticClass:"modal-bottom-rtn"},[a("b-button",{staticClass:"mb-3 btn btn-secondary",attrs:{block:"","data-dismiss":"modal"},on:{click:function(e){return t.cancelModal()}}},[t._v("Cancel")]),a("b-button",{staticClass:"ms-2 mb-3 btn btn-success",attrs:{block:""},on:{click:function(e){return e.preventDefault(),t.returnAsset()}}},[t._v("Yes")])],1)])])])])])],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h6",{staticClass:"page-header"},[a("strong",[t._v("Deployed Assets ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"d-grid col-6"},[a("div",{staticClass:"input-group flex-nowrap"},[a("span",{staticClass:"input-group-text",attrs:{id:"addon-wrapping","data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Date of Purchase"}},[t._v("From")]),a("input",{staticClass:"start-date form-control",attrs:{type:"date",id:"fromDate",name:"fromDate","aria-describedby":"addon-wrapping"}})])]),a("div",{staticClass:"d-grid col-6"},[a("div",{staticClass:"input-group flex-nowrap"},[a("span",{staticClass:"input-group-text",attrs:{id:"addon-wrapping","data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Date of Purchase"}},[t._v("To")]),a("input",{staticClass:"end-date form-control",attrs:{type:"date",id:"toDate",name:"toDate","aria-describedby":"addon-wrapping"}})])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Return Asset")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-auto"},[a("label",{attrs:{for:"asset_id"}},[a("b",[t._v("Asset ID")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-auto"},[a("label",{attrs:{for:"emp_id"}},[a("b",[t._v("Employee ID")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"text-align":"center"}},[a("h6",{staticClass:"rtn-modal-title"},[t._v("Are you sure you want to return this asset?")])])}],i=(a("4de4"),a("caad"),a("2532"),a("b0c0"),a("ac1f"),a("841c"),a("4d63"),a("25f0"),a("5319"),a("5ea5")),r=a("ddc0"),n=a("2ef0"),l=a("bc3a"),d=a.n(l),c=a("8baf"),p=(a("0da4"),a("279c")),u=a.n(p),h={name:"asset",data:function(){return{search:"",isSearching:!1,UsersData:{user_id:null},EmployeeData:{emp_id:null},Assets:[],Employees:[],filteredAssets:[]}},components:{Topbar:r["a"],Sidebar:i["a"]},created:function(){var t=this;if(this.$session.exists("login-session")){var e=this.$session.get("login-session"),a=this.$session.get("login-session-enc");u.a.compare(e,a,(function(e,a){0==a&&t.$router.push({path:"/"})}))}else this.$router.push({path:"/"});this.getAllAssets(),this.getAllEmployee(),this.getDropdownEmployee()},watch:{search:{handler:function(t){this.setAssetsDeployedDebounced(t)},immediate:!0}},methods:{showModal:function(t){this.UsersData=t,this.$bvModal.show("upd-licenses")},showModalReturn:function(t){this.UsersData=t,this.$bvModal.show("return-asset")},cancelModal:function(){this.$bvModal.hide("upd-licenses"),this.$bvModal.hide("return-asset")},getAllAssets:function(){var t=this;d.a.get("http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetDeployed").then((function(e){console.log(e.data.user_Data),t.Assets=e.data.user_Data})).catch((function(t){console.log(t)}))},getAllEmployee:function(){var t=this;d.a.get("http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallemployee2").then((function(e){console.log(e.data.emp_Data),t.Users=e.data.emp_Data})).catch((function(t){console.log(t)}))},getDropdownEmployee:function(){var t=this;d.a.get("http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddEmployee").then((function(e){console.log(e.data.user_Data),t.Employees=e.data.user_Data})).catch((function(t){console.log(t)}))},returnAsset:function(){var t=this,e=new FormData;e.append("asset_id",this.UsersData.asset_id),e.append("emp_id",this.UsersData.emp_id),d.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=returnAsset",e).then((function(e){e.data.error?alert("Error"):(location.reload(),t.$bvModal.hide("return-asset"))})).catch((function(t){console.log(t)}))},showExport:function(){this.$bvModal.show("exp-options")},exportPDF:function(){var t=new c["default"]("l","mm","legal"),e=20;t.text(135,e+=15,"ALL DEPLOYED ASSETS"),t.autoTable({html:"#tblAssetDeployed",startY:50,styles:{cellWidth:"wrap"},columnStyles:{1:{columnWidth:"auto"}},columns:[{header:"asset_tag"},{header:"serial_no"},{header:"category"},{header:"model"},{header:"status"},{header:"deployed_to"},{header:"deploy_date"}]}),t.save("Report-Asset_All.pdf")},setAssetsDeployedDebounced:Object(n["debounce"])((function(t){this.isSearching=!0,setTimeout(function(){this.isSearching=!1,this.filteredAssets=this.Assets.filter((function(e){return e.asset_tag.toLowerCase().includes(t.toLowerCase())||e.serialno.toLowerCase().includes(t.toLowerCase())||e.category.toLowerCase().includes(t.toLowerCase())||e.model.toLowerCase().includes(t.toLowerCase())||e.status.toLowerCase().includes(t.toLowerCase())||e.name.toLowerCase().includes(t.toLowerCase())||e.transasction_date.toLowerCase().includes(t.toLowerCase())}))}.bind(this),1e3)}),2e3),highlightMatches:function(t){var e=t.toLowerCase().includes(this.search.toLowerCase());if(!e)return t;var a=new RegExp(this.search,"ig");return t.replace(a,(function(t){return'<b style="background-color: yellow;">'.concat(t,"</b>")}))}}},m=h,v=(a("105d"),a("2877")),b=a("6544"),_=a.n(b),g=a("cc20"),f=a("132d"),C=a("490a"),y=a("0fd9"),w=Object(v["a"])(m,s,o,!1,null,"d5577064",null);e["default"]=w.exports;_()(w,{VChip:g["a"],VIcon:f["a"],VProgressCircular:C["a"],VRow:y["a"]})},"560a":function(t,e,a){}}]);
//# sourceMappingURL=chunk-3ba6a895.a3c916f5.js.map