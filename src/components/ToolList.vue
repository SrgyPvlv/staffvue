<template>
    <div class="list row">
        <div class="col-md-7">
            <form @submit.prevent="findByNumberTypeNameEmployeeCommentPlace">
            <div class="input-group mb-3"> 
                <input type="text" class="form-control" placeholder="Поиск по номеру,типу,наименованию,сотруднику,комментарию" v-model="filter" />
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-secondary" @click="findByNumberTypeNameEmployeeCommentPlace">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <div class="list row">
        <div class="col-md-6">
        <h3> Список инструментов </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(tool, index) in tools"
                :key="index"
                @click="setActiveTool(tool,index)">
                {{ tool.toolType.toolTypeName }} {{ tool.toolName.toolName }} s/n: {{ tool.toolNumber }}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-6">
            <div v-if="currentTool">
                <h3> Инструмент </h3>
                <div>
                    <label><strong>Тип:</strong></label> {{ currentTool.toolType.toolTypeName }}
                </div>
                <div>
                    <label><strong>Наименование:</strong></label> {{ currentTool.toolName.toolName }}
                </div>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentTool.toolNumber }}
                </div>
                <div>
                    <label><strong>Владелец:</strong></label> {{ currentTool.employee.name }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentTool.toolComment }}
                </div>
                <div>
                    <label><strong>Номер бухучета:</strong></label> {{ currentTool.toolAccounting }}
                </div>
                <div>
                    <label><strong>Место хранения:</strong></label> {{ currentTool.storePlace }}
                </div>

                <div v-if="showAdminBoard || showSuperAdminBoard || showTesterBoard">             
                <RouterLink :to="'/tools/'+currentTool.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>
                <button @click="deleteTool" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите инструмент...</p>
            </div>
        </div>

    </div>
</template>

<script>
import ToolDataService from '../services/ToolDataService'
import EventBus from "../common/EventBus"

export default{
    name: "tools-list",
    data(){
        return{
            tools:[],
            currentTool:null,
            currentIndex:-1,
            filter:""
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
    },
    showSuperAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_SUPERADMIN');
        }
            return false;
        },
        showTesterBoard() {
            if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_TESTER');
        }
            return false;
        }    
  },
    methods:{
        retrieveTools(){
            ToolDataService.getAll().
            then(response=>{
                this.tools=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteTool() {
            let isDeleteTool=confirm("Вы точно хотите удалить инструмент?\nОтменить действие будет нельзя!");
            if(isDeleteTool===true){
                ToolDataService.delete(this.currentTool.id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!");}
            })
            .catch(e => {
            console.log(e);});}
        },
        refreshList(){
            this.retrievetools();
            this.currentTool = null;
            this.currentIndex = -1;
            this.filter=""
        },
        setActiveTool(tool,index){
            this.currentTool = tool;
            this.currentIndex = tool ? index : -1;
        }, 
        findByNumberTypeNameEmployeeCommentPlace(){
            ToolDataService.findByNumberTypeNameEmployeeCommentPlace(this.filter).
            then(response=>{
                this.tools=response.data;
                this.currentTool = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveTools();
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
