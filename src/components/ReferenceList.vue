<template> 
    <div class="list row">
        <div class="col-md-5">
        <h3> Приложения для работы (ссылки) </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(reference, index) in references"
                :key="index"
                @click="setActiveReference(reference,index)">
                {{ reference.referenceName }}
                </li>
            </ul>
            </div>
        </div>
        </div>

        <div class="col-md-6">
            <div v-if="currentReference">
                <h3> Ссылка </h3>
                <br>
                <div>
                    <label><strong>Адрес:</strong></label> <a :href= "`${ currentReference.referenceAddress }`" target="_blank">{{ currentReference.referenceAddress }}</a>
                </div>
                <br>
                <div>
                    <label><strong>Описание:</strong></label> {{ currentReference.referenceOverview!=null?currentReference.referenceOverview:'' }}
                </div>

                <div v-if="showAdminBoard || showSuperAdminBoard">             
                <RouterLink :to="'/references/'+currentReference.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>
                <button @click="deleteReferences" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </div>

            </div>
            <div v-else>
                <br><br>
                <p>Выберите ссылку...</p>
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
            references:[],
            currentReference:null,
            currentIndex:-1,
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
            let isDeleteReference=confirm("Вы точно хотите удалить ссылку?\nОтменить действие будет нельзя!");
            if(isDeleteReference===true){
            ReferenceDataService.delete(this.currentReference.id).
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
            this.currentReference = null;
            this.currentIndex = -1
        },
        setActiveReference(reference,index){
            this.currentReference = reference;
            this.currentIndex = reference ? index : -1;
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
