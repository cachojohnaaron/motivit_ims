<template>
<div class="license dashboard">
    <Sidebar />
    <Topbar />
    <!-- Header Buttons -->
     
    <h6 class="page-header"><strong>Licenses </strong></h6>
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
                <button type="button" class="btn btn-light btn-subheader" @click="showExport()" data-toggle="modal" data-target="#exp-options" data-backdrop="static" data-keyboard="false">Export</button>
                <button type="button" class="btn btn-light btn-subheader-third" data-toggle="modal" data-target="#add-license">Create New</button>
            </span>
        </div>
    </v-row>
   

    <v-row>
    <!--Table for All Added Licenses-->
    <div id="tblUser" class="card" >
        <div class="table-responsive-sm">
            <div class="d-flex justify-content-end">
                <!-- Pagination and Rows -->
                
                <div class="row align-items-center pagination-buttons"> 
                    <label class="rows-per-page-label">Rows per page:</label>
                    <div class="d-grid" >
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
            <!-- Table List -->
            <table id="tblAllLicenses" class="table-sm table-hover" ref="table" :data="data">
                <thead>
                    <tr>
                        <th @click="sort('softID')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">License ID</th>
                        <th @click="sort('softName')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">License Name</th>
                        <th @click="sort('softCategory')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Category</th>
                        <th @click="sort('softKey')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Product Key</th>
                        <th @click="sort('softToName')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Licensed To Name</th>
                        <th @click="sort('softToEmail')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Licensed To Email</th>
                        <th @click="sort('softManufacturer')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Manufacturer</th>
                        <th @click="sort('softTotal')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Total</th>
                        <th @click="sort('softAvailable')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Available</th>
                        <th @click="sort('softDate')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Date of Purchase</th>
                        <th @click="sort('softExpired')" class="pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Sort">Expired On</th>
                        <th v-if="!isHidden">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in filteredLicenses" :key="data">
                        <tr v-for="data in sortedLicenses" :key="data">
                            <td v-html="highlightMatches(data.softID)">{{data.softID}}</td>
                            <td v-html="highlightMatches(data.softName)">{{data.softName}}</td>
                            <td v-html="highlightMatches(data.softCategory)">{{data.softCategory}}</td>
                            <td v-html="highlightMatches(data.softKey)">{{data.softKey}}</td>
                            <td v-html="highlightMatches(data.softToName)">{{data.softToName}}</td>
                            <td v-html="highlightMatches(data.softToEmail)">{{data.softToEmail}}</td>
                            <td v-html="highlightMatches(data.softManufacturer)">{{data.softManufacturer}}</td>
                            <td v-html="highlightMatches(data.softTotal)">{{data.softTotal}}</td>
                            <v-chip :color="getColor(data.softAvailable)" style="font-size:11px; height:20px; padding-left:1px; padding-right:1px; margin-top:5px;">
                                <td v-html="highlightMatches(data.softAvailable)">{{data.softAvailable}}</td>
                            </v-chip>
                            <td v-html="highlightMatches(data.softDate)">{{data.softDate}}</td>
                            <td v-html="highlightMatches(data.softExpired)">{{data.softExpired}}</td>
                            <td v-if="!isHidden">
                                <button class="btn-sm btn-action" @click="showModal(data)" modal-no-backdrop data-toggle="modal" data-target="#deploy-license" data-backdrop="static" data-keyboard="false">
                                    <v-icon color="warning" title="Deploy License" style="font-size:16px;">mdi-rocket-launch</v-icon>
                                </button>
                                <button class="btn-sm btn-action" @click="showModal(data)" modal-no-backdrop data-toggle="modal" data-target="#upd-license" data-backdrop="static" data-keyboard="false">
                                    <v-icon color="success" title="Edit License" style="font-size:16px;">mdi-pencil</v-icon>
                                </button>
                            </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </v-row>
    <!--End Table for All Deployed Licenses-->
    
    <!--Update License Modal -->
    <div class="modal fade modal-update-asset" id="upd-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Update License Information</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="updLicense" action="" method="POST">
                        <!-- Alert -->
                        <div v-if="updateSuccess" class="alert alert-success" role="alert">
                            <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>
                            <strong>Success!</strong> License record updated.
                        </div>
                        <div v-if="addError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                        </div>
                        <!-- Update Field Inputs  -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="softName"><b>License Name</b><span style="color: red;">*</span></label>
                                <input type="text" name="softName" class="form-control mb-3" id="softName" placeholder="License Name" v-model.lazy="License_Data.softName" />
                            </div>
                            <div class="form-group">
                                <label for="softCategory"><b>Category</b><span style="color: red;">*</span></label><br>
                                <select name="softCategory" id="softCategory" class="mb-3 custom-select form-control-sm" v-model.lazy="License_Data.softCategory" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value="undefined" disabled selected>--Select a Category--</option>
                                    <option v-for="cat in Category" :value="cat.category" :key="cat.id">
                                        {{cat.category}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="softKey"><b>Product Key</b><span style="color: red;">*</span></label>
                                <input type="text" name="softKey" class="form-control mb-3" id="softKey" placeholder="Product Key" v-model.lazy="License_Data.softKey" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="softToName"><b>Licensed To Name</b><span style="color: red;">*</span></label>
                                <input type="text" name="softToName" class="form-control mb-3" id="softToName" placeholder="Licensed To Name" v-model.lazy="License_Data.softToName" />
                            </div>
                            <div class="form-group">
                                <label for="softToEmail"><b>Licensed To Email</b><span style="color: red;">*</span></label>
                                <input type="email" name="softToEmail" class="form-control mb-3" id="softToEmail" placeholder="Licensed To Email" v-model.lazy="License_Data.softToEmail" />
                            </div>
                            <div class="form-group">
                                <label for="softManufacturer"><b>Manufacturer</b><span style="color: red;">*</span></label>
                                <input type="text" name="softManufacturer" class="form-control mb-3" id="softManufacturer" placeholder="Manufacturer" v-model.lazy="License_Data.softManufacturer" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group" style="width:100px;">
                                <label for="softTotal"><b>Total</b><span style="color: red;">*</span></label>
                                <input type="number" name="softTotal" class="form-control mb-3" id="softTotal" placeholder="Total" v-model.lazy="License_Data.softTotal" />
                            </div>
                            <div class="form-group" style="width:100px;">
                                <label for="softAvailable"><b>Available</b><span style="color: red;">*</span></label>
                                <input type="number" name="softAvailable" class="form-control mb-3" id="softAvailable" placeholder="Available" v-model.lazy="License_Data.softAvailable" />
                            </div>
                            <div class="form-group add-license-dates">
                                <label for="softDate"><b>Date of Purchase</b><span style="color: red;">*</span></label>
                                <input type="date" name="softDate" class="form-control mb-3" id="softDate" v-model.lazy="License_Data.softDate" />
                            </div>
                            <div class="form-group add-license-dates">
                                <label for="softExpired"><b>Expired On</b><span style="color: red;">*</span></label>
                                <input type="date" name="softExpired" class="form-control mb-3" id="softExpired" v-model.lazy="License_Data.softExpired" />
                            </div>
                        </div>

                        <hr>

                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary" block @click.self.prevent="updateLicense()">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End Update License Modal -->

    <!--Deploy License Modal-->
    <div class="modal fade modal-update-asset" id="deploy-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-size:13px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Deploy License</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="outLicense" action="" method="POST">
                        <!-- Alerts -->
                        <div v-if="deploySuccess" class="alert alert-success" role="alert">
                            <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>
                            <strong>Success!</strong> License deployed.
                        </div>
                        <div v-if="deployError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                        </div>
                        <div v-if="deployDuplicateError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            This license had been previously assigned to this employee.
                        </div>
                        <!-- Disabled Field Inputs (retrieved from license table)-->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="al_Name"><b>License Name</b></label>
                                <input type="text" :disabled='isDisabled' name="al_Name" class="form-control mb-3" id="al_Name" placeholder="License Name" v-model.lazy="License_Data.softName" />
                            </div>
                            <div class="form-group">
                                <label for="softCategory"><b>Category</b></label><br>
                                <select name="softCategory" id="softCategory" class="mb-3 custom-select form-control-sm" v-model.lazy="License_Data.softCategory" :disabled='isDisabled' style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value="undefined" disabled selected>--Select a Category--</option>
                                    <option v-for="cat in Category" :value="cat.category" :key="cat.category">
                                        {{cat.category}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="al_Key"><b>Product Key</b></label>
                                <input type="text" :disabled='isDisabled' name="al_Key" class="form-control mb-3" id="al_Key" placeholder="Product Key" v-model.lazy="License_Data.softKey" />
                            </div>
                        </div>
                        <!-- Deploy Field Inputs -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="al_date"><b>Deployed Date</b><span style="color: red;"> *</span></label>
                                <input type="text" name="al_date" class="form-control mb-3" id="al_date" onfocus="(this.type='datetime-local')" data-toggle="tooltip" title="Click To Change Date And Time" v-model.lazy="LicenseData.al_date" />
                            </div>
                            <div class="form-group">
                                <label for="al_emp"><b>Employee Name</b><span style="color: red;"> *</span></label>
                                <select name="al_emp" id="al_emp" class="mb-3 custom-select form-control-sm" v-model.lazy="LicenseData.al_emp" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value="undefined" disabled selected>--Select Employee--</option>
                                    <option v-for="emp in Employee" :value='emp.emp_id' :key="emp.emp_id">
                                        {{emp.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="al_location"><b>Location</b><span style="color: red;"> *</span></label><br>
                                 <div class="row">
                                    <div class="col-8">
                                        <select name="al_location" id="al_location" class="mb-3 custom-select form-control-sm" v-model.lazy="LicenseData.al_location" style="height:23px; padding-top:0; padding-bottom:0;">
                                            <option value="undefined" disabled selected>--Select a Location--</option>
                                            <option v-for="loc in Location" :value='loc.id' :key="loc.id">
                                                {{loc.location}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" v-show="btnNew" class="btn btn-info btn-new-category" @click="newLocation()" data-toggle="modal" data-target="#add-location">New</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-warning btn-sm" block @click.self.prevent="AssignLicense()">Deploy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End Deploy License Modal-->

    <!--Export Options Modal-->
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
                    <form name="exportOptions" action="" method="POST">
                        <!-- Export Date Range -->
                        <label>Custom Date Range:</label>
                        <div class="row align-items-center">
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">From</span>
                                    <input type="date" class="start-date form-control" id="fromDate" name="fromDate" aria-describedby="addon-wrapping">
                                </div>
                            </div>
                            <div class="d-grid col-6">
                                <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping" data-bs-toggle="tooltip" data-bs-placement="top" title="Date of Purchase">To</span>
                                    <input type="date" class="end-date form-control" id="toDate" name="toDate" aria-describedby="addon-wrapping">
                                </div>
                            </div>
                        </div>
                        <!-- Export Options (xlsx/jspdf) -->
                        <label class="mt-3">Export Options:</label>
                        <div class="row align-items-center ">
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" v-on:click.self.prevent="exportPDF('pdf')">PDF</button>
                            </div>
                            <div class="d-grid col-6">
                                <button class="btn btn-primary btn-block" @click.self.prevent="exportExcel('xlsx')">Excel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End Export Options Modal-->

    <!--Add New License Modal-->
    <div class="modal fade modal-update-asset" id="add-license" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add License</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="addLicense" action="" method="POST">
                        <!-- Alerts -->
                        <div v-if="addSuccess" class="alert alert-success" role="alert">
                            <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>
                            <strong>Success!</strong> License Added Successfully.
                        </div>
                        <div v-if="addError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span>
                        </div>
                        <div v-if="addDuplicateError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            This license already exist.
                        </div>
                        <!-- New License Field Inputs -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="softName"><b>License Name</b><span style="color: red;"> *</span></label>
                                <input type="text" name="softName" class="form-control mb-3" id="softName" placeholder="License Name" v-model.lazy="LicenseData.softName" />
                            </div>
                            <div class="form-group">
                                    <label for="softCategory"><b>Category</b><span style="color: red;"> *</span></label><br>
                                    <div class="row">
                                        <div class="col-8">
                                            <select name="softCategory" id="softCategory" class="mb-3 custom-select form-control-sm" v-model.lazy="LicenseData.softCategory" style="height:23px; padding-top:0; padding-bottom:0;">
                                                <option selected disabled value="undefined">--Select a Category--</option>
                                                <option v-for="cat in Category" :value="cat.category" :key="cat.id">
                                                    {{cat.category}}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <button type="button" v-show="btnNew" class="btn btn-info btn-new-category" @click="newCategory()" data-toggle="modal" data-target="#add-category">New</button>
                                        </div>
                                    </div>
                            </div>
                            <div class="form-group">
                                <label for="softKey"><b>Product Key</b><span style="color: red;"> *</span></label>
                                <input type="text" name="softKey" class="form-control mb-3" id="softKey" placeholder="Product Key" v-model.lazy="LicenseData.softKey" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="softToName"><b>Licensed To Name</b><span style="color: red;"> *</span></label>
                                <input type="text" name="softToName" class="form-control mb-3" id="softToName" placeholder="Licensed To Name" v-model.lazy="LicenseData.softToName" />
                            </div>
                            <div class="form-group">
                                <label for="softToEmail"><b>Licensed To Email</b><span style="color: red;"> *</span></label>
                                <input type="email" name="softToEmail" class="form-control mb-3" id="softToEmail" placeholder="Licensed To Email" v-model.lazy="LicenseData.softToEmail" />
                            </div>
                            <div class="form-group">
                                <label for="softManufacturer"><b>Manufacturer</b><span style="color: red;"> *</span></label>
                                <input type="text" name="softManufacturer" class="form-control mb-3" id="softManufacturer" placeholder="Manufacturer" v-model.lazy="LicenseData.softManufacturer" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group" style="width:100px;">
                                <label for="softTotal" ><b>Total</b><span style="color: red;"> *</span></label>
                                <input type="number" name="softTotal" class="form-control mb-3" id="softTotal" placeholder="Total" v-model.lazy="LicenseData.softTotal" />
                            </div>
                            <div class="form-group" style="width:100px;">
                                <label for="softAvailable"><b>Available</b><span style="color: red;"> *</span></label>
                                <input type="number" name="softAvailable" class="form-control mb-3" id="softAvailable" placeholder="Available" v-model.lazy="LicenseData.softAvailable" />
                            </div>
                            <div class="form-group add-license-dates">
                                <label for="softDate"><b>Date of Purchase</b><span style="color: red;"> *</span></label>
                                <input type="date" name="softDate" class="form-control mb-3" id="softDate" v-model.lazy="LicenseData.softDate" />
                            </div>
                            <div class="form-group add-license-dates">
                                <label for="softExpired"><b>Expired On</b><span style="color: red;"> *</span></label>
                                <input type="date" name="softExpired" class="form-control mb-3" id="softExpired" v-model.lazy="LicenseData.softExpired" />
                            </div>
                        </div>

                        <hr>
                        
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm" block @click.self.prevent="AddLicense()">Add License</button>
                        </div>   
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End New License Modal-->

    <!--Add New Location Modal (for deploy license modal)-->
    <div class="modal fade modal-update-asset" id="add-location" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-add-new" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add New Location</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="newLocation" action="" method="POST">
                        <!-- Alerts -->
                        <div v-if="locationSuccess" class="alert alert-success" role="alert">
                            <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>
                            <strong>Success!</strong> New location added.
                        </div>
                        <div v-if="locationError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Please fill up all of the required fields
                        </div>
                        <div v-if="locationDuplicateError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Location already exists.
                        </div>
                        <!-- Location Field Input -->
                        <div class="form-row"> 
                            <div class="form-group">
                                <label><b>Location</b></label>
                                <input type="text" name="softLocation" class="form-control mb-3" id="softLocation" placeholder="Enter Location" v-model.lazy="License_Data.softLocation"/>
                            </div>
                        </div>
                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm" block @click.self.prevent="AddLocation()">Add Location</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End New Location Modal-->

    <!--Add New Category Modal (for 'add new license' modal)-->
    <div class="modal fade modal-update-asset" id="add-category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog rtn-add-new" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add New Category</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="newCategory" action="" method="POST">
                        <div v-if="categorySuccess" class="alert alert-success" role="alert">
                            <v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon>
                            <strong>Success!</strong> New category added.
                        </div>
                        <div v-if="categoryError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            Please fill up all of the required fields
                        </div>
                        <div v-if="categoryDuplicateError" class="alert alert-danger" role="alert">
                            <v-icon color="red" size="15px">mdi-alert-circle</v-icon>
                            <strong>Error!</strong> Category already exist.
                        </div>
                        <!-- Category Field Input -->
                        <div class="form-row"> 
                            <div class="form-group">
                                <label><b>Category</b></label>
                                <input type="text" name="softCategory" class="form-control mb-3" id="softCategory" placeholder="Enter Category" v-model.lazy="LicenseData.softCategory"/>
                            </div>
                        </div>
                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm" block @click.self.prevent="AddCategory()">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End New Category Modal-->   
</div>
</template>

<script>
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import axios from "axios";
import { debounce } from "lodash";
import * as XLSX from 'xlsx' /*npm install xlsx*/
import jsPDF from "jspdf" /*npm install jspdf --save*/
import 'jspdf-autotable' /*npm install jspdf jspdf-autotable*/
export default {
    name: "license",
    data() {
        return {
            /*HideTableRow*/
            isActive: true,
            isHidden: false,
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
            //Filter Date
            startDate: null,
            endDate: null,
            fromDate: null,
            toDate: null,
            //Buttons
            btnAdd: true,
            btnNew: true,
            btnExport: true,
            //Alert
            updateSuccess: null,
            deploySuccess: null,
            deployError: null,
            deployDuplicateError: null,
            addSuccess:null,
            addError: null,
            addDuplicateError: null,
            locationSuccess: null,
            locationError: null,
            locationDuplicateError: null,
            categorySuccess: null,
            categoryError: null,
            categoryDuplicateError: null,
            License_Data: {
                softID: null,
                softName: null,
                softCategory: null,
                softKey: null,
                softToName: null,
                softToEmail: null,
                softManufacturer: null,
                softTotal: null,
                softAvailable: null,
                softDate: null,
                softExpired: null,
                softLocation: null,
            },
            LicenseData: {
                // al_Name: null,
                // al_Key: null,
                al_emp: null,
                al_location: null,
                al_date: this.currentDateTime(),
                softID: null,
                softName: null,
                softCategory: null,
                softKey: null,
                softToName: null,
                softToEmail: null,
                softManufacturer: null,
                softTotal: null,
                softAvailable: null,
                softDate: null,
                softExpired: null,
            },
            Category: [],
            Licenses: [],
            Location: [],
            Employee: [],
            Assign: [],
            filteredLicenses: [],
        };
    },
    
    components: { Topbar, Sidebar },
    created() {
        this.getLicenses();
        this.getCategory();
        this.getLocation();
        this.getEmployee();
        this.getAssign();
    },
    watch: {
        search: {
        handler(search) {
            this.setLicensesDebounced(search)
        },
        immediate: true,
        }
    },
    methods: {
        getColor(softAvailable) {
            if (softAvailable <= 5 && softAvailable >=1) return 'orange'
            else if (softAvailable == 0) return '#EB6363'
            else return 'rgba(255, 0, 0, 0.0)'
        },
        Reset() {
            this.License_Data.softName = "";
            this.License_Data.softCategory = "";
            this.License_Data.softKey = "";
            this.License_Data.softToName = "";
            this.License_Data.softToEmail = "";
            this.License_Data.softManufacturer = "";
            this.License_Data.softTotal = "";
            this.License_Data.softAvailable = "";
            this.License_Data.softDate = "";
            this.License_Data.softExpired = "";
        },
        AddReset() {
            this.LicenseData.softName = "";
            this.LicenseData.softCategory = "";
            this.LicenseData.softKey = "";
            this.LicenseData.softToName = "";
            this.LicenseData.softToEmail = "";
            this.LicenseData.softManufacturer = "";
            this.LicenseData.softTotal = "";
            this.LicenseData.softAvailable = "";
            this.LicenseData.softDate = "";
            this.LicenseData.softExpired = "";
        },
        currentDateTime() {
            const current = new Date();
            const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            const dateTime = date + ' ' + time;
            return dateTime;
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
                this.filteredLicenses = this.Licenses.filter(data =>
                data.softName.toLowerCase().includes(search.toLowerCase()) ||
                data.softCategory.toLowerCase().includes(search.toLowerCase()) ||
                data.softKey.toLowerCase().includes(search.toLowerCase()) ||
                data.softToName.toLowerCase().includes(search.toLowerCase()) ||
                data.softToEmail.toLowerCase().includes(search.toLowerCase()) ||
                data.softManufacturer.toLowerCase().includes(search.toLowerCase()) ||
                data.softDate.toLowerCase().includes(search.toLowerCase()) ||
                data.softExpired.toLowerCase().includes(search.toLowerCase())
                );
			}.bind(this),1000);
        }, 2000),
        /* Show Modals */
        resetAssign() {
            this.LicenseData.al_emp = "";
            this.LicenseData.al_location = "";
        },
        showModal(softID) {
            this.License_Data = softID;
            this.$bvModal.show('upd-licenses')
        },
        showExport() {
            this.$bvModal.show('exp-options')
        },
        checkOut(softID) {
            this.License_Data = softID;
            this.$bvModal.show('out-licenses')
        },
        cancelModal() {
            this.$bvModal.hide('upd-licenses')
            this.$bvModal.hide('out-licenses')
            this.$bvModal.hide('new-category')
        },
        /* End Show Modals */
        getLicenses() {
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo').then((res) => {
                console.log(res.data.license_Data);
                this.Licenses = res.data.license_Data;
                // this.ascSort = true;
                // this.pages=this.page-this.pageSize;
            }).catch((err) => {
                console.log(err);
            });
        },
        getEmployee() {
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getemployee').then((res) => {
                console.log(res.data.license_Employee);
                this.Employee = res.data.license_Employee;
            }).catch((err) => {
                console.log(err);
            });
        },
        getAssign(){
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getdeployedlicense').then((res) => {
                console.log(res.data.deployed_Data);
                this.Assign=res.data.deployed_Data;
            }) .catch((err) => {
                console.log(err);
        });
        },
        getCategory() {
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicensecat').then((res) => {
                console.log(res.data.license_Category);
                this.Category = res.data.license_Category;
            }).catch((err) => {
                console.log(err);
            });
        },
        getLocation() {
            axios.get('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseloc').then((res) => {
                console.log(res.data.license_Location);
                this.Location = res.data.license_Location;
            }).catch((err) => {
                console.log(err);
            });
        },
        AddLocation() {
            if (!this.License_Data.softLocation) {
                 this.locationError = true;
            }
            if (this.License_Data.softLocation) {
                let data = new FormData();
                data.append("softLocation", this.License_Data.softLocation);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=addlocation', data).then((res) => {
                    if (res.data.error) {
                        this.locationDuplicateError = true;
                        this.License_Data.softLocation = "";
                    } else {
                        this.locationSuccess = true;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                        this.getLocation();
                        this.License_Data.softLocation = "";
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } 
        },
        AddCategory() {
            if (!this.LicenseData.softCategory) {
                this.categoryError = true;
            }
            if (this.LicenseData.softCategory) {
                let data = new FormData();
                data.append("softCategory", this.LicenseData.softCategory);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=addcategory', data).then((res) => {
                    if (res.data.error) {
                        this.categoryDuplicateError = true;
                        this.LicenseData.softCategory = "";
                    } else {
                        this.categorySuccess = true;
                        this.getCategory();
                        this.LicenseData.softCategory = "";
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        AddLicense() {
            if (!this.LicenseData.softName || !this.LicenseData.softCategory || !this.LicenseData.softKey || !this.LicenseData.softToName || !this.LicenseData.softToEmail || !this.LicenseData.softManufacturer || !this.LicenseData.softTotal || !this.LicenseData.softAvailable || !this.LicenseData.softDate || !this.LicenseData.softExpired) {
                this.addError = true;
            }
            if (this.LicenseData.softName && this.LicenseData.softCategory && this.LicenseData.softKey && this.LicenseData.softToName && this.LicenseData.softToEmail && this.LicenseData.softManufacturer && this.LicenseData.softTotal && this.LicenseData.softAvailable && this.LicenseData.softDate && this.LicenseData.softExpired) {
                let data = new FormData();
                data.append("softName", this.LicenseData.softName);
                data.append("softCategory", this.LicenseData.softCategory);
                data.append("softKey", this.LicenseData.softKey);
                data.append("softToName", this.LicenseData.softToName);
                data.append("softToEmail", this.LicenseData.softToEmail);
                data.append("softManufacturer", this.LicenseData.softManufacturer);
                data.append("softTotal", this.LicenseData.softTotal);
                data.append("softAvailable", this.LicenseData.softAvailable);
                data.append("softDate", this.LicenseData.softDate);
                data.append("softExpired", this.LicenseData.softExpired);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=addlicense', data).then((res) => {
                    if (res.data.error) { 
                        this.addDuplicateError = true;
                        this.AddReset();
                    } else {
                        this.getLicenses();
                        this.getCategory();
                        this.AddReset();
                        this.addSuccess = true;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        updateLicense() {
            /* eslint-disable */
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!this.License_Data.softName || !this.License_Data.softCategory || !this.License_Data.softKey || !this.License_Data.softToName || !this.License_Data.softToEmail || !this.License_Data.softManufacturer || !this.License_Data.softTotal || !this.License_Data.softAvailable || !this.License_Data.softDate || !this.License_Data.softExpired) {
                this.addError = true;
            }
            else if (!this.License_Data.softToEmail.match(mailformat))
                        {
                            alert("Please input a valid email address!");
                        }
            else {
                let data = new FormData();
                data.append("softID", this.License_Data.softID);
                data.append("softName", this.License_Data.softName);
                data.append("softCategory", this.License_Data.softCategory);
                data.append("softKey", this.License_Data.softKey);
                data.append("softToName", this.License_Data.softToName);
                data.append("softToEmail", this.License_Data.softToEmail);
                data.append("softManufacturer", this.License_Data.softManufacturer);
                data.append("softTotal", this.License_Data.softTotal);
                data.append("softAvailable", this.License_Data.softAvailable);
                data.append("softDate", this.License_Data.softDate);
                data.append("softExpired", this.License_Data.softExpired);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=updatelicense', data).then((res) => {
                    if (res.data.error) {
                        alert("Error");
                    } else {
                        // this.cancelModal();
                        // this.successAlert = true;
                        // this.success = this.dismissSecs;
                        // location.reload();
                        this.updateSuccess = true;
                        this.addError = false;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        AssignLicense() {
            if (!this.LicenseData.al_emp || !this.LicenseData.al_location || !this.LicenseData.al_date) {
                this.deployError = true;
                this.deployDuplicateError = false;
            }
            if (this.LicenseData.al_emp && this.LicenseData.al_location && this.LicenseData.al_date) {
                let data = new FormData();
                data.append("softID", this.License_Data.softID);
                data.append("emp_id", this.LicenseData.al_emp);
                data.append("loc_id", this.LicenseData.al_location);
                data.append("al_date", this.LicenseData.al_date);

                axios.post('http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=addassign', data).then((res) => {
                    if (res.data.error) {
                        this.deployDuplicateError = true;
                        this.deployError = false;
                        this.resetAssign();
                    } else {
                        this.getAssign();
                        this.deploySuccess = true;
                        this.deployDuplicateError = false;
                        this.deployError = false;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        exportExcel(type, fn, dl) {
            var elt = document.getElementById('table');
            var wb = XLSX.utils.table_to_book(elt, {
                sheet: "all licenses",
                raw: true
            });
            return dl ?
                XLSX.write(wb, {
                    bookType: type,
                    bookSST: true,
                    type: 'base64'
                }) :
                XLSX.writeFile(wb, fn || ('Software-Licenses-Data.' + (type || 'xlsx')));
        },
        exportPDF() {
            // const doc = new jsPDF('l', 'mm', 'legal')

            // var y = 20;
            // doc.text(135, y = y + 15, "ALL LICENSE RECORDS"); /* x-align = 125 */
            // doc.autoTable({
            //     html: '#table',
            //     startY: 50,
            //     styles: {
            //         cellWidth: 'wrap'
            //     },
            //     columnStyles: {
            //         1: {
            //             columnWidth: 'auto'
            //         }
            //     },
            //     columns: [
            //         { header: 'License ID', dataKey: 'data.softID' },
            //         { header: 'License Name', dataKey: 'data.softName' },
            //         { header: 'Category', dataKey: 'data.softCategory' },
            //         { header: 'Product Key', dataKey: 'data.softKey' },
            //         { header: 'Licensed To Name', dataKey: 'data.softToName' },
            //         { header: 'Licensed To Email', dataKey: 'data.softToEmail}' },
            //         { header: 'Manufacturer', dataKey: 'data.softManufacturer' },
            //         { header: 'Total', dataKey: 'data.softTotal' },
            //         { header: 'Available', dataKey: 'data.softAvailable' },
            //         { header: 'Date of Purchase', dataKey: 'data.softDate' },
            //         { header: 'Expired On', dataKey: 'data.softExpired' }
            //     ],
            // });
            // doc.save('Software-Licenses-Data.pdf')

            /*Test Export PDF in Axios with Date Range*/
            // var dates = {
            //         fromDate: this.fromDate,
            //         toDate: this.toDate,
            // }

            // if (this.fromDate ==  this.License_Data.softDate && this.toDate ==  this.License_Data.softDate) {
            
            // axios.get(
            // 'http://localhost/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo', 
            // {responseType: 'blob'} // !!!
            // ).then((response) => {
            // // window.open(URL.createObjectURL(response.data));
            // })

            /*Test Export PDF in Axios*/
            
            axios.get("http://localhost/motivit/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo")
            .then(function(res){
            this.Licenses = res.data.license_Data;
              let columns = [
                  { title: 'License ID', dataKey: 'data.softID' },
                  { title: 'License Name', dataKey: 'data.softName' },
                  { title: 'Category', dataKey: 'data.softCategory' },
                  { title: 'Product Key', dataKey: 'data.softKey' },
                  { title: 'Licensed To Name', dataKey: 'data.softToName' },
                  { title: 'Licensed To Email', dataKey: 'data.softToEmail' },
                  { title: 'Manufacturer', dataKey: 'data.softManufacturer' },
                  { title: 'Total', dataKey: 'data.softTotal' },
                  { title: 'Available', dataKey: 'data.softAvailable' },
                  { title: 'Date of Purchase', dataKey: 'data.softDate' },
                  { title: 'Expired On', dataKey: 'data.softExpired' }
                  ];
              var doc = new jsPDF('p','pt');
              doc.autoTable(columns,res.data);
              doc.save("p.pdf");
            })
            // }
        },
        searchAll(){
            console.log("Searching..")
            // axios.get('http://localhost/motivit_ims/src/Api/genelyn.php?action=getlicenseinfo',{params:{search:this.search}}).then((res) => {
            //     console.log(res.data.license_Data);
            //     this.Licenses = res.data.license_Data;
            // }).catch((err) => {
            //     console.log(err);
            // });
        },
        /*Searh Highlight Filter*/
        highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.search.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.search, 'ig');
            return text.replace(re, matchedText => `<b style="background-color: yellow;">${matchedText}</b>`);
        }
    },
    computed: {
        isDisabled: function () {
            return !this.al_Name || !this.al_Key || !this.al_date;
        },
        numberOfPages () {
            return Math.ceil(this.Licenses.length / this.pages)
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
.btn-new-category{
    display:inline; 
    width:50px; 
    height:23px; 
    margin-left: -20px;
    color: white;
    font-size: 11px;
    padding-top:0px;
    padding-bottom: 0px;
}
.add-license-dates{
    width:120px !important;
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
hr{
    margin-top: -10px;
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