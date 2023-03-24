<template>
    <div class="list row">
        <div class="col-md-9">
        <h3> Список групп </h3>
        <label for="newgroupe" class="fw-bold fst-italic me-3">Новая группа</label>
        <input id="newgroupe" name="newgroupe" class="inputwidth" v-model="newgroupe"/>
        <button @click="createGroupe()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-9 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(groupe, index) in groupes" :key="index">
                <input id="groupe" name="groupe" class="inputwidth" v-model="groupe.groupe"/>
                <button @click="editGroupe(groupe.id,groupe.groupe)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteGroupe(groupe.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import GroupesDataService from '../services/GroupesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "groupes-list",
    data(){
        return{
            groupes:[],
            newgroupe:""
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
        retrieveGroupes(){
            GroupesDataService.getAll().
            then(response=>{
                this.groupes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteGroupe(id) {
            GroupesDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
             if (error.response && error.response.status === 404) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        editGroupe(id,groupe) {
            var data = {
                groupe: groupe
            };
            GroupesDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
             if (error.response && error.response.status === 404) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        createGroupe() {
            var data= {
                groupe: this.newgroupe
            };
            GroupesDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newgroupe=""
            },
            error => {
             if (error.response && error.response.status === 404) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveGroupes()
        }
    },
    mounted(){
            this.retrieveGroupes();
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
    width:500px
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
