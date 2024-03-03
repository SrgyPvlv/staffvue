<template>
    <div v-if="currentWardrobe" class="edit-form">

      <h5 class="mt-3 text-success">{{ message }}</h5>

      <h4>Шкафчик</h4>
      <form class="was-validated">
        <div class="form-group mt-3">
          <label for="wardrobenumber" class="fw-bold">Номер шкафчика</label>
          <input type="text" class="form-control mt-1" id="wardrobenumber" name="wardrobenumber" v-model="currentWardrobe.number" required/>
        </div>

        <div class="form-group mt-3">
          <label for="wardroberoom" class="fw-bold">Помещение</label>
          <input type="text" class="form-control mt-1" id="wardroberoom" name="wardroberoom" v-model="currentWardrobe.room" required/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец шкафчика</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="currentWardrobe.employee">
           <option :value="currentWardrobe.employee">{{currentWardrobe.employee.name}}</option> 
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="wardrobecomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="wardrobecomment" name="wardrobecomment" v-model="currentWardrobe.comment"/>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Использование</p>
          <input type="radio" class="mt-1" id="free1" name="free1" value="true" v-model="currentWardrobe.free"/>
          <label for="free1" class="ms-1 fw-bold">Свободен</label>
          <input type="radio" class="ms-3" id="free2" name="free2" value="false" v-model="currentWardrobe.free"/>
          <label for="free2" class="ms-1 fw-bold">Занят</label>
        </div>
      </form>

      <div class="mt-3">
      <button @click="updateWardrobe" class="btn btn-outline-success me-3">Обновить</button>
      </div>

    </div>

    <div v-else>
      <br>
      <p>Выберите шкафчик...</p>
    </div>
</template>

<script>
import WardrobesDataService from '../services/WardrobesDataService'
import EmployeesDataService from '../services/EmployeesDataService'
import EventBus from "../common/EventBus"

export default {
  name: "wardrobe",
  data() {
    return {
      currentWardrobe:null,
      message:"",
      employees:[]
    };
  },
  computed: {
    currentWardrobeSomeFieldsEmployee(){
      var newemployee=null;
      return newemployee={id:this.currentTool.employee.id, name:this.currentTool.employee.name};
    }
  },
  methods: {
    getWardrobe(id) {
        WardrobesDataService.get(id)
      .then(response => {
        this.currentWardrobe = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },

  updateWardrobe() {
    var data = {
      number: this.currentWardrobe.number,
      employee: this.currentWardrobeSomeFieldsEmployee,
      room: this.currentWardrobe.room,
      free: this.currentWardrobe.free,
      comment: this.currentWardrobe.comment
    };
    WardrobesDataService.update(this.currentWardrobe.id, data)
      .then(response => {
        console.log(response.data);
        this.message = 'Данные по шкафчику успешно обновлены!';
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
       retrieveEmployees(){
        EmployeesDataService.getAll().
            then(response=>{
              this.employees=response.data.map(e=>{var newemployee={id:e.id, name:e.name};return newemployee});
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
       }
  },
  mounted(){
    this.message = '';
    this.getWardrobe(this.$route.params.id);
    this.retrieveEmployees()

  }
};
</script>

<style>
.edit-form {
max-width: 450px;
}
</style>