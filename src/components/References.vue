<template>
    
    <div class="list row">
        <div class="col-md-8">
        <h3> Приложения для работы (ссылки) </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(reference, index) in references"
                :key="index"
                @click="setActiveDevice(reference,index)">
                {{ reference.referenceName }} {{ reference.referenceAddress }} {{ reference.referenceOverview }}
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import ReferenceDataService from '../services/ReferenceDataService'
import EventBus from "../common/EventBus"

export default{
    name: "devices-list",
    data(){
        return{
            references:[]
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
        }
  },
    methods:{
        retrieveReferences(){
            ReferenceDataService.getAll().
            then(response=>{
                this.references=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteReferences() {
            let isDeleteDevice=confirm("Вы точно хотите удалить прибор?\nОтменить действие будет нельзя!");
            if(isDeleteDevice===true){
            ReferenceDataService.delete(this.currentDevice.id).
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
            this.retrieveReferences();
            this.currentDevice = null;
            this.currentIndex = -1
        },
        setActiveDevice(device,index){
            this.currentDevice = device;
            this.currentIndex = device ? index : -1;
        }, 
        findByNumberTypeNameEmployeeCommentPlace(){
            DeviceDataService.findByNumberTypeNameEmployeeCommentPlace(this.filter).
            then(response=>{
                this.devices=response.data;
                this.currentDevice = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveReferences();
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
