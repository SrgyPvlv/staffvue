<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">
        
        <div class="form-group mt-3">
          <label for="tooltype" class="fw-bold">Тип инструмента</label>
          <select class="form-select mt-1" id="tooltype" name="tooltype" v-model="tool.toolTypeSelected" required>
           <option v-for="(tooltype,index) in tooltypes" :key="index" :value="tooltype">{{tooltype.toolTypeName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="toolname" class="fw-bold">Наименование инструмента</label>
          <select class="form-select mt-1" id="toolname" name="toolname" v-model="tool.toolNameSelected" required>
           <option :value="null"> нет наименования </option>
           <option v-for="(toolname,index) in toolnames" :key="index" :value="toolname">{{toolname.toolName}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="toolnumber" class="fw-bold">Номер инструмента</label>
          <input type="text" class="form-control mt-1" id="toolnumber" name="toolnumber" v-model="tool.toolNumber"/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец инструмента</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="tool.employeeSelected" required>
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="toolcomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="toolcomment" name="toolcomment" v-model="tool.toolComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="toolaccounting" class="fw-bold">Номер бухучета</label>
          <input type="text" class="form-control mt-1" id="toolaccounting" name="toolaccounting" v-model="tool.toolAccounting"/>
        </div>

        <div class="form-group mt-3">
          <label for="toolstoreplace" class="fw-bold">Место хранения</label>
          <input type="text" class="form-control mt-1" id="toolstoreplace" name="toolstoreplace" v-model="tool.storePlace" required/>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Временно передан</p>
          <input type="radio" class="mt-1" id="inmoving1" name="inmoving1" value="true" v-model="tool.inMoving"/>
          <label for="inmoving1" class="ms-1 fw-bold">Да</label>
          <input type="radio" class="ms-3" id="inmoving2" name="inmoving2" value="false" v-model="tool.inMoving"/>
          <label for="inmoving2" class="ms-1 fw-bold">Нет</label>
        </div>

        <div class="form-group mt-3">
          <label for="datemoving" class="fw-bold">Дата передачи/возврата инструмента</label>
          <input type="date" class="form-control mt-1" id="datemoving" name="datemoving" v-model="tool.dateMoving"/>
        </div>

        <div class="form-group mt-3">
          <label for="commentmoving" class="fw-bold">Кому передан</label>
          <input type="text" class="form-control mt-1" id="commentmoving" name="commentmoving" v-model="tool.commentMoving"/>
        </div>
  
        <button @click="saveTool" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newTool">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import ToolTypesDataService from '../services/ToolTypesDataService'
  import ToolNamesDataService from '../services/ToolNamesDataService'
  import ToolDataService from '../services/ToolDataService'
  import EmployeesDataService from '../services/EmployeesDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "add-tool",
    data() {
      return {
        tool: {
          id: null,
          toolTypeSelected:"",
          toolNameSelected:"",
          toolNumber:"",
          employeeSelected:"",
          toolComment:"",
          toolAccounting:"",
          storePlace:"",
          inMoving:false,
          dateMoving:"",
          commentMoving:""
        },
        submitted: false,
        tooltypes:[],
        toolnames:[],
        employees:[]
      };
    },
    methods: {
        saveTool() {
        var data = {
          toolType: this.tool.toolTypeSelected,
          toolName: this.tool.toolNameSelected,
          toolNumber: this.tool.toolNumber,
          employee: this.tool.employeeSelected,
          toolComment: this.tool.toolComment,
          toolAccounting: this.tool.toolAccounting,
          storePlace: this.tool.storePlace,
          inMoving: this.tool.inMoving,
          dateMoving: this.tool.dateMoving,
          commentMoving: this.tool.commentMoving
        };
  
        ToolDataService.create(data)
          .then(response => {
            this.tool.id = response.data.id;
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
      
      newTool() {
        this.submitted = false;
        this.tool = {
          id: null,
          toolTypeSelected:"",
          toolNameSelected:"",
          toolNumber:"",
          employeeSelected:"",
          toolComment:"",
          toolAccounting:"",
          storePlace:"",
          inMoving:false,
          dateMoving:"",
          commentMoving:""
        };
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
       },
    },
    mounted(){
      this.retrieveToolTypes();
      this.retrieveToolNames();
      this.retrieveEmployees()
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>