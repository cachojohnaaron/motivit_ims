<template>
<v-navigation-drawer style="background:#204173;" v-model="drawer" app>

    <!--
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Bootstrap Slider</h3>

            <ul class="lisst-unstyled components">
                <p>The Providers</p>
                <li class="">
                    <a href="#" data-toggle="collapse" aria-expanded="false">Dashboard</a>
                </li>
                <li class="">
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Licenses</a>
                    <ul class="collapse lisst-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">List All</a>
                        </li>
                        <li>
                            <a href="#">All Deployed</a>
                        </li>
                        <li>
                            <a href="#">All Ready to Deploy</a>
                        </li>
                        <li>
                            <a href="#">All Archived</a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Accessories</a>
                    <ul class="collapse lisst-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">List All</a>
                        </li>
                        <li>
                            <a href="#">All Deployed</a>
                        </li>
                        <li>
                            <a href="#">All Ready to Deploy</a>
                        </li>
                        <li>
                            <a href="#">All Archived</a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">People</a>
                    <ul class="collapse lisst-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">Employees</a>
                        </li>
                        <li>
                            <a href="#">Admin</a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Reports</a>
                    <ul class="collapse lisst-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">List All</a>
                        </li>
                        <li>
                            <a href="#">All Deployed</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    -->

    <div class="text-center">
        <!--
            
            <div class="mb-4">
                <v-img src="../assets/logo1.png" height="50px"/>
            </div>
            -->
        <h2 class="white--text">LOGO</h2>
        <h2 class="white--text">IMS</h2>
    </div>

    <v-divider></v-divider>

    <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
            <v-list-item-icon>
                <v-icon style="color:White;">{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <a href="/dashboard" style="text-decoration:none; color:white;">
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </a>
            </v-list-item-content>
        </v-list-item>

        <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action > 
            <template v-slot:activator >
                <v-list-item-icon>
                    <v-icon style="color:White;">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title style="color:White;">{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title">
                <!--
                <v-list-tile-action>
                    <v-icon style="color:White; margin-left:50px; font-size:16px;">{{ subItem.action }}</v-icon>
                </v-list-tile-action>
                -->
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title style="margin-left: 75px; color:white;">{{ subItem.title }}</v-list-tile-title><br>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-tile>
        </v-list-group>
    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    name: "Sidebar",
    props: ["drawer"],
    data() {
        return {
            links: [
                ["mdi-view-dashboard", "Dashboard"],
            ],
            items: [{
                    //action: 'restaurant',
                    icon: "mdi-text-box-multiple",
                    title: 'Assets',
                    ref: '/assets',
                    active: false,
                    items: [{
                            title: 'List All',

                        },
                        {
                            title: 'All Deployed'
                        },
                        {
                            title: 'All Ready to Deploy'
                        },
                        {
                            title: 'All Archived'
                        }
                    ]
                },
                {
                    icon: "mdi-content-save",
                    title: 'Licenses',
                    active: false,
                    items: [{
                            title: 'List All'
                        },
                        {
                            title: 'All Deployed'
                        },
                        {
                            title: 'All Ready to Deploy'
                        },
                        {
                            title: 'All Archived'
                        }
                    ]
                },
                {
                    icon: "mdi-keyboard",
                    title: 'Accessories',
                    active: false,
                    items: [{
                            title: 'List All'
                        },
                        {
                            title: 'All Deployed'
                        },
                        {
                            title: 'All Ready to Deploy'
                        },
                        {
                            title: 'All Archived'
                        }
                    ]
                },
                {
                    icon: "mdi-account-multiple",
                    title: 'Users',
                    active: false,
                    items: [{
                            title: 'Employees'
                        },
                        {
                            title: 'Admin'
                        }
                    ]
                },
                {
                    icon: "mdi-chart-bar",
                    title: 'Reports',
                    active: false,
                    items: [{
                            title: 'List All'
                        },
                        {
                            title: 'All Deployed'
                        }
                    ]
                },
            ]

        };
    },
};
</script>

<style scoped></style>
<!-- 

export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-view-dashboard", "Dashboard"],
       // ["mdi-account", "Admin"],
        ["mdi-text-box-multiple", "Assets"],
        ["mdi-chart-bar", "Reports"],
        //["mdi-cog", "Settings"],
      ],
    };
  },
};

-->
