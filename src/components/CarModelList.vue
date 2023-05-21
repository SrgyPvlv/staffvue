<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список моделей автомобилей </h3>
        <label for="newcarmodel" class="fw-bold fst-italic me-3">Новая модель</label>
        <input id="newcarmodel" name="newcarmodel" class="newinputwidth" v-model="newcarmodel"/>
        <button @click="createCarModel()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(carmodel, index) in carmodels" :key="index">
                <input id="carmodel" name="carmodel" class="inputwidth" v-model="carmodel.carModel"/>
                <button @click="editCarModel(carmodel.id,carmodel.carModel)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteCarModel(carmodel.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import CarModelsDataService from '../services/CarModelsDataService'
import EventBus from "../common/EventBus"

export default{
    name: "carmodels-list",
    data(){
        return{
            carmodels:[],
            newcarmodel:""
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
        retrieveCarModels(){
            CarModelsDataService.getAll().
            then(response=>{
                this.carmodels=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteCarModel(id) {
            CarModelsDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить модель существующих автомобилей!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editCarModel(id,carmodel) {
            var data = {
                carModel: carmodel
            };
            CarModelsDataService.update(id, data).
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
        createCarModel() {
            var data= {
                carModel: this.newcarmodel
            };
            CarModelsDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newcarmodel=""
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
            this.retrieveCarModels()
        }
    },
    mounted(){
            this.retrieveCarModels();
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
