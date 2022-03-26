<template>
<div class="card">
    <div class="card-body">
        <h2> Login Account</h2>
        <hr>
         <v-text-field
            label="Email"
            placeholder="Email"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Password"
            outlined
            dense
          ></v-text-field>
          <button type="button" class="btn btn-light btn-login">Create New</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'login',
}
</script>

<style scoped>
.card{
    width: 400px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.card h2{
    color: #028AD3;
}
.btn-login{
    background-image: linear-gradient(to right, #028AD3 , #19E1E5);
    color:white;
    padding: 2px 15px;
    border-radius: 0px;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 35px;
}
</style>
