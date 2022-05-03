<template>
    <div></div>
</template>

<script>


export default {
    created() {
        this.$session.remove('login-session');
        this.$session.remove('login-session-enc');
        this.$router.push('/');
    }
}
</script>
