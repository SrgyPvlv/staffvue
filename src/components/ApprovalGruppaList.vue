<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список групп безопасности </h3>
        <label for="newapprovalgruppa" class="fw-bold fst-italic me-3">Новый тип</label>
        <input id="newapprovalgruppa" name="newapprovalgruppa" class="newinputwidth" v-model="newapprovalgruppa"/>
        <button @click="createApprovalGruppa()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(approvalgruppa, index) in approvalgruppas" :key="index">
                <input id="approvalgruppa" name="approvalgruppa" class="inputwidth" v-model="approvalgruppa.approvalGruppa"/>
                <button @click="editApprovalGruppa(approvalgruppa.id,approvalgruppa.approvalGruppa)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteApprovalGruppa(approvalgruppa.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import ApprovalGruppasDataService from '../services/ApprovalGruppasDataService'
import EventBus from "../common/EventBus"

export default{
    name: "approvalgruppas-list",
    data(){
        return{
            approvalgruppas:[],
            newapprovalgruppa:""
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
        retrieveApprovalGruppas(){
            ApprovalGruppasDataService.getAll().
            then(response=>{
                this.approvalgruppas=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteApprovalGruppa(id) {
            ApprovalGruppasDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить используемую группу безопасности!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editApprovalGruppa(id,approvalgruppa) {
            var data = {
                approvalGruppa: approvalgruppa
            };
            ApprovalGruppasDataService.update(id, data).
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
        createApprovalGruppa() {
            var data= {
                approvalGruppa: this.newapprovalgruppa
            };
            ApprovalGruppasDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newapprovalgruppa=""
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
            this.retrieveApprovalGruppas()
        }
    },
    mounted(){
            this.retrieveApprovalGruppas();
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