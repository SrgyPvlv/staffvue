<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список отделов </h3>
        <label for="newdivision" class="fw-bold fst-italic me-3">Новый отдел</label>
        <input id="newdivision" name="newdivision" class="inputwidth" v-model="newdivision"/>
        <button @click="createDivision()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(division, index) in divisions" :key="index">
                <input id="division" name="division" class="inputwidth" v-model="division.division"/>
                <button @click="editDivision(division.id,division.division)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteDivision(division.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DivisionsDataService from '../services/DivisionsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "divisions-list",
    data(){
        return{
            divisions:[],
            newdivision:""
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
        retrieveDivisions(){
            DivisionsDataService.getAll().
            then(response=>{
                this.divisions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteDivision(id) {
            DivisionsDataService.delete(id).
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
        editDivision(id,division) {
            var data = {
                division: division
            };
            DivisionsDataService.update(id, data).
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
        createDivision() {
            var data= {
                division: this.newdivision
            };
            DivisionsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newdivision=""
            },
            error => {
             if (error.response && error.response.status === 404) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrieveDivisions()
        }
    },
    mounted(){
            this.retrieveDivisions();
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
