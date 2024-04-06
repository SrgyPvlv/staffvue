<template>
    <div class="list row">
        <div class="col-md-6">
            <form @submit.prevent="findByNumberModelEmployee">
            <div class="input-group mb-3"> 
                <input type="text" class="form-control" placeholder="Поиск по номеру, модели, сотруднику" v-model="filter" />
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-secondary" @click="findByNumberModelEmployee">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <div class="list row">
        <div class="col-md-4">
        <h3> Список автомобилей </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(car, index) in cars"
                :key="index"
                @click="setActiveCar(car,index)">
                {{ car.carNumber }}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-8">
            <div v-if="currentCar">
                <h3> Автомобиль </h3>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentCar.carNumber }}
                </div>
                <div>
                    <label><strong>Модель:</strong></label> {{ currentCar.carModel!=null?currentCar.carModel.carModel:'' }}
                </div>
                <div>
                    <label><strong>Водитель:</strong></label> {{ currentCar.employee!=null?currentCar.employee.name+', '+currentCar.employee.mobilePhone:'' }}
                </div>
                <div>
                    <label><strong>Место стоянки:</strong></label> {{ currentCar.carParking!=null?currentCar.carParking.parkingName:'' }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentCar.carComment }}
                </div>

                <div v-if="showAdminBoard || showSuperAdminBoard">             
                <RouterLink :to="'/cars/'+currentCar.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>
                <button @click="deleteCar" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите машину...</p>
            </div>

        </div>

    </div>
</template>

<script>
import CarsDataService from '../services/CarsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "cars-list",
    data(){
        return{
            cars:[],
            currentCar:null,
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
        retrieveCars(){
            CarsDataService.getAll().
            then(response=>{
                this.cars=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteCar() {
            let isDeleteCar=confirm("Вы точно хотите удалить автомобиль?\nОтменить действие будет нельзя!");
            if(isDeleteCar===true){
            CarsDataService.delete(this.currentCar.id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить автомобиль закрепленный за сотрудником!?");}
            })
            .catch(e => {
            console.log(e);});}
        },
        refreshList(){
            this.retrieveCars();
            this.currentCar = null;
            this.currentIndex = -1;
            this.filter=""
        },
        setActiveCar(car,index){
            this.currentCar = car;
            this.currentIndex = car ? index : -1;
        }, 
        findByNumberModelEmployee(){
            CarsDataService.findByNumberModelEmployee(this.filter).
            then(response=>{
                this.cars=response.data;
                this.currentCar = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveCars();
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
