<template>
<v-app-bar app elevate-on-scroll elevation="3" height="40px;" color="#0D1B38">
    <v-spacer />

    <v-menu offset-y>
        <v-list three-line width="250">
            <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.title">
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
    <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
            <span style="cursor: pointer" v-bind="attrs" v-on="on">
                <v-chip link style="height:25px; width:fit-content;">
                    <!--
            <v-badge dot bottom color="green" offset-y="10" offset-x="10">
              
              <v-avatar size="40">
                <v-img src="https://randomuser.me/api/portraits/women/81.jpg" />
              </v-avatar>
            
            </v-badge>
            -->
                    <span class="" style="font-size:12px;">Hi, Admin</span>
                </v-chip>
            </span>
        </template>
        <v-list width="150" class="py-0" dense>
            <v-list-item>

                <v-list-item-content>
                    <v-list-item-title style="font-size:12px;"><strong>Admin</strong></v-list-item-title>
                    <v-list-item-subtitle style="font-size:11px;">Logged In</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <hr>
            <v-list-item link v-for="(menu, i) in menus" :key="i" :to="menu.to" style="text-decoration:none;">
                <v-list-item-icon style="margin-right:5px;">
                    <v-icon size="20px">{{ menu.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title style="font-size:11px;">
                    {{ menu.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</v-app-bar>
</template>

<script>
export default {
    name: "Topbar",
    data() {
        return {
            menus: [{
                    title: "Profile",
                    icon: "mdi-account",
                    to: '/admin-profile'
                },
                {
                    title: "Manage Admins",
                    icon: "mdi-account-group",
                    to: '/manage-admins'
                },
                {
                    title: "Logout",
                    icon: "mdi-logout",
                    to: '/logout'
                    
                },
            ],

        };
    },
};
</script>

<style scoped>
hr {
    margin-top: -3px;
    margin-bottom: -3px;
}
</style>
