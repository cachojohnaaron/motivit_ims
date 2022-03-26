<template>
<div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
        <h3 style="color:#028AD3"><strong>Reports </strong><span style="font-size:16px;"> all assets, licenses, and accessories</span></h3>
        <span>
            <v-text-field dense append-icon="mdi-magnify" outlined placeholder="Search" style="width:200px; display:inline-block;" />
        </span>
    </v-subheader>
    <hr style="margin-top:-5px;" />
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg" style="margin-bottom:20px;">
        <span>
            <div>Custom date range</div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">From</span>
                <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
            
                <span class="input-group-text" id="addon-wrapping">To</span>
                <input type="date" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
        </span>
        <span>
            <button type="button" class="btn btn-light btn-subheader-third">Export to PDF</button>&nbsp;
            <button type="button" class="btn btn-light btn-subheader-third">Export to Excel</button>
        </span>
    </v-subheader>




    
<!--
    <v-row>
        <v-col>
            <v-card style="padding-top:10px;">
                <a href="#" style="margin-left:15px; text-decoration:underline;">Submit Report</a> <br><br>

                <v-data-table :headers="headers" :items="recents" :items-per-page="5" class="elevation-1">
                    <template v-slot:item.action="">
                        <button>
                            <v-icon color="success" title="Edit Asset">mdi-pencil</v-icon>
                        </button>
                        <button>
                            <v-icon color="red" title="Delete Asset">mdi-delete</v-icon>
                        </button>
                    </template>

                </v-data-table>
            </v-card>
        </v-col>

    </v-row>
    -->
</div>
</template>

<script>
export default {
    name: 'assets',
    data() {
        return {
            headers: [
                {
                    text: 'Date Added',
                    value: 'date'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Product Code',
                    value: 'product_code'
                },
                {
                    text: 'Item',
                    value: 'item'
                },
                {
                    text: 'Assignee',
                    value: 'assignee'
                },
                {
                    text: 'Category',
                    value: 'category'
                }
            ],
            recents: [{
                    image: 'image_1',
                    date: 'MM-DD-YYYY',
                    status: 'status_1',
                    product_code: 'product_code_1',
                    item: 'item_1',
                    assignee: 'assignee_1',
                    category: 'category_1',
                },
                {
                    image: 'image_2',
                    date: 'MM-DD-YYYY',
                    status: 'status_2',
                    product_code: 'product_code_2',
                    item: 'item_2',
                    assignee: 'assignee_2',
                    category: 'category_2',
                },
                {
                    image: 'image_3',
                    date: 'MM-DD-YYYY',
                    status: 'status_3',
                    product_code: 'product_code_3',
                    item: 'item_3',
                    assignee: 'assignee_3',
                    category: 'category_3',
                },
            ],
        }
    },
}
</script>

<style scoped>
.btn-subheader-third {
    background-image: linear-gradient(to right, #028AD3, #19E1E5);
    color: white;
    padding: 2px 15px;
    border-radius: 0px;
    box-shadow: 0px 0px 4px #b9b9b9;
    border: none;
    width: 150px;
}

.dashboard {
    margin-top: -15px;
}
</style>
