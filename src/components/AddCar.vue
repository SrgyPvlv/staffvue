<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="number" class="fw-bold">Госномер автомобиля</label>
          <input
            type="text"
            class="form-control mt-1"
            id="number"
            required
            v-model="car.carNumber"
            name="number"
            placeholder="Введите номер в данном формате: A 111 AA 198"
          />
        </div>
  
        <div class="form-group mt-3">
          <label for="model" class="fw-bold">Модель автомобиля</label>
          <select class="form-select mt-1" id="model" name="model" v-model="car.carModelSelected" required>
           <option v-for="(carmodel,index) in carmodels" :key="index" :value="carmodel">{{carmodel.carModel}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="parking" class="fw-bold">Место стоянки автомобиля</label>
          <select class="form-select mt-1" id="parking" name="parking" v-model="car.carParkingSelected" required>
           <option v-for="(carparking,index) in carparkings" :key="index" :value="carparking">{{carparking.parkingName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="comment" class="fw-bold">Комментарий</label>
          <input
            class="form-control mt-1"
            id="comment"
            v-model="car.carComment"
            name="comment"
          />
        </div>
  
        <button @click="saveCar" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newCar">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import CarsDataService from '../services/CarsDataService'
  import CarModelsDataService from '../services/CarModelsDataService'
  import CarParkingsDataService from '../services/CarParkingsDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "add-car",
    data() {
      return {
        car: {
          id: null,
          carNumber: "",
          carComment: "",
          carModelSelected:"",
          carParkingSelected:""
        },
        submitted: false,
        carmodels:[],
        carparkings:[]
      };
    },
    methods: {
      saveCar() {
        var data = {
          carNumber: this.car.carNumber,
          carComment: this.car.carComment,
          carModel: this.car.carModelSelected,
          carParking: this.car.carParkingSelected
        };
  
        CarsDataService.create(data)
          .then(response => {
            this.car.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          },
          error => {
            if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
            if (error.response && error.response.status === 501) {
                    alert("Ошибка! Что-то пошло не так!");}
          }
          )
          .catch(e => {
            console.log(e);
          });
      },
      
      newCar() {
        this.submitted = false;
        this.car = {};
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
      this.retrieveCarModel();
      this.retrieveCarParking()
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>
  
 