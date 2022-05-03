(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b1f218e2"],{"1e66":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard"},[e("Sidebar"),e("Topbar"),t._m(0),e("v-row",[e("div",{staticClass:"card-buttons d-flex justify-space-between"},[e("span",{staticClass:"page-buttons"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control mb-3",attrs:{type:"text",id:"search",placeholder:"Type to search.."},domProps:{value:t.search},on:{input:function(a){a.target.composing||(t.search=a.target.value)}}}),t._v("   "),t.isSearching?e("span",{staticClass:"me-2 pt-3"},[e("v-chip",{staticClass:"blue lighten-5",staticStyle:{height:"25px"}},[e("v-progress-circular",{attrs:{indeterminate:"",color:"primary",size:"15"}}),t._v("  "),e("v-text",{staticStyle:{color:"blue","font-size":"11px"}},[t._v("Processing Data..")])],1)],1):t._e()]),e("span",{staticClass:"page-buttons"},[e("button",{staticClass:"btn btn-light btn-subheader",attrs:{type:"button","data-toggle":"modal","data-target":"#exp-options","data-backdrop":"static","data-keyboard":"false"}},[t._v("Export")]),e("button",{staticClass:"btn btn-light btn-subheader",attrs:{type:"button"},on:{click:function(a){return t.goDeleted()}}},[t._v("Show Deleted")]),e("button",{staticClass:"btn btn-light btn-subheader-third",attrs:{type:"button","data-toggle":"modal","data-target":"#add-accessory","data-backdrop":"static","data-keyboard":"false"},on:{click:function(a){return t.openAddForm()}}},[t._v("Create New")])])])]),e("v-row",[e("div",{staticClass:"card",staticStyle:{width:"100%",padding:"5px"},attrs:{id:"tblUser"}},[e("div",{staticClass:"table-responsive-sm",staticStyle:{padding:"0px 5px 0px 5px"}},[e("table",{staticClass:"table-sm table-hover",attrs:{id:"tblAccessoryAll"}},[e("thead",{},[e("tr",[e("th",[t._v("Accessory ID")]),e("th",[t._v("Name")]),e("th",[t._v("Category")]),e("th",[t._v("Manufacturer")]),e("th",{attrs:{title:"Orange: items <= 5\r\nRed: items = 0"}},[t._v("Quantity")]),e("th",[t._v("Location")]),e("th",[t._v("Actions")])])]),e("tbody",t._l(t.filteredAccessory,(function(a){return e("tr",{key:a},[e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.acs_id))}},[t._v(t._s(a.acs_id))]),e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.acs_name))}},[t._v(t._s(a.acs_name))]),e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.acs_category))}},[t._v(t._s(a.acs_category))]),e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.acs_manufacturer))}},[t._v(t._s(a.acs_manufacturer))]),e("v-chip",{staticStyle:{"font-size":"11px",height:"20px","padding-left":"1px","padding-right":"1px","margin-top":"5px"},attrs:{color:t.getColor(a.quantity)}},[e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.quantity))}},[t._v(t._s(a.quantity))])]),e("td",{domProps:{innerHTML:t._s(t.highlightMatches(a.location))}},[t._v(t._s(a.location))]),e("td",[e("button",{staticClass:"btn-sm btn-action",attrs:{"modal-no-backdrop":"","data-toggle":"modal","data-target":"#deploy-accessory","data-backdrop":"static","data-keyboard":"false"},on:{click:function(e){return t.showDeployModal(a)}}},[e("v-icon",{staticStyle:{"font-size":"16px"},attrs:{color:"warning",title:"Deploy Accessory"}},[t._v("mdi-rocket-launch")])],1),e("button",{staticClass:"btn-sm btn-action",attrs:{"modal-no-backdrop":"","data-toggle":"modal","data-target":"#upd-accessory","data-backdrop":"static","data-keyboard":"false"},on:{click:function(e){return t.showModal(a)}}},[e("v-icon",{staticStyle:{"font-size":"16px"},attrs:{color:"success",title:"Edit Accessory"}},[t._v("mdi-pencil")])],1),e("button",{staticClass:"btn-sm btn-action",attrs:{"modal-no-backdrop":"","data-toggle":"modal","data-target":"#delete-accessory"},on:{click:function(e){return t.showModalDelete(a)}}},[e("v-icon",{staticStyle:{"font-size":"16px"},attrs:{color:"red",title:"Delete Accessory"}},[t._v("mdi-delete")])],1)])],1)})),0)])])])]),e("div",{staticClass:"modal fade modal-update-asset",staticStyle:{"font-size":"13px"},attrs:{id:"exp-options",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog rtn-accessory",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Generate Report")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(a){return t.cancelModal()}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),e("div",{staticClass:"modal-body"},[e("label",[t._v("Custom Date Range:")]),t._m(1),e("label",{staticClass:"mt-3"},[t._v("Export Options:")]),e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"d-grid col-6"},[e("button",{staticClass:"btn btn-primary btn-block",on:{click:function(a){return t.exportPDF("pdf")}}},[t._v("PDF")])]),e("div",{staticClass:"d-grid col-6"},[e("button",{staticClass:"btn btn-primary btn-block",on:{click:function(a){return t.exportExcel("xlsx")}}},[t._v("Excel")])])])])])])]),e("div",{staticClass:"modal fade modal-update-asset",staticStyle:{"font-size":"13px"},attrs:{id:"upd-accessory",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Update Accessory Information")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(a){return t.cancelModal()}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),e("div",{staticClass:"modal-body"},[t.alertSuccess?e("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"success",size:"15px"}},[t._v("mdi-checkbox-marked-circle")]),t._v(" Accessory record updated! ")],1):t._e(),t.alertError?e("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"red",size:"15px"}},[t._v("mdi-alert-circle")]),t._v(" Please fill up all of the required fields"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])],1):t._e(),e("form",{attrs:{name:"updAccessory",action:"",method:"POST"}},[e("b-modal",{attrs:{id:"upd-accessory","hide-backdrop":"","no-close-on-backdrop":"","hide-footer":"","content-class":"shadow",title:"Update Accessory Information"}},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_id"}},[e("b",[t._v("Accessory ID"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_id,expression:"UsersData.acs_id",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_id",id:"acs_id",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_id},on:{change:function(a){return t.$set(t.UsersData,"acs_id",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_name"}},[e("b",[t._v("Accessory Name"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_name,expression:"UsersData.acs_name",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_name",id:"acs_name",placeholder:""},domProps:{value:t.UsersData.acs_name},on:{change:function(a){return t.$set(t.UsersData,"acs_name",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_category"}},[e("b",[t._v("Category"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("select",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_category,expression:"UsersData.acs_category",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",staticStyle:{height:"23px","padding-top":"0","padding-bottom":"0"},attrs:{name:"acs_category",id:"acs_category"},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.UsersData,"acs_category",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"0"}},[t._v(" -- Select Category -- ")]),t._l(t.Category,(function(a){return e("option",{domProps:{value:a.choice}},[t._v(t._s(a.choice))])}))],2)])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_manufacturer"}},[e("b",[t._v("Manufacturer"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_manufacturer,expression:"UsersData.acs_manufacturer",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_manufacturer",id:"acs_manufacturer",placeholder:""},domProps:{value:t.UsersData.acs_manufacturer},on:{change:function(a){return t.$set(t.UsersData,"acs_manufacturer",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"location"}},[e("b",[t._v("Location"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.location,expression:"UsersData.location",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"location",id:"location",placeholder:""},domProps:{value:t.UsersData.location},on:{change:function(a){return t.$set(t.UsersData,"location",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2",staticStyle:{width:"100px"}},[e("label",{attrs:{for:"quantity"}},[e("b",[t._v("Quantity"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.quantity,expression:"UsersData.quantity",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"number",name:"quantity",id:"quantity",placeholder:""},domProps:{value:t.UsersData.quantity},on:{change:function(a){return t.$set(t.UsersData,"quantity",a.target.value)}}})])]),e("hr"),e("div",{staticClass:"modal-bottom"},[e("button",{staticClass:"mb-3 btn btn-secondary",attrs:{block:"","data-dismiss":"modal"},on:{click:function(a){return t.cancelModal()}}},[t._v("Cancel")]),e("button",{staticClass:"ms-2 mb-3 btn btn-primary",attrs:{block:""},on:{click:function(a){return a.preventDefault(),t.updateAccessory()}}},[t._v("Save Changes")])])])],1)])])])]),e("div",{staticClass:"modal fade modal-update-asset",staticStyle:{"font-size":"13px"},attrs:{id:"deploy-accessory",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(2),e("div",{staticClass:"modal-body"},[t.alertSuccess?e("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"success",size:"15px"}},[t._v("mdi-checkbox-marked-circle")]),t._v("  "),e("strong",[t._v("Success!")]),t._v(" Accessory deployed. ")],1):t._e(),t.alertError?e("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"red",size:"15px"}},[t._v("mdi-alert-circle")]),t._v(" Please fill up all of the required fields"),e("span",{staticStyle:{color:"red"}},[t._v("  *")])],1):t._e(),e("form",{attrs:{name:"",action:"",method:"POST"}},[e("b-modal",{attrs:{id:"modalDeployAccessory","hide-backdrop":"","no-close-on-backdrop":"","hide-footer":"","content-class":"shadow",title:"Deploy Accessory"}},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_id"}},[e("b",[t._v("Accessory ID")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_id,expression:"UsersData.acs_id",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_id",id:"acs_id",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_id},on:{change:function(a){return t.$set(t.UsersData,"acs_id",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_name"}},[e("b",[t._v("Accessory Name")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_name,expression:"UsersData.acs_name",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_name",id:"acs_name",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_name},on:{change:function(a){return t.$set(t.UsersData,"acs_name",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_category"}},[e("b",[t._v("Category")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_category,expression:"UsersData.acs_category",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_category",id:"acs_category",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_category},on:{change:function(a){return t.$set(t.UsersData,"acs_category",a.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"acs_manufacturer"}},[e("b",[t._v("Manufacturer")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_manufacturer,expression:"UsersData.acs_manufacturer",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"acs_manufacturer",id:"acs_manufacturer",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_manufacturer},on:{change:function(a){return t.$set(t.UsersData,"acs_manufacturer",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2"},[e("label",{attrs:{for:"location"}},[e("b",[t._v("Location")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.location,expression:"UsersData.location",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"location",id:"location",placeholder:"",readonly:""},domProps:{value:t.UsersData.location},on:{change:function(a){return t.$set(t.UsersData,"location",a.target.value)}}})]),e("div",{staticClass:"form-group mb-2",staticStyle:{width:"100px"}},[e("label",{attrs:{for:"quantity"}},[e("b",[t._v("Quantity")])]),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.quantity,expression:"UsersData.quantity",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"number",name:"quantity",id:"quantity",placeholder:"",readonly:""},domProps:{value:t.UsersData.quantity},on:{change:function(a){return t.$set(t.UsersData,"quantity",a.target.value)}}})])]),e("hr"),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"employee"}},[e("b",[t._v("Deploy To:"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])]),e("select",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.employee,expression:"UsersData.employee",modifiers:{lazy:!0}}],staticClass:"form-control",staticStyle:{height:"23px","padding-top":"0","padding-bottom":"0"},attrs:{name:"employee",id:"employee"},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.UsersData,"employee",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"1"}},[t._v("-- Select Employee --")]),t._l(t.Employees,(function(a){return e("option",{domProps:{value:a.emp_id}},[t._v(t._s(a.name))])}))],2)]),e("hr"),e("div",{staticClass:"modal-bottom"},[e("button",{staticClass:"mb-3 btn btn-secondary",attrs:{"data-dismiss":"modal"}},[t._v("Cancel")]),e("button",{staticClass:"ms-2 mb-3 btn btn-warning",attrs:{block:""},on:{click:function(a){return a.preventDefault(),t.deployAccessory()}}},[t._v("Deploy")])])])],1)])])])]),e("div",{staticClass:"modal fade modal-update-asset",attrs:{id:"add-accessory",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(3),e("div",{staticClass:"modal-body"},[t.alertSuccess?e("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"success",size:"15px"}},[t._v("mdi-checkbox-marked-circle")]),t._v("  "),e("strong",[t._v("Success!")]),t._v(" New accessory record added. ")],1):t._e(),t.alertError?e("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"red",size:"15px"}},[t._v("mdi-alert-circle")]),t._v(" Please fill up all of the required fields"),e("span",{staticStyle:{color:"red"}},[t._v("  *")])],1):t._e(),e("form",{attrs:{action:"",method:"POST",id:"myForm"}},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group"},[t._m(4),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_name,expression:"UsersData.acs_name",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{type:"text",name:"acs_name",id:"acs_name",placeholder:""},domProps:{value:t.UsersData.acs_name},on:{change:function(a){return t.$set(t.UsersData,"acs_name",a.target.value)}}})]),e("div",{staticClass:"form-group"},[t._m(5),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.location,expression:"UsersData.location",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{type:"text",name:"location",id:"location",placeholder:""},domProps:{value:t.UsersData.location},on:{change:function(a){return t.$set(t.UsersData,"location",a.target.value)}}})]),e("div",{staticClass:"form-group"},[t._m(6),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_manufacturer,expression:"UsersData.acs_manufacturer",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{type:"text",name:"acs_manufacturer",id:"acs_manufacturer",placeholder:""},domProps:{value:t.UsersData.acs_manufacturer},on:{change:function(a){return t.$set(t.UsersData,"acs_manufacturer",a.target.value)}}})])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"form-group"},[t._m(7),e("select",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_category,expression:"UsersData.acs_category",modifiers:{lazy:!0}}],staticClass:"form-control",staticStyle:{height:"23px","padding-top":"0","padding-bottom":"0"},attrs:{name:"acs_category",id:"acs_category"},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.UsersData,"acs_category",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"0"}},[t._v(" -- Select Category -- ")]),t._l(t.Category,(function(a){return e("option",{domProps:{value:a.choice}},[t._v(t._s(a.choice))])}))],2)]),e("div",{staticClass:"form-group",staticStyle:{width:"100px"}},[t._m(8),e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.quantity,expression:"UsersData.quantity",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{type:"number",name:"quantity",id:"quantity",placeholder:""},domProps:{value:t.UsersData.quantity},on:{change:function(a){return t.$set(t.UsersData,"quantity",a.target.value)}}})])]),e("hr"),e("div",{staticClass:"modal-bottom"},[e("button",{staticClass:"mb-3 btn btn-secondary btn-sm",attrs:{block:"","data-dismiss":"modal"},on:{click:function(a){return t.cancelModal()}}},[t._v("Cancel")]),e("button",{staticClass:"ms-2 mb-3 btn btn-primary btn-sm",attrs:{block:""},on:{click:function(a){return a.preventDefault(),t.AddAccessory()}}},[t._v("Add Accessory")])])])])])])]),e("div",{staticClass:"modal fade modal-update-asset",attrs:{id:"delete-accessory",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog rtn-asset",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(9),e("div",{staticClass:"modal-body"},[t.alertSuccess?e("div",{staticClass:"alert alert-success",attrs:{role:"alert"}},[e("v-icon",{attrs:{color:"success",size:"15px"}},[t._v("mdi-checkbox-marked-circle")]),t._v("  "),e("strong",[t._v("Success!")]),t._v(" Accessory record moved to archived.")],1):t._e(),e("form",{attrs:{action:"",method:"POST"}},[e("div",{staticStyle:{display:"none"}},[e("div",{staticClass:"row align-items-center"},[t._m(10),e("div",{staticClass:"col-auto"},[e("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.UsersData.acs_id,expression:"UsersData.acs_id",modifiers:{lazy:!0}}],staticClass:"form-control mb-3",attrs:{type:"text",name:"asset_id",id:"asset_id",placeholder:"",readonly:""},domProps:{value:t.UsersData.acs_id},on:{change:function(a){return t.$set(t.UsersData,"acs_id",a.target.value)}}})])])]),t._m(11),e("br"),e("hr"),e("div",{staticClass:"modal-bottom-rtn"},[e("b-button",{staticClass:"mb-3 btn btn-secondary",attrs:{"data-dismiss":"modal"}},[t._v("Cancel")]),e("b-button",{staticClass:"ms-2 mb-3 btn btn-confirm",staticStyle:{background:"rgb(163, 4, 4)",color:"white"},attrs:{block:""},on:{click:function(a){return a.preventDefault(),t.DeleteAccessory()}}},[t._v("Confirm")])],1)])])])])])],1)},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h6",{staticClass:"page-header"},[e("strong",[t._v("Accessories ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"d-grid col-6"},[e("div",{staticClass:"input-group flex-nowrap"},[e("span",{staticClass:"input-group-text",attrs:{id:"addon-wrapping","data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Date of Purchase"}},[e("small",[t._v("From")])]),e("input",{staticClass:"start-date form-control",attrs:{type:"date",id:"fromDate",name:"fromDate","aria-describedby":"addon-wrapping"}})])]),e("div",{staticClass:"d-grid col-6"},[e("div",{staticClass:"input-group flex-nowrap"},[e("span",{staticClass:"input-group-text",attrs:{id:"addon-wrapping","data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Date of Purchase"}},[e("small",[t._v("To")])]),e("input",{staticClass:"end-date form-control",attrs:{type:"date",id:"toDate",name:"toDate","aria-describedby":"addon-wrapping"}})])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Deploy Accessory")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Add Accessory")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{attrs:{for:"acs_name"}},[e("b",[t._v("Accessory Name"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{attrs:{for:"location"}},[e("b",[t._v("Location"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{attrs:{for:"acs_manufacturer"}},[e("b",[t._v("Manufacturer"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{attrs:{for:"acs_category"}},[e("b",[t._v("Category"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("label",{attrs:{for:"quantity"}},[e("b",[t._v("Quantity"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("h6",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("Delete Accessory")]),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-auto"},[e("label",{attrs:{for:"asset_id"}},[e("b",[t._v("Accessory ID")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{"text-align":"center"}},[e("h6",{staticClass:"rtn-modal-title"},[t._v("Are you sure you want to delete this accessory?")])])}],o=(e("4de4"),e("caad"),e("2532"),e("ac1f"),e("841c"),e("4d63"),e("25f0"),e("5319"),e("5ea5")),i=e("ddc0"),c=e("2ef0"),l=e("bc3a"),n=e.n(l),d=e("8baf"),u=(e("0da4"),e("279c")),m=e.n(u),p={name:"accessory",data:function(){return{isSearching:!1,search:"",alertSuccess:null,alertError:null,UsersData:{user_id:null,acs_name:null,acs_category:null,acs_manufacturer:null,quantity:null,location:null},Accessory:[],Employees:[],Users:[],Category:[],filteredAccessory:[]}},components:{Topbar:i["a"],Sidebar:o["a"]},created:function(){var t=this;if(this.$session.exists("login-session")){var a=this.$session.get("login-session"),e=this.$session.get("login-session-enc");m.a.compare(a,e,(function(a,e){0==e&&t.$router.push({path:"/"})}))}else this.$router.push({path:"/"});this.getAllAssets(),this.getDropdownEmployee(),this.getDropdowns()},watch:{search:{handler:function(t){this.setAccessoriesDebounced(t)},immediate:!0}},methods:{getColor:function(t){return t<=5&&t>=1?"orange":0==t?"#EB6363":"rgba(255, 0, 0, 0.0)"},showModal:function(t){this.UsersData=t},showModalDelete:function(t){this.UsersData=t},showDeployModal:function(t){this.UsersData=t},cancelModal:function(){window.location.reload()},DeleteAccessory:function(){var t=this,a=new FormData;a.append("id",this.UsersData.acs_id),n.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAccessory",a).then((function(a){a.data.error?alert("ERR"):(t.alertSuccess=!0,setTimeout((function(){window.location.reload()}),1e3),t.getAllAccessories())}))},updateAccessory:function(){var t=this;if(this.UsersData.acs_name&&this.UsersData.acs_category&&this.UsersData.acs_manufacturer&&this.UsersData.quantity&&this.UsersData.location){var a=new FormData;a.append("acs_id",this.UsersData.acs_id),a.append("acs_name",this.UsersData.acs_name),a.append("acs_category",this.UsersData.acs_category),a.append("acs_manufacturer",this.UsersData.acs_manufacturer),a.append("quantity",this.UsersData.quantity),a.append("location",this.UsersData.location),n.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=updateAccessory",a).then((function(a){a.data.error?(alert("Error"),window.location.reload()):(t.alertError=!1,t.alertSuccess=!0,setTimeout((function(){window.location.reload()}),1e3))})).catch((function(t){console.log(t)}))}else this.alertError=!0},getAllAssets:function(){var t=this;n.a.get("http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessory").then((function(a){console.log(a.data.user_Data),t.Accessory=a.data.user_Data})).catch((function(t){console.log(t)}))},getDropdownEmployee:function(){var t=this;n.a.get("http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddEmployee").then((function(a){console.log(a.data.user_Data),t.Employees=a.data.user_Data})).catch((function(t){console.log(t)}))},DeleteAsset:function(t){var a=this,e=new FormData;this.UsersData=t,e.append("id",this.UsersData.acs_id),n.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=disableAccessory",e).then((function(t){t.data.error?alert("ERR"):(a.getAllAssets(),alert(t.data.message))}))},deployAccessory:function(){var t=this;if(this.UsersData.employee)if(0==this.UsersData.quantity)this.alertError=!0;else{var a=new FormData;a.append("acs_id",this.UsersData.acs_id),a.append("emp_id",this.UsersData.employee),n.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=deployAccessory",a).then((function(a){a.data.error?alert("Error"):(t.alertError=!1,t.alertSuccess=!0,setTimeout((function(){window.location.reload()}),1e3))})).catch((function(t){console.log(t)}))}else this.alertError=!0},Reset:function(){this.UsersData.acs_name="",this.UsersData.acs_category="",this.UsersData.acs_manufacturer="",this.UsersData.quantity="",this.UsersData.location=""},openAddForm:function(){this.Reset(),this.alertError=!1},AddAccessory:function(){var t=this;if(this.UsersData.acs_name&&this.UsersData.acs_category&&this.UsersData.acs_manufacturer&&this.UsersData.quantity&&this.UsersData.location){var a=new FormData;a.append("acs_name",this.UsersData.acs_name),a.append("acs_category",this.UsersData.acs_category),a.append("acs_manufacturer",this.UsersData.acs_manufacturer),a.append("quantity",this.UsersData.quantity),a.append("location",this.UsersData.location),n.a.post("http://localhost/motivit/motivit_ims/src/Api/api.php?action=addaccessory",a).then((function(a){a.data.error?alert(a.data.message):(t.alertError=!1,t.alertSuccess=!0,setTimeout((function(){window.location.reload()}),1e3))})).catch((function(t){console.log(t)}))}else this.alertError=!0},getDropdowns:function(){var t=this;n.a.get("http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddAccessoryCategory").then((function(a){console.log(a.data.user_Data),t.Category=a.data.user_Data})).catch((function(t){console.log(t)}))},goDeleted:function(){this.$router.push("/accessories/archived")},exportPDF:function(){var t=new d["default"]("l","mm","legal"),a=20;t.text(135,a+=15,"ALL ACCESSORY RECORD"),t.autoTable({html:"#tblAccessoryAll",startY:50,styles:{cellWidth:"wrap"},columnStyles:{1:{columnWidth:"auto"}},columns:[{header:"asset_id"},{header:"asset_tag"},{header:"serial_no"},{header:"category"},{header:"model"},{header:"status"},{header:"purhase_date"},{header:"supplier"},{header:"location"}]}),t.save("Report-Accessory_All.pdf")},setAccessoriesDebounced:Object(c["debounce"])((function(t){this.isSearching=!0,setTimeout(function(){this.isSearching=!1,this.filteredAccessory=this.Accessory.filter((function(a){return a.acs_id.toLowerCase().includes(t.toLowerCase())||a.acs_name.toLowerCase().includes(t.toLowerCase())||a.acs_category.toLowerCase().includes(t.toLowerCase())||a.acs_manufacturer.toLowerCase().includes(t.toLowerCase())||a.quantity.toLowerCase().includes(t.toLowerCase())||a.location.toLowerCase().includes(t.toLowerCase())}))}.bind(this),1e3)}),2e3),highlightMatches:function(t){var a=t.toLowerCase().includes(this.search.toLowerCase());if(!a)return t;var e=new RegExp(this.search,"ig");return t.replace(e,(function(t){return'<b style="background-color: yellow;">'.concat(t,"</b>")}))}}},v=p,_=(e("bd28"),e("2877")),h=e("6544"),y=e.n(h),f=e("cc20"),b=e("132d"),g=e("490a"),C=e("0fd9"),D=Object(_["a"])(v,s,r,!1,null,"5e07e0b3",null);a["default"]=D.exports;y()(D,{VChip:f["a"],VIcon:b["a"],VProgressCircular:g["a"],VRow:C["a"]})},"82a5":function(t,a,e){},bd28:function(t,a,e){"use strict";e("82a5")}}]);
//# sourceMappingURL=chunk-b1f218e2.096ee26e.js.map