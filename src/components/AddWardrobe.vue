<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">
        
        <div class="form-group">
          <label for="wardrobenumber" class="fw-bold">Номер шкафчика</label>
          <input type="text" class="form-control mt-1" id="wardrobenumber" name="wardrobenumber" v-model="wardrobe.numberSelected" required/>
        </div>

        <div class="form-group mt-3">
          <label for="wardroberoom" class="fw-bold">Помещение</label>
          <input type="text" class="form-control mt-1" id="wardroberoom" name="wardroberoom" v-model="wardrobe.roomSelected" required/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец шкафчика</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="wardrobe.employeeSelected">
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="wardrobecomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="wardrobecomment" name="wardrobecomment" v-model="wardrobe.commentSelected"/>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Использование</p>
          <input type="radio" class="mt-1" id="free1" name="free1" value="true" v-model="wardrobe.freeSelected"/>
          <label for="free1" class="ms-1 fw-bold">Свободен</label>
          <input type="radio" class="ms-3" id="free2" name="free2" value="false" v-model="wardrobe.freeSelected"/>
          <label for="free2" class="ms-1 fw-bold">Занят</label>
        </div>
  
        <button @click="saveWardrobe" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newWardrobe">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import WardrobesDataService from '../services/WardrobesDataService'
  import EmployeesDataService from '../services/EmployeesDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "add-wardrobe",
    data() {
      return {
        wardrobe: {
          id: null,
          numberSelected:"",
          employeeSelected:"",
          roomSelected:"",
          freeSelected:false,
          commentSelected:""
        },
        submitted: false,
        employees:[]
      };
    },
    methods: {
        saveWardrobe() {
        var data = {
          number: this.wardrobe.numberSelected,
          employee: this.wardrobe.employeeSelected,
          room: this.wardrobe.roomSelected,
          free: this.wardrobe.freeSelected,
          comment: this.wardrobe.commentSelected
        };
  
        WardrobesDataService.create(data)
          .then(response => {
            this.wardrobe.id = response.data.id;
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
      
      newWardrobe() {
        this.submitted = false;
        this.wardrobe = {
          id: null,
          numberSelected:"",
          employeeSelected:"",
          roomSelected:"",
          freeSelected:false,
          commentSelected:""
        };
      },

       retrieveEmployees(){
        EmployeesDataService.getAll().
            then(response=>{
                this.employees=response.data.map(e=>{var newemployee={id:e.id, name:e.name};return newemployee});
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
       },
    },
    mounted(){
      this.retrieveEmployees()
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>