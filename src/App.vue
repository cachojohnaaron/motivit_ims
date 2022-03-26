<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    <Topbar @drawerEvent="drawer = !drawer" />
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
export default {
  name: "App",
  components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script>

<style>
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

.modal-dialog {
    max-width: 700px;
}

.form-group,
.form-control,
.btn {
    font-size: 13px;
}

.form-control {
    height: 30px;
}

.form-group {
    width: 200px;
    margin-left: 10px;
}

.form-group label {
    margin-bottom: -1px;
}


.modal-title {
    color: #028AD3;
}
</style>