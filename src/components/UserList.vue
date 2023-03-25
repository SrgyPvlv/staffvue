<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список пользователей (admin) </h3>
        <p v-if="submitted" class="text-success">Данные успешно обновлены!</p>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(user, index) in users" :key="index">
                <input class="inputwidth mt-1" v-model="user.username" required/>
                <input type="password" class="inputwidth mt-1" v-model="user.password" required/>
                <select class="form-select inputwidth mt-1" v-model="user.role" required>
                  <option v-for="(role,index) in roles" :key="index" :value="role">{{role.name}}</option>
                </select>
                <button @click="editUser(user.id,user.username,user.password,user.role)" class="badge rounded-pill bg-success mt-2 border-0 delete">Сохранить</button>
                <button @click="deleteUser(user.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService'
import RolesDataService from '../services/RolesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "users-list",
    data(){
        return{
            users:[],
            roles:[],
            submitted:false
        };
    },
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
    methods:{
        retrieveUsers(){
            UsersDataService.getAll().
            then(response=>{
                this.users=response.data;
                console.log(response.data);
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nНе удалось загрузить список пользователей!");}
            })
            .catch(e=>{console.log(e)});
        },
        deleteUser(id) {
            UsersDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nНе получилось удалить пользователя!");}
            })
            .catch(e => {
            console.log(e);});
        },
        editUser(id,name,password,role) {
            var data = {
                username: name,
                password: password,
                role: role
            };
            UsersDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.submitted = true
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 501) {
                    alert("Ошибка! Что-то пошло не так!");}
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveUsers();
            this.submitted = false
        },
        retrieveRoles(){
            RolesDataService.getAll().
            then(response=>{
                this.roles=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          }
    },
    mounted(){
            this.retrieveUsers();
            this.retrieveRoles();
        }
};
</script>

<style>
.edit{
    margin-top: 10px;
    text-decoration: none
}
.delete{
    text-decoration: none
}
.car{
    cursor: pointer
}
.outdiv{
    overflow-y: auto;
    overflow-x: hidden;
    height: 700px;
    position: relative;
}
.indiv{
    position: absolute   
}
.inputwidth{
    width:350px
}
.newinputwidth{
    width:300px
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey; 
  border-radius: 7px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #C0C0C0; 
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>
