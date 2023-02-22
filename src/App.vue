<template>
<div id="app">
  <nav class="navbar navbar-expand bg-primary navbar-dark p-2 sticky-top">
    <img src="./components/icons/logooerp.jpg" alt="Логотип" style="width:40px;" class="rounded-pill"> <span class="oerplogo"> ОЭРП</span>
    <ul class="navbar-nav">
      <li class="nav-item">
        <RouterLink to="/employees" class="nav-link">Cотрудники</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/cars" class="nav-link">Автомобили</RouterLink>
      </li>
      <li v-if="showAdminBoard" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Добавить</a>
        <ul class="dropdown-menu">
          <li>
            <RouterLink to="/addEmployee" class="dropdown-item">Сотрудник</RouterLink>
          </li>
          <li>
            <RouterLink to="/addCar" class="dropdown-item">Автомобиль</RouterLink>
          </li>
        </ul>
      </li>
    </ul>

    <div v-if="currentUser" class="navbar-nav ms-auto">
        <li v-if="currentUser" class="nav-item">
          <RouterLink to="/register" class="nav-link"><font-awesome-icon icon="user-plus" /> Новый пользователь</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/profile" class="nav-link"><font-awesome-icon icon="user" /> {{ currentUser.username }}</RouterLink>
        </li>
        <li v-if="currentUser" class="nav-item">
          <a class="nav-link exitpointer" @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" /> Выйти</a>
        </li>
    </div>
    <div v-if="!currentUser" class="navbar-nav ms-auto">
      <li  class="nav-item">
          <RouterLink to="/login" class="nav-link"><font-awesome-icon icon="sign-in-alt" /> Войти</RouterLink>
      </li>
    </div>
  </nav>

  <div class="container ms-5 mt-3 mb-5">
    <RouterView />
  </div>
  
  <div class="text-center p-1 text-light fixed-bottom footer">
    © SrgyPvlv <a href="mailto:spavlov@mts.ru?subject=Вопрос по Приложению: Сотрудники." class="ms-2 text-light text-decoration-none"> &#128386 </a>
  </div>
</div>
</template>

<script>
export default{
  name:"app",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    }
  },

    methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
};
</script>

<style>
.oerplogo{
  margin-left:5px;
  margin-right:10px
}
.footer{
  background: #778899;
}
.exitpointer{
  cursor:pointer;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: red; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>