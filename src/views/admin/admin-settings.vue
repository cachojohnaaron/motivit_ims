<template>

    <div>
        
    <Sidebar :drawer="drawer"/>
    <Topbar @drawerEvent="drawer = !drawer" />
        <h1>Settings</h1>
        <h4>...</h4>
    </div>
</template>

<script>


import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default{
    name:"admin-settings",
    data(){
        return{};
    },
    
    components: { Topbar, Sidebar },
}


</script>
