<template>
    <div class="list row">
        <div class="col-md-12">
        <h3> Список подразделений </h3>
        <label for="newdivision" class="me-3">Новое подразделение</label>
        <input id="newdivision" name="newdivision" v-model="newdivision"/>
        <input id="newgroupe" name="newgroupe" v-model="newgroupe"/>
        <input id="newfunctiongroup" name="newfunctiongroup" v-model="newfunctiongroup"/>
        <button @click="createDepartment()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(department, index) in departments" :key="index">
                <input id="division" name="division" v-model="department.division.division"/>
                <input id="groupe" name="groupe" v-model="department.groupe.groupe"/>
                <input id="functionGroup" name="functionGroup" v-model="department.functionGroup.functionGroup"/>
                <button @click="editDepartment(department.division.division,department.groupe.groupe,department.functionGroup.functionGroup)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteDepartment(department.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DepartmentsDataService from '../services/DepartmentsDataService'

export default{
    name: "departments-list",
    data(){
        return{
            departments:[],
            newdivision:"",
            newgroupe:"",
            newfunctiongroup:""
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
        retrieveDepartments(){
            DepartmentsDataService.getAll().
            then(response=>{
                this.departments=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteDepartment(id) {
            DepartmentsDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        editDepartment(id,division,groupe,functionGroup) {
            var data = {
                division: division,
                groupe: groupe,
                functionGroup: functionGroup
            };
            DepartmentsDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
            console.log(e);});
        },
        createDepartment() {
            var data= {
                position: this.newposition
            };
            DepartmentsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newdivision="",
                this.newgroupe="",
                this.newfunctiongroup=""
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveDepartments()
        }
    },
    mounted(){
            this.retrieveDepartments();
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
