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
      <li class="nav-item">
        <RouterLink to="/devices" class="nav-link">Приборы</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/references" class="nav-link">Ссылки</RouterLink>
      </li>
      <li>
        <RouterLink to="/mail" class="nav-link">Почта</RouterLink>
      </li>
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"><font-awesome-icon icon="fa-solid fa-download" /> Exel</a>
        <ul class="dropdown-menu">
          <li>
            <Link @click="exelDownloadEmployees" class="dropdown-item exelpointer">Сотрудники</Link>
          </li>
          <li>
            <Link @click="exelDownloadCars" class="dropdown-item exelpointer">Автомобили</Link>
          </li>
          <li>
            <Link @click="exelDownloadSertificates" class="dropdown-item exelpointer">Удостоверения</Link>
          </li>
          <li>
            <Link @click="exelDownloadDevices" class="dropdown-item exelpointer">Приборы</Link>
          </li>
        </ul>
      </li>
      
      <li v-if="showAdminBoard || showSuperAdminBoard" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Добавить</a>
        <ul class="dropdown-menu">
          <li>
            <RouterLink to="/addEmployee" class="dropdown-item">Сотрудник</RouterLink>
          </li>
          <li>
            <RouterLink to="/addCar" class="dropdown-item">Автомобиль</RouterLink>
          </li>
          <li>
            <RouterLink to="/addDevice" class="dropdown-item">Прибор</RouterLink>
          </li>
          <li>
            <RouterLink to="/addReference" class="dropdown-item">Ссылка</RouterLink>
          </li>
        </ul>
      </li>    
      <li v-if="showAdminBoard || showSuperAdminBoard" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Редактировать</a>
        <ul class="dropdown-menu">
          <li v-if="showSuperAdminBoard">
            <RouterLink to="/users" class="dropdown-item">Пользователи (role_admin)</RouterLink>
          </li>
          <li>
            <RouterLink to="/positions" class="dropdown-item">Должности</RouterLink>
          </li>
          <li>
            <RouterLink to="/departments" class="dropdown-item">Подразделения</RouterLink>
          </li>
          <li>
            <RouterLink to="/divisions" class="dropdown-item">Отделы</RouterLink>
          </li>
          <li>
            <RouterLink to="/groupes" class="dropdown-item">Группы</RouterLink>
          </li>
          <li>
            <RouterLink to="/funcgroupes" class="dropdown-item">Функциональные группы</RouterLink>
          </li>
          <li>
            <RouterLink to="/carmodels" class="dropdown-item">Модели авто</RouterLink>
          </li>
          <li>
            <RouterLink to="/sertificatenames" class="dropdown-item">Типы удостоверений</RouterLink>
          </li>
          <li>
            <RouterLink to="/approvalgruppas" class="dropdown-item">Группы безопасности</RouterLink>
          </li>
          <li>
            <RouterLink to="/devicetypes" class="dropdown-item">Типы приборов</RouterLink>
          </li>
          <li>
            <RouterLink to="/devicenames" class="dropdown-item">Наименования приборов</RouterLink>
          </li>    
        </ul>
      </li>
    </ul>

    <div v-if="currentUser" class="navbar-nav ms-auto">
        <li v-if="showSuperAdminBoard" class="nav-item">
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
import EventBus from "./common/EventBus"

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
    },
    showSuperAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_SUPERADMIN');
      }
      return false;
    },
  },

    methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    exelDownloadEmployees(){
      window.location.href="http://10.232.3.49:8083/api/v1/exel/download/employees";
    },
    exelDownloadCars(){
      window.location.href="http://10.232.3.49:8083/api/v1/exel/download/cars";
    },
    exelDownloadSertificates(){
      window.location.href="http://10.232.3.49:8083/api/v1/exel/download/sertificates";
    },
    exelDownloadDevices(){
      window.location.href="http://10.232.3.49:8083/api/v1/exel/download/devices";
    }
  },

  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
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
.exitpointer,.exelpointer{
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