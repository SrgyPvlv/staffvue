<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список пользователей (admin) </h3>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(user, index) in users" :key="index">
                <input id="name" name="name" class="inputwidth" v-model="user.username"/>
                <input id="password" name="password" class="inputwidth" v-model="user.password"/>
                <input id="role" name="role" class="inputwidth" v-model="user.role.name"/>
                <button @click="editUser(user.id,user.username,user.password)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
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

export default{
    name: "users-list",
    data(){
        return{
            users:[]
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
            })
            .catch(e=>{console.log(e)});
        },
        deleteUser(id) {
            UsersDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        editUser(id,name,password) {
            var data = {
                username: name,
                password: password
            };
            UsersDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveUsers()
        }
    },
    mounted(){
            this.retrieveUsers();
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
