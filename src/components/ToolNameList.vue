<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список названий инструментов </h3>
        <label for="newtoolname" class="fw-bold fst-italic me-3">Новое название</label>
        <input id="newtoolname" name="newtoolname" class="newinputwidth" v-model="newtoolname"/>
        <button @click="createToolName()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(toolname, index) in toolnames" :key="index">
                <input id="toolname" name="toolname" class="inputwidth" v-model="toolname.toolName"/>
                <button @click="editToolName(toolname.id,toolname.toolName)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteToolName(toolname.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import ToolNamesDataService from '../services/ToolNamesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "toolnames-list",
    data(){
        return{
            toolnames:[],
            newtoolname:""
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
        retrieveToolNames(){
            ToolNamesDataService.getAll().
            then(response=>{
                this.toolnames=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteToolName(id) {
            ToolNamesDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить используемое имя инструмента!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editToolName(id,toolname) {
            var data = {
                toolName: toolname
            };
            ToolNamesDataService.update(id, data).
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
        createToolName() {
            var data= {
                toolName: this.newtoolname
            };
            ToolNamesDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newtoolname=""
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
            this.retrieveToolNames()
        }
    },
    mounted(){
            this.retrieveToolNames();
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
