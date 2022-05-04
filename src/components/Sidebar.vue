<template>
<v-navigation-drawer dark style="background: #1A4684;" v-bind:width="210" :mini-variant.sync="mini" permanent expand-on-hover app>
    <v-list-item class="px-1">
        
        <div style="width:50px; height:75px; ">
        <img src=""  style=" width:40px; margin-top:10px; margin-left:4px;"/>
        
        </div>
       <span style="font-size:12px; margin-left:10px; "><strong>MOTIVIT INVENTORY MANAGEMENT SYSTEM</strong></span>
        <!--
        <v-list-item-title style="text-align:center;"><strong>IMS</strong></v-list-item-title>
        -->
        <!--
        <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        -->
    </v-list-item>

    <v-divider style="margin-bottom:-5px; margin-top:0px;"></v-divider>

    <v-list dense style="margin-top:20px;">
        <template v-for="(n, i) in nav">

            <v-list-item v-if="n.to" :key="`${i}-a`" :to="n.to" link class="menu-item" v-model="n.active" >
                <v-list-item-icon>
                    <v-icon size="20px">{{ n.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="menu-title">
                    <v-list-item-title>{{ n.label }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-group v-if="n.subItems" :key="`${i}-b`" class="menu-item" v-model="n.active">
                <template v-slot:activator >
                    <v-list-item-icon>
                        <v-icon class="pr-n3" size="20px">{{ n.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="menu-title">
                        <v-list-item-title>{{ n.label }}</v-list-item-title>
                    </v-list-item-content>
                </template>
                <v-list-item v-for="(s, y) in n.subItems" :key="y" :to="s.to" link class="pl-8">
                    <v-list-item-icon>
                        <v-icon size="15px">{{ s.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="submenu-title">
                        <v-list-item-title>{{ s.label }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </template>
    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            
            nav: [
                {
                    to: '/dashboard',
                    label: 'Dashboard',
                    icon: 'mdi-home',
                    active:false,
                },
                {
                    to: '',
                    label: 'Assets',
                    icon: 'mdi-chart-pie',
                    active: false,
                    subItems: [
                        {
                            to: '/assets/all',
                            label: 'All Assets',
                            icon: 'mdi-arrow-right-bottom',
                            active: false,
                        },
                        {
                            to: '/assets/deployed',
                            label: 'Deployed Assets',
                            icon: 'mdi-arrow-right-bottom',
                            active: false,
                        },
                        {
                            to: '/assets/RTD',
                            label: 'Ready to Deploy Assets',
                            icon: 'mdi-arrow-right-bottom',
                            active: false,
                        },
                        {
                            to: '/assets/archived',
                            label: 'Archived Assets',
                            icon: 'mdi-arrow-right-bottom',
                            active: false,
                        },
                    ]
                },
                {
                    
                    label: 'Licenses',
                    icon: 'mdi-content-save',
                    active: false,
                    subItems: [
                        {
                            to: '/licenses/all',
                            label: 'All Licenses',
                            icon: 'mdi-arrow-right-bottom',

                        },
                        {
                            to: '/licenses/deployed',
                            label: 'Deployed Licenses',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/licenses/returned',
                            label: 'Returned Licenses',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/licenses/Archived',
                            label: 'Archived Licenses',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        
                    ]
                },
                {
                    label: 'Accessories',
                    icon: 'mdi-keyboard',
                    active: false,
                    subItems: [
                        {
                            to: '/accessories/all',
                            label: 'All Accessories',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/accessories/deployed',
                            label: 'Deployed Accessories',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/accessories/archived',
                            label: 'Archived Accessories',
                            icon: 'mdi-arrow-right-bottom',
                        },
                    ]
                },
                {
                    label: 'Users',
                    icon: 'mdi-account-multiple',
                    active: false,
                    subItems: [
                        {
                            to: '/manage-admins',
                            label: 'Admin',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/users/employees',
                            label: 'Employees',
                            icon: 'mdi-arrow-right-bottom',
                        },
                    ]
                },
                {
                    label: 'Reports',
                    icon: 'mdi-chart-bar',
                    active: false,
                    subItems: [
                        {
                            to: '/reports/assets',
                            label: 'Assets',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/reports/licenses',
                            label: 'Licenses',
                            icon: 'mdi-arrow-right-bottom',
                        },
                        {
                            to: '/reports/accessories',
                            label: 'Accessories',
                            icon: 'mdi-arrow-right-bottom',
                        },
                    ]
                },
            ],
            mainSidebarDrawer: true,
            mini: true,
        }
    },
    
};
</script>

<style scoped>
.v-list-item{
    text-decoration: none;
}

.v-icon,
.v-list-group .v-list-item .v-icon{
    text-decoration: none;
    background: -webkit-linear-gradient(#97dbff, #cbfbfc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
}
.menu-title{
    margin-left:-20px;
}
.submenu-title{
    margin-left:-30px;
}






</style>
