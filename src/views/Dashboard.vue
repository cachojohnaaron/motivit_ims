<template>
<div class="dashboard">
    <Sidebar />
    <Topbar  />
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h6 class="page-header-dashboard"><strong>Dashboard</strong></h6>

        <span class="page-buttons-dashboard">
           <!-- <v-text-field dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px; display:inline-block;" />-->&nbsp;
            <div class="dropdown">
                <button class="dropbtn btn btn-light btn-subheader-third">Create New</button>
                <div class="dropdown-content">
                    <a href="#" data-toggle="modal" data-target="#add-asset" @click="Reset()" data-backdrop="static" data-keyboard="false">Asset</a>
                    <a href="#" data-toggle="modal" data-target="#add-license" @click="Reset()" data-backdrop="static" data-keyboard="false">License</a>
                    <a href="#" data-toggle="modal" data-target="#add-accessory" @click="Reset()" data-backdrop="static" data-keyboard="false">Accessory</a>
                    <a href="#" data-toggle="modal" data-target="#add-employee" @click="Reset()" data-backdrop="static" data-keyboard="false">Employee</a>
                </div>
            </div>
        </span>
    </v-subheader>
    <v-row style="margin-top:-20px;">
          
                <v-col lg="3" cols="12">
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Assets</div>
                                <span class="card-amount">{{Assets.length}}</span>
                            </div>
                            <v-icon style="color:#6bc4ff48; font-size:80px; margin-left:20px; margin-bottom:-20px; ">mdi-text-box-multiple</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="3" cols="12">
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Licenses</div>
                                <span class="card-amount">{{Licenses.length}}</span>
                            </div>
                            <v-icon style="color:#6bc4ff48; font-size:80px; margin-left:20px; margin-bottom:-20px; ">mdi-content-save</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="3" cols="12">
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Accessories</div>
                                <span class="card-amount">{{Accessories.length}}</span>
                            </div>
                            <v-icon style="color:#6bc4ff48; font-size:80px; margin-left:20px; margin-bottom:-20px; ">mdi-keyboard</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col lg="3" cols="12">
                    <v-card elevation="">
                        <v-card-text class="d-flex justify-space-between align-center cards-db">
                            <div>
                                <div class="card-title">Total Employees</div>
                                <span class="card-amount">{{Users.length}}</span>
                            </div>
                            <v-icon style="color:#6bc4ff48; font-size:80px; margin-left:20px; margin-bottom:-20px; ">mdi-account-group-outline</v-icon>
                        </v-card-text>
                    </v-card>
                </v-col>

            
  
        <!--
        <v-col cols="12" lg="5">
            <v-card>
                <v-card-title style="color:#028AD3;">Deployed Assets</v-card-title> 
                <div id="piechart">
                </div>
            </v-card>
        </v-col>
        -->
        <!-- Table for Recent Return and Deployment Transactions -->
    
        <v-col>
            <v-card style="padding-top:10px;">
                <span style="margin-left: 15px; color:#0D1B38;"><strong> Recent Deployment and Returns </strong></span>
                <v-tabs v-model="tab" class="d-flex flex-row-reverse" style="margin-top:-30px;">
                    <v-tabs-slider color="#0D1B38" ></v-tabs-slider>
                    <v-tab height="50px" href="#assets" style="font-size:11px; text-decoration:none;">Assets</v-tab>
                    <v-tab href="#licenses" style="font-size:11px; text-decoration:none;">Licenses</v-tab>
                    <v-tab href="#accessories" style="font-size:11px; text-decoration:none;">Accessories</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item :key="1" value="assets">
                        <v-card flat>
                            <v-card-text>
                                <!-- Assets Table -->
                                    <div class="table-responsive">
                                        <table id="assets" class="table-sm table-striped table-hover" ref="assets">
                                        <thead class="">
                                            <tr>
                                                <th>Employee</th>
                                                <th>Transaction Type</th>
                                                <th>Asset Tag</th>
                                                <th>Serial Number</th>
                                                <th>Model</th>
                                                <th>Transaction Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="asset in AssetsTransactions" :key="asset">
                                                <td>{{ asset.name }}</td>
                                                <td>{{ asset.transaction_type }}</td>
                                                <td>{{ asset.asset_tag }}</td>
                                                <td>{{ asset.serialno }}</td>                
                                                <td>{{ asset.model }}</td>
                                                <td>{{ asset.transaction_date }}</td>
                                                
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                <!-- End of Assets Table -->
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :key="2" value="licenses">
                        <v-card flat>
                            <v-card-text>
                                <!-- License Table -->
                                    <div class="table-responsive">
                                        <table id="license" class="table-sm table-striped table-hover" ref="license">
                                        <thead>
                                            <tr>
                                                <th>License ID<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>License Name<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Category<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Product Key<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Licensed To Name<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Licensed To Email<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Manufacturer<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Date of Purchase<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                                <th>Expired On<span v-html="sortArrow" style="cursor:pointer;"></span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- <tr v-for="data in filteredLicenses" :key="data">
                                                <td>{{data.softID}}</td>
                                                <td>{{data.softName}}</td>
                                                <td>{{data.softCategory}}</td>
                                                <td>{{data.softKey}}</td>
                                                <td>{{data.softToName}}</td>
                                                <td>{{data.softToEmail}}</td>
                                                <td>{{data.softManufacturer}}</td>
                                                <td>{{data.softTotal}}</td>
                                                <td>{{data.softAvailable}}</td>
                                                <td>{{data.softDate}}</td>
                                                <td>{{data.softExpired}}</td>
                                            </tr> -->
                                        </tbody>
                                        </table>
                                    </div>
                                <!-- End of License Table -->
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item :key="3" value="accessories">
                        <v-card flat>
                            <v-card-text>
                                <!-- Accessories Table -->
                                    <div class="table-responsive">
                                        <table id="accessories" class="table-sm table-striped table-hover" ref="accessories">
                                        <thead class="">
                                            <tr>
                                                <th>Employee</th>
                                                <th>Transaction Type</th>
                                                <th>Category</th>
                                                <th>Accessory Name</th>
                                                <th>Manufacturer</th>
                                                <th>Transaction Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="acs in AccessoriesTransactions" :key="acs"> 
                                                <td>{{ acs.name }}</td>
                                                <td>{{ acs.transaction_type }}</td>
                                                <td>{{ acs.acs_category }}</td>
                                                <td>{{ acs.acs_name }}</td>
                                                <td>{{ acs.acs_manufacturer }}</td>
                                                <td>{{ acs.transaction_date }}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                <!-- End of Accessories Table -->
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
        </v-card>
        </v-col>
    
    </v-row>
 
    <!-- eslint-disable -->
    <!-- prettier-ignore -->
    <!-- Modal For Create New Asset-->
    <div class="modal fade modal-update-asset" id="add-asset" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Asset</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New asset record added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    
            <div class="form-row">
                <div class="form-group">
                    <label for="asset_tag"><b>Asset Tag<span style="color: red;"> *</span></b></label>
                    <input type="text" name="asset_tag" class="form-control" id="asset_tag" placeholder="" v-model.lazy="UsersData.asset_tag" />
                </div>

                <div class="form-group">
                    <label for="serialno"><b>Serial Number<span style="color: red;"> *</span></b></label>
                    <input type="number" name="serialno" class="form-control" id="serialno" placeholder="" v-model.lazy="UsersData.serialno" />
                </div>

                <div class="form-group">
                    <label for="model"><b>Model<span style="color: red;"> *</span></b></label>
                    <input type="text" name="model" class="form-control" id="model" placeholder="" v-model.lazy="UsersData.model" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="category"><b>Category<span style="color: red;"> *</span></b></label>
                    <select name="category" id="category" class="form-control" v-model.lazy="UsersData.category" style="height:23px; padding-top:0; padding-bottom:0;">
                        <option value='0'> -- Select Category -- </option>
                        <option v-for='data in AccessoryCategory' :value='data.choice'>{{ data.choice }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="supplier"><b>Supplier<span style="color: red;"> *</span></b></label>
                    <input type="text" name="supplier" class="form-control" id="supplier" placeholder="" v-model.lazy="UsersData.supplier" />
                </div>
                <div class="form-group">
                    <label for="asset_location"><b>Asset Location<span style="color: red;"> *</span></b></label>
                    <input type="text" name="asset_location" class="form-control" id="asset_location" placeholder="" v-model.lazy="UsersData.asset_location" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="purchase_date"><b>Purchase Date<span style="color: red;"> *</span></b></label>
                    <input type="date" name="purchase_date" class="form-control" id="purchase_date" placeholder="" v-model.lazy="UsersData.purchase_date" />
                </div>
                <div class="form-group">
                    <label for="notes"><b>Notes</b></label>
                    <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                </div>
                
            </div>

               <hr>
            <div class="modal-bottom">
                <button class="mb-3 btn btn-secondary" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                <button v-show="btnAdd" class=" ms-2 mb-3 btn btn-primary"  @click.prevent="AddAsset()">Add Asset</button>
            </div>

        </form>
                </div>

            </div>
        </div>
    </div>

     <!-- Add Accessory Modal -->
    <div class="modal fade modal-update-asset" id="add-accessory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Accessory</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New accessory record added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    
                    <form action="" method="POST" id="myForm">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="acs_name"><b>Accessory Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="acs_name" class="form-control" id="acs_name" placeholder="" v-model.lazy="UsersData.acs_name" />
                            </div>
                            <div class="form-group">
                                <label for="location"><b>Location<span style="color: red;"> *</span></b></label>
                                <input type="text" name="location" class="form-control" id="location" placeholder="" v-model.lazy="UsersData.location" />
                            </div>
                            <div class="form-group">
                                <label for="acs_manufacturer"><b>Manufacturer<span style="color: red;"> *</span></b></label>
                                <input type="text" name="acs_manufacturer" class="form-control" id="acs_manufacturer" placeholder="" v-model.lazy="UsersData.acs_manufacturer" />
                            </div>
                        </div>
                            
                        <div class="form-row">
                            <div class="form-group">
                                <label for="acs_category"><b>Category<span style="color: red;"> *</span></b></label>
                                <select name="acs_category" id="acs_category" class="form-control" v-model.lazy="UsersData.acs_category" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Category -- </option>
                                    <option v-for='data in AccessoryCategory' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                            <div class="form-group" style="width:100px;">
                                <label for="quantity"><b>Quantity<span style="color: red;"> *</span></b></label>
                                <input type="number" name="quantity" class="form-control" id="quantity" placeholder="" v-model.lazy="UsersData.quantity" />
                            </div>
                        </div>

                
                        <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm"  block @click.prevent="AddAccessory()">Add Accessory</button>
                        </div>
                </form>
            </div>
        </div>
    </div>
    </div>

     <!-- Add Employee Modal -->
    <div class="modal fade modal-update-asset" id="add-employee" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" >
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Add Employee</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="alertSuccess" class="alert alert-success" role="alert"><v-icon color="success" size="15px">mdi-checkbox-marked-circle</v-icon> &nbsp;<strong>Success!</strong>&nbsp;New employee record added.</div>
                    <div v-if="alertError" class="alert alert-danger" role="alert"><v-icon color="red" size="15px">mdi-alert-circle</v-icon>&nbsp;Please fill up all of the required fields<span style="color: red;"> &nbsp;*</span></div>
                    
                    <form action="" method="POST" id="myForm">
              
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name"><b>Employee Name<span style="color: red;"> *</span></b></label>
                                <input type="text" name="name" class="form-control" id="name" placeholder="" v-model.lazy="UsersData.name" />
                            </div>

                            <div class="form-group">
                                <label for="email"><b>Email<span style="color: red;"> *</span></b></label>
                                <input type="email" name="email" class="form-control" id="email" placeholder="" v-model.lazy="UsersData.email" />
                            </div>

                            <div class="form-group">
                                <label for="department"><b>Department<span style="color: red;"> *</span></b></label>
                                <select name="department" id="department" class="form-control" v-model.lazy="UsersData.department" style="height:23px; padding-top:0; padding-bottom:0;">
                                    <option value='0'> -- Select Department -- </option>
                                    <option v-for='data in Departments' :value='data.choice'>{{ data.choice }}</option>
                                </select>
                            </div>
                            
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="notes"><b>Notes</b></label>
                                <textarea name="notes" class="form-control" id="notes" placeholder="" v-model.lazy="UsersData.notes" />
                            </div>
                        </div>    
                            <hr>
                        <div class="modal-bottom">
                            <button class="mb-3 btn btn-secondary btn-sm" block @click="cancelModal()" data-dismiss="modal">Cancel</button>
                            <button class="ms-2 mb-3 btn btn-primary btn-sm"  block @click.prevent="AddEmployee()">Add Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add New License Modal-->
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

    <!-- Add New Category Modal (for 'add new license' modal)-->
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

    

    

</div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import bcrypt from 'bcryptjs';
export default {
    name: "Dashboard",
    data() {
        
        return {
            tab: "assets",
            drawer: null,
            btnAdd: true,
            btnNew: true,
            alertSuccess: null,
            alertError: null,
            addSuccess:null,
            addError: null,
            addDuplicateError: null,
            categorySuccess: null,
            categoryError: null,
            categoryDuplicateError: null,
            UsersData: {
                user_id: null,
                name: null,
                department: null,
                email: null,
                asset_tag: null,
                serialno: null,
                model: null,
                status: null,
                category: null,
                purchase_date: null,
                supplier: null,
                notes: null,   
            },
            LicenseData: {
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
            Accessory: [],
            Employees: [],
            Users: [],
            Assets: [],
            Accessories: [],
            assetRTD: [],
            assetDeployed: [],
            Licenses: [],
            Category: [],
            Departments: [],
            Status: [],

            //Table recent transactions
            AssetsTransactions: [],
            AccessoriesTransactions: [],
        }
    },
    components: { Topbar, Sidebar },

    created() {

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


        this.getAllAssetTransactions();
        this.getAllAccessoryTransactions();

        this.getAllEmployee();
        this.getAllAssets();
        this.getAllAccessory();
        this.getAllAssetRTD();
        this.getAllAssetDeployed();
        this.getAllLicenses();

        this.getDropdownCat();
        this.getDropdownStatus();
        this.getDropdowns();
        this.getCategory();
    },
    methods: {
        onButtonClick(item) {
            console.log('click on ' + item.no)
        },
        
        getAllEmployee() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallemployee"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Users = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssets() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallasset"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Assets = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAccessory() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallaccessory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Accessories = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllLicenses() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getalllicenses"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Licenses = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssetRTD() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetRTD"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.assetRTD = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAssetDeployed() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=getallassetDeployed"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.assetDeployed = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        AddAsset() {
        if (!this.UsersData.asset_tag || !this.UsersData.serialno || !this.UsersData.model || !this.UsersData.category || !this.UsersData.purchase_date || !this.UsersData.supplier || !this.UsersData.asset_location) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("asset_tag", this.UsersData.asset_tag);
            data.append("serialno", this.UsersData.serialno);
            data.append("model", this.UsersData.model);
            //data.append("status", this.UsersData.status);
            data.append("category", this.UsersData.category);
            data.append("purchase_date", this.UsersData.purchase_date);
            data.append("supplier", this.UsersData.supplier);
            data.append("notes", this.UsersData.notes);
            data.append("asset_location", this.UsersData.asset_location);
            axios
                .post(
                    "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addasset",
                    data
                )
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message);
                    } else {
                        this.alertError = false;
                        this.alertSuccess = true;
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
        getDropdownCat() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddAccessoryCategory"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AccessoryCategory = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getDropdownStatus() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddStatus"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.Status = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        AddAccessory() {
        if (!this.UsersData.acs_name || !this.UsersData.acs_category || !this.UsersData.acs_manufacturer || !this.UsersData.quantity || !this.UsersData.location ) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("acs_name", this.UsersData.acs_name);
            data.append("acs_category", this.UsersData.acs_category);
            data.append("acs_manufacturer", this.UsersData.acs_manufacturer);
            data.append("quantity", this.UsersData.quantity);
            data.append("location", this.UsersData.location);
            axios
                .post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addaccessory",
                data
                )
                .then((res) => {
                if (res.data.error) {
                    alert(res.data.message);
                } else {
                    this.alertError = false;
                    this.alertSuccess = true;
                    setTimeout(function() {
                        window.location.reload()
                    }, 1000);
                }
                })
                .catch((err) => {
                console.log(err);
                });
            }
        },
        AddEmployee() {
        if (!this.UsersData.name || !this.UsersData.department || !this.UsersData.email ) {
            this.alertError = true;
        }
        else {
            let data = new FormData();
            data.append("name", this.UsersData.name);
            data.append("department", this.UsersData.department);
            data.append("email", this.UsersData.email);
            data.append("notes", this.UsersData.notes);
            axios
                .post(
                "http://localhost/motivit/motivit_ims/src/Api/api.php?action=addemployee",
                data
                )
                .then((res) => {
                if (res.data.error) {
                    alert(res.data.message);
                } else {
                    this.alertError = false;
                    this.alertSuccess = true;
                    setTimeout(function() {
                        window.location.reload()
                    }, 1000);
                }
                })
                .catch((err) => {
                console.log(err);
                });
            }
        },
        getDropdowns() {
        axios
            .get(
            "http://localhost/motivit/motivit_ims/src/Api/dropdown.php?action=ddDepartment"
            )
            .then((res) => {
            console.log(res.data.user_Data);
            this.Departments = res.data.user_Data;
            })
            .catch((err) => {
            console.log(err);
            });
        },
        Reset() {
            this.UsersData.asset_tag = "";
            this.UsersData.serialno = "";
            this.UsersData.model = "";
            this.UsersData.category = "";
            this.UsersData.purchase_date = "";
            this.UsersData.supplier = "";
            this.UsersData.notes = "";
            this.UsersData.asset_location = "";
        },
        openAddForm() {
            this.Reset();
            this.alertError = false;
        },
        cancelModal() {
            this.$bvModal.hide('upd-licenses')
            this.$bvModal.hide('out-licenses')
            this.$bvModal.hide('new-category')
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
        //table recent
        getAllAssetTransactions() {
            axios
                .get(
                    "http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=getAllAssetTransactions"
                )
                .then((res) => {
                    console.log(res.data.user_Data);
                    this.AssetsTransactions = res.data.user_Data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAllAccessoryTransactions() {
            axios
                .get(
                "http://localhost/motivit/motivit_ims/src/Api/reports-api.php?action=getAllAccessoryTransactions"
                )
                .then((res) => {
                console.log(res.data.user_Data);
                this.AccessoriesTransactions = res.data.user_Data;
                })
                .catch((err) => {
                console.log(err);
                });
        },
    },
}


</script>

<style scoped>
.overlap-icon {
    position: absolute;
    top: -33px;
    text-align: center;
    padding-top: 12px;
}

.dashboard {
    margin-top: -15px;
}

.cards-db {
    background-image: linear-gradient(to right, #1A4684, #008DEA);
    padding: 20px 30px 20px 20px;
    height:100px;
}

.card-title {
    color: white;
    font-size: 12px;
}

.card-amount {
    font-size: 25px;
    font-family: arial black;
    margin-top: 50px;
    color: white;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    font-size: 12px;
}

.dropdown-content a {
    color: black;
    padding: 5px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
}


.add-license-dates{
    width:120px !important;
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


textarea {
    height: 50px !important;
    width: 310px !important;
    resize: none;
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


</style>
