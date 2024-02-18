<template>
      <div v-if="currentCar" class="edit-form">
        <h4>Автомобиль</h4>
        <form class="was-validated">
        <div class="form-group mt-3">
          <label for="number" class="fw-bold">Госномер автомобиля</label>
          <input type="text" class="form-control mt-1" id="number" required v-model="currentCar.carNumber" name="number" placeholder="Введите номер в данном формате: A 111 AA 198"/>
        </div>
  
        <div class="form-group mt-3">
          <label for="model" class="fw-bold">Модель автомобиля</label>
          <select class="form-select mt-1" id="model" name="model" v-model="currentCar.carModel" required>
           <option v-for="(carmodel,index) in carmodels" :key="index" :value="carmodel">{{carmodel.carModel}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="parking" class="fw-bold">Место стоянки автомобиля</label>
          <select class="form-select mt-1" id="parking" name="parking" v-model="currentCar.carParking" required>
           <option v-for="(carparking,index) in carparkings" :key="index" :value="carparking">{{carparking.parkingName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="comment" class="fw-bold">Комментарий</label>
          <input class="form-control mt-1" id="comment" v-model="currentCar.carComment" name="comment"/>
        </div>
        </form>

        <div class="mt-3">
        <button @click="updateCar" class="btn btn-outline-success me-3">Обновить</button>
        </div>

        <h5 class="mt-3 text-success">{{ message }}</h5>
      </div>
  
      <div v-else>
        <br>
        <p>Выберите машину...</p>
      </div>
</template>
  
  <script>
  import CarsDataService from '../services/CarsDataService'
  import CarModelsDataService from '../services/CarModelsDataService'
  import CarParkingsDataService from '../services/CarParkingsDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "car",
    data() {
      return {
        currentCar:null,
        message:"",
        carmodels:[],
        carparkings:[]
      };
    },
    methods: {
        getCar(id) {
        CarsDataService.get(id)
        .then(response => {
          this.currentCar = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCar() {
      var data = {
        carNumber: this.currentCar.carNumber,
        carComment: this.currentCar.carComment,
        carModel: this.currentCar.carModel,
        carParking: this.currentCar.carParking
      };
      CarsDataService.update(this.currentCar.id, data)
        .then(response => {
          console.log(response.data);
          this.message = 'Данные по автомобилю успешно обновлены!';
        },
        error => {
          if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
          if (error.response && error.response.status === 501) {
                    alert("Ошибка! Что-то пошло не так!");}
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveCarModel(){
            CarModelsDataService.getAll().
            then(response=>{
                this.carmodels=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          },
    retrieveCarParking(){
        CarParkingsDataService.getAll().
            then(response=>{
                this.carparkings=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          }      
    },
    mounted(){
      this.message = '';
      this.getCar(this.$route.params.id);
      this.retrieveCarModel();
      this.retrieveCarParking()
    }
  };
  </script>

<style>
.edit-form {
  max-width: 450px;
}
</style>
  
 