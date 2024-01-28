<template>
    <div v-if="currentTool" class="edit-form">
      <h4>Инструмент</h4>
      <form class="was-validated">
        <div class="form-group mt-3">
          <label for="tooltype" class="fw-bold">Тип инструмента</label>
          <select class="form-select mt-1" id="tooltype" name="tooltype" v-model="currentTool.toolType" required>
           <option v-for="(tooltype,index) in tooltypes" :key="index" :value="tooltype">{{tooltype.toolTypeName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="toolname" class="fw-bold">Наименование инструмента</label>
          <select class="form-select mt-1" id="toolname" name="toolname" v-model="currentTool.toolName" required>
           <option v-for="(toolname,index) in toolnames" :key="index" :value="toolname">{{toolname.toolName}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="toolnumber" class="fw-bold">Номер инструмента</label>
          <input type="text" class="form-control mt-1" id="toolnumber" name="toolnumber" v-model="currentTool.toolNumber"/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец инструмента</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="currentTool.employee" required>
           <option :value="currentTool.employee">{{currentTool.employee.name}}</option> 
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="toolcomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="toolcomment" name="toolcomment" v-model="currentTool.toolComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="toolaccounting" class="fw-bold">Номер бухучета</label>
          <input type="text" class="form-control mt-1" id="toolaccounting" name="toolaccounting" v-model="currentTool.toolAccounting"/>
        </div>

        <div class="form-group mt-3">
          <label for="toolstoreplace" class="fw-bold">Место хранения</label>
          <input type="text" class="form-control mt-1" id="toolstoreplace" name="toolstoreplace" v-model="currentTool.storePlace"/>
        </div>
      </form>

      <div class="mt-3">
      <button @click="updateTool" class="btn btn-outline-success me-3">Обновить</button>
      </div>

      <h5 class="mt-3 text-success">{{ message }}</h5>
    </div>

    <div v-else>
      <br>
      <p>Выберите инструмент...</p>
    </div>
</template>

<script>
import ToolTypesDataService from '../services/ToolTypesDataService'
import ToolNamesDataService from '../services/ToolNamesDataService'
import ToolDataService from '../services/ToolDataService'
import EmployeesDataService from '../services/EmployeesDataService'
import EventBus from "../common/EventBus"

export default {
  name: "tool",
  data() {
    return {
      currentTool:null,
      message:"",
      tooltypes:[],
      toolnames:[],
      employees:[]
    };
  },
  computed: {
    currentToolSomeFieldsEmployee(){
      var newemployee=null;
      return newemployee={id:this.currentTool.employee.id, name:this.currentTool.employee.name};
    }
  },
  methods: {
      getDevice(id) {
        ToolDataService.get(id)
      .then(response => {
        this.currentTool = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },

  updateTool() {
    var data = {
      toolType: this.currentTool.deviceType,
      toolName: this.currentTool.deviceName,
      toolNumber: this.currentTool.deviceNumber,
      employee: this.currentToolSomeFieldsEmployee,
      toolComment: this.currentTool.deviceComment,
      toolAccounting: this.currentTool.deviceAccounting,
      storePlace: this.currentTool.storePlace
    };
    ToolDataService.update(this.currentTool.id, data)
      .then(response => {
        console.log(response.data);
        this.message = 'Данные по инструменту успешно обновлены!';
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
  retrieveToolTypes(){
    ToolTypesDataService.getAll().
            then(response=>{
                this.tooltypes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
       },
       retrieveToolNames(){
        ToolNamesDataService.getAll().
            then(response=>{
                this.toolnames=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
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
    this.getTool(this.$route.params.id);
    this.retrieveToolTypes();
    this.retrieveToolNames();
    this.retrieveEmployees()

  }
};
</script>

<style>
.edit-form {
max-width: 450px;
}
</style>