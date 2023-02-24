<template>
    <div class="container">
      <header class="jumbotron">
        <p>
          <strong>Пользователь: </strong>{{currentUser.username}}
        </p>
      </header>
      <strong>Уровень доступа:</strong>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>