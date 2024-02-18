<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список парковок автомобилей </h3>
        <label for="newcarparking" class="fw-bold fst-italic me-3">Новая парковка</label>
        <input id="newcarparking" name="newcarparking" class="newinputwidth" v-model="newcarparking"/>
        <button @click="createCarParking()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(carparking, index) in carparkings" :key="index">
                <input id="carparking" name="carparking" class="inputwidth" v-model="carparking.parkingName"/>
                <button @click="editCarParking(carparking.id,carparking.parkingName)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteCarParking(carparking.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import CarParkingsDataService from '../services/CarParkingsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "carparkings-list",
    data(){
        return{
            carparkings:[],
            newcarparking:""
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
        retrieveCarParkings(){
            CarParkingsDataService.getAll().
            then(response=>{
                this.carparkings=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteCarParking(id) {
            CarParkingsDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить существующий паркинг!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editCarParking(id,carparking) {
            var data = {
                parkingName: carparking
            };
            CarParkingsDataService.update(id, data).
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
        createCarParking() {
            var data= {
                parkingName: this.newcarparking
            };
            CarParkingsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newcarparking=""
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
            this.retrieveCarParkings()
        }
    },
    mounted(){
            this.retrieveCarParkings();
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
