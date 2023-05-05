<template>
    <div class="list row">
        <h3> Список подразделений </h3>
        <p class="fw-bold fst-italic mb-3">Новое подразделение</p>        
        
        <div class="list-group list-group-horizontal list-group-flush"> 
        <div class="list-group-item noborder">
           <select class="form-select optwidth" id="newdivision" name="newdivision" v-model="newdivision" required>
             <option selected disabled value="" class="fst-italic">Отдел</option>
             <option v-for="(division, index) in divisions" :key="index" :value="division" class="noborder">
              {{ division.division }}
             </option>
            </select>
        </div>
        <div class="list-group-item noborder">
           <select class="form-select optwidth" id="newgroupe" name="newgroupe" v-model="newgroupe" required>
             <option selected disabled value="" class="fst-italic">Группа</option>
             <option :value="null">Нет</option>
             <option v-for="(groupe, index) in groupes" :key="index" :value="groupe">
              {{ groupe.groupe }}
             </option>
           </select>
        </div>
        <div class="list-group-item noborder">
           <select class="form-select optwidth" id="newfunctiongroup" name="newfunctiongroup" v-model="newfunctiongroup" required>
             <option selected disabled value="" class="fst-italic">Функциональная группа</option>
             <option :value="null">Нет</option>
             <option v-for="(funcgroupe, index) in funcgroupes" :key="index" :value="funcgroupe">
               {{ funcgroupe.functionGroup }}
             </option>
           </select>
        </div>
        <div class="list-group-item noborder">
        <button @click="createDepartment()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        </div>
        </div>

        <div class="col-md-12 outdiv shadow mt-3">
          <div class="col-md-12 indiv">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(department,index) in departments" :key="index">
            <ul class="list-group list-group-horizontal list-group-flush">
            <li class="list-group-item noborder">
                <select class="form-select noborder optwidth" id="division" name="division" v-model="department.division" required>
                 <option v-for="(division, index) in divisions" :key="index" :value="division">
                   {{ division.division }}
                 </option>
                </select>
            </li>
            <li class="list-group-item noborder">
                <select class="form-select noborder optwidth" id="groupe" name="groupe" v-model="department.groupe" required>
                  <option :value="null">Нет</option>
                  <option v-for="(groupe, index) in groupes" :key="index" :value="groupe">
                   {{ groupe.groupe }}
                  </option>
                </select>
            </li>
            <li class="list-group-item noborder">
                <select class="form-select noborder optwidth" id="functionGroup" name="functionGroup" v-model="department.functionGroup" required>
                  <option :value="null">Нет</option>
                  <option v-for="(funcgroupe, index) in funcgroupes" :key="index" :value="funcgroupe">
                   {{ funcgroupe.functionGroup }}
                 </option>
                </select>
            </li>
            <li class="list-group-item noborder">
                <button @click="editDepartment(department.id,department.division,department.groupe,department.functionGroup)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteDepartment(department.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
            </li>
            </ul>
            </li>
          </ul>
          </div>
        </div>
        
    </div>
</template>

<script>
import DepartmentsDataService from '../services/DepartmentsDataService'
import DivisionsDataService from '../services/DivisionsDataService'
import GroupesDataService from '../services/GroupesDataService'
import FunctionGroupsDataService from '../services/FunctionGroupsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "departments-list",
    data(){
        return{
            departments:[],
            divisions:[],
            groupes:[],
            funcgroupes:[],
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
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить подразделение, в котором есть сотрудники!?");}
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
        createDepartment() {
            var data= {
                division: this.newdivision,
                groupe: this.newgroupe,
                functionGroup: this.newfunctiongroup
            };
            DepartmentsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newdivision="",
                this.newgroupe="",
                this.newfunctiongroup=""
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
            this.retrieveDepartments()
        },
        retrieveDivisions(){
            DivisionsDataService.getAll().
            then(response=>{
                this.divisions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        retrieveGroupes(){
            GroupesDataService.getAll().
            then(response=>{
                this.groupes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        retrieveFunctionGroups(){
            FunctionGroupsDataService.getAll().
            then(response=>{
                this.funcgroupes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }
    },
    mounted(){
            this.retrieveDepartments();
            this.retrieveDivisions();
            this.retrieveGroupes();
            this.retrieveFunctionGroups()
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
.optwidth{
    width:300px
}
.noborder{
    border:0px
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
