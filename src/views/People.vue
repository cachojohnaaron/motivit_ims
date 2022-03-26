<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>People </strong><span style="font-size:16px;"> view employee's assets, licenses, and accessories</span></h3>
        <span>
            <button type="button" class="btn btn-light btn-subheader">Export</button>
            <button type="button" class="btn btn-light btn-subheader-third">Show Deleted</button>

        </span>
    </v-subheader>
    <hr style="margin-top:-5px;" />
    
    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <v-form style="margin-left:15px;">
                    <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        -select-
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Assets</a>
                        <a class="dropdown-item" href="#">Licenses</a>
                        <a class="dropdown-item" href="#">Accessories</a>
                    </div>
                </v-form>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button>
                            <v-icon color="success" title="Edit Employee">mdi-pencil</v-icon>
                        </button>
                        <button>
                            <v-icon color="red" title="Delete Employee">mdi-delete</v-icon>
                        </button>

                    </template>

                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

</div>
</template>

<script>
export default {
    name: 'assets',
    data() {
        return {
            headers: [{
                    text: 'Asset ID',
                    value: 'asset_id'
                },
                {
                    text: 'Asset Image',
                    value: 'asset_image'
                },
                {
                    text: 'Asset Tag',
                    value: 'asset_tag'
                },
                {
                    text: 'Serial No.',
                    value: 'serial_no'
                },
                {
                    text: 'model',
                    value: 'model'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Category',
                    value: 'category'
                },
                {
                    text: 'Purchase Date',
                    value: 'purchase_date'
                },
                {
                    text: 'Supplier',
                    value: 'supplier'
                },
                {
                    text: 'Location',
                    value: 'location'
                },
                {
                    text: 'Notes',
                    value: 'notes'
                },
                {
                    text: 'Actions',
                    value: 'action'
                },
            ],
            recents: [{
                    asset_id: '1',
                    asset_image: 'image_1',
                    asset_tag: 'asset_tag_1',
                    serial_no: 'serial_no_1',
                    model: 'model_1',
                    status: 'status_1',
                    category: 'category_1',
                    purchase_date: 'MM-DD-YYYY',
                    supplier: 'supplier_1',
                    location: 'location_1',
                    notes: "notes_1",
                    assignee: 'employee_1',
                },
                {
                    asset_id: '2',
                    asset_image: 'image_2',
                    asset_tag: 'asset_tag_2',
                    serial_no: 'serial_no_2',
                    model: 'model_2',
                    status: 'status_2',
                    category: 'category_2',
                    purchase_date: 'MM-DD-YYYY',
                    supplier: 'supplier_2',
                    location: 'location_2',
                    notes: "notes_2",
                    assignee: 'employee_2',
                },
                {
                    asset_id: '3',
                    asset_image: 'image_3',
                    asset_tag: 'asset_tag_3',
                    serial_no: 'serial_no_3',
                    model: 'model_3',
                    status: 'status_3',
                    category: 'category_3',
                    purchase_date: 'MM-DD-YYYY',
                    supplier: 'supplier_3',
                    location: 'location_3',
                    notes: "notes_3",
                    assignee: 'employee_3',
                },
            ],
        }
    },
}
</script>

<style scoped>
.btn-subheader {
    background: #028AD3;
    color: white;
    padding: 2px 15px;
    border-radius: 0px;
    margin-right: 10px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.btn-subheader-third {
    background-image: linear-gradient(to right, #028AD3, #19E1E5);
    color: white;
    padding: 2px 15px;
    border-radius: 0px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
}

.dashboard {
    margin-top: -20px;
}

.form-people input {
    width: 200px;
    border: 1px solid black;
    margin-left: 20px;
}

.form-people span {
    margin-left: 20px;
}

.card-people {
    padding: 10px;
}
</style>
