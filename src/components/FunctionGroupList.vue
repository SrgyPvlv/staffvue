<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список функциональных групп (ФГ) </h3>
        <label for="newfuncgroupe" class="fw-bold fst-italic me-3">Новая ФГ</label>
        <input id="newfuncgroupe" name="newfuncgroupe" class="inputwidth" v-model="newfuncgroupe"/>
        <button @click="createFunctionGroup()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(funcgroupe, index) in funcgroupes" :key="index">
                <input id="funcgroupe" name="funcgroupe" class="inputwidth" v-model="funcgroupe.functionGroup"/>
                <button @click="editFunctionGroup(funcgroupe.id,funcgroupe.functionGroup)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteFunctionGroup(funcgroupe.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import FunctionGroupsDataService from '../services/FunctionGroupsDataService'

export default{
    name: "groupes-list",
    data(){
        return{
            funcgroupes:[],
            newfuncgroupe:""
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
        retrieveFunctionGroups(){
            FunctionGroupsDataService.getAll().
            then(response=>{
                this.funcgroupes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteFunctionGroup(id) {
            FunctionGroupsDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        editFunctionGroup(id,funcgroupe) {
            var data = {
                functionGroup: funcgroupe
            };
            FunctionGroupsDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        createFunctionGroup() {
            var data= {
                functionGroup: this.newfuncgroupe
            };
            FunctionGroupsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newfuncgroupe=""
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveFunctionGroups()
        }
    },
    mounted(){
            this.retrieveFunctionGroups();
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
