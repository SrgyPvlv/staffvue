<template>
    <div class="list row">
        <div class="col-md-7">
            <form @submit.prevent="findByNumberEmployeeRoom">
            <div class="input-group mb-3"> 
                <input type="text" class="form-control" placeholder="Поиск по номеру, сотруднику, помещению" v-model="filter" />
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-secondary" @click="findByNumberEmployeeRoom">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-success" @click="retrieveFreeWardrobes">Свободные</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <div class="list row">
        <div class="col-md-6">
        <h3> Список шкафчиков </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(wardrobe, index) in wardrobes"
                :key="index"
                @click="setActiveWardrobe(wardrobe,index)">
                № {{ wardrobe.number }} / {{ wardrobe.employee!=null? wardrobe.employee.name.split(' ')[0] :""}}
                 {{ wardrobe.employee!=null? wardrobe.employee.name.split(' ')[1] :""}}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-6">
            <div v-if="currentWardrobe">
                <h3> Шкафчик </h3>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentWardrobe.number }}
                </div>
                <div>
                    <label><strong>Помещение:</strong></label> {{ currentWardrobe.room }}
                </div>
                <div>
                    <label><strong>Владелец:</strong></label> {{ currentWardrobe.employee!=null ? currentWardrobe.employee.name : ""}}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentWardrobe.comment }}
                </div>
                <div>
                    <label><strong>Использование:</strong></label>
                    <span :class="{'text-danger fw-bold':currentWardrobe.free==false}"> {{currentWardrobe.free==true? ' свободен': ' занят' }} </span>
                </div>

                <div v-if="showAdminBoard || showSuperAdminBoard || showToolerBoard">             
                <RouterLink :to="'/wardrobes/'+currentWardrobe.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>
                <button @click="deleteWardrobe" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите шкафчик...</p>
            </div>
        </div>

    </div>
</template>

<script>
import WardrobesDataService from '../services/WardrobesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "wardrobes-list",
    data(){
        return{
            wardrobes:[],
            currentWardrobe:null,
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
        }
  },
    methods:{
        retrieveWardrobes(){
            WardrobesDataService.getAll().
            then(response=>{
                this.wardrobes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        retrieveFreeWardrobes(){
            WardrobesDataService.getAll().
            then(response=>{
                this.wardrobes=response.data.filter(w => w.free==true);
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteWardrobe() {
            let isDeleteWardrobe=confirm("Вы точно хотите удалить шкафчик?\nОтменить действие будет нельзя!");
            if(isDeleteWardrobe===true){
                WardrobesDataService.delete(this.currentWardrobe.id).
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
            this.retrieveWardrobes();
            this.currentWardrobe = null;
            this.currentIndex = -1;
            this.filter=""
        },
        setActiveWardrobe(wardrobe,index){
            this.currentWardrobe = wardrobe;
            this.currentIndex = wardrobe ? index : -1;
        }, 
        findByNumberEmployeeRoom(){
            WardrobesDataService.findByNumberEmployeeRoom(this.filter).
            then(response=>{
                this.wardrobes=response.data;
                this.currentWardrobe = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveWardrobes();
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
