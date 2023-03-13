<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список должностей </h3>
        <label for="newposition" class="fw-bold fst-italic me-3">Новая должность</label>
        <input id="newposition" name="newposition" class="newinputwidth" v-model="newposition"/>
        <button @click="createPosition()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(position, index) in positions" :key="index">
                <input id="position" name="position" class="inputwidth" v-model="position.position"/>
                <button @click="editPosition(position.id,position.position)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deletePosition(position.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import PositionsDataService from '../services/PositionsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "positions-list",
    data(){
        return{
            positions:[],
            newposition:""
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
        retrievePositions(){
            PositionsDataService.getAll().
            then(response=>{
                this.positions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deletePosition(id) {
            PositionsDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
             if (error.response && error.response.status === 403) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        editPosition(id,position) {
            var data = {
                position: position
            };
            PositionsDataService.update(id, data).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
             if (error.response && error.response.status === 403) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        createPosition() {
            var data= {
                position: this.newposition
            };
            PositionsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newposition=""
            },
            error => {
             if (error.response && error.response.status === 403) {
             EventBus.dispatch("logout");}
            })
            .catch(e => {
            console.log(e);});
        },
        refreshList(){
            this.retrievePositions()
        }
    },
    mounted(){
            this.retrievePositions();
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
