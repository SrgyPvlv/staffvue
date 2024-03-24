<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">
        
        <div class="form-group mt-3">
          <label for="devicetype" class="fw-bold">Тип прибора</label>
          <select class="form-select mt-1" id="devicetype" name="devicetype" v-model="device.deviceTypeSelected" required>
           <option v-for="(devicetype,index) in devicetypes" :key="index" :value="devicetype">{{devicetype.deviceTypeName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="devicetype" class="fw-bold">Наименование прибора</label>
          <select class="form-select mt-1" id="devicetype" name="devicetype" v-model="device.deviceNameSelected" required>
           <option v-for="(devicename,index) in devicenames" :key="index" :value="devicename">{{devicename.deviceName}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="devicetype" class="fw-bold">Номер прибора</label>
          <input type="text" class="form-control mt-1" id="devicenumber" name="devicenumber" required v-model="device.deviceNumber"/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец прибора</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="device.employeeSelected" required>
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="devicecomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="devicecomment" name="devicecomment" v-model="device.deviceComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="deviceaccounting" class="fw-bold">Номер бухучета</label>
          <input type="text" class="form-control mt-1" id="deviceaccounting" name="deviceaccounting" v-model="device.deviceAccounting"/>
        </div>

        <div class="form-group mt-3">
          <label for="devicestoreplace" class="fw-bold">Место хранения</label>
          <input type="text" class="form-control mt-1" id="devicestoreplace" name="devicestoreplace" v-model="device.storePlace" required/>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Подлежит поверке</p>
          <input type="radio" class="mt-1" id="verificationneed1" name="verificationneed1" value="true" v-model="device.verificationNeed"/>
          <label for="verificationneed1" class="ms-1 fw-bold">Да</label>
          <input type="radio" class="ms-3" id="verificationneed2" name="verificationneed2" value="false" v-model="device.verificationNeed"/>
          <label for="verificationneed2" class="ms-1 fw-bold">Нет</label>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Находится в поверке</p>
          <input type="radio" class="mt-1" id="inverification1" name="inverification1" value="true" v-model="device.inVerification"/>
          <label for="inverification1" class="ms-1 fw-bold">Да</label>
          <input type="radio" class="ms-3" id="inverification2" name="inverification2" value="false" v-model="device.inVerification"/>
          <label for="inverification2" class="ms-1 fw-bold">Нет</label>
        </div>

        <div class="form-group mt-3">
          <label for="datemoving" class="fw-bold">Дата сдачи/возврата прибора</label>
          <input type="date" class="form-control mt-1" id="datemoving" name="datemoving" v-model="device.dateMoving"/>
        </div>
  
        <button @click="saveDevice" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newDevice">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import DeviceTypesDataService from '../services/DeviceTypesDataService'
  import DeviceNamesDataService from '../services/DeviceNamesDataService'
  import DeviceDataService from '../services/DeviceDataService'
  import EmployeesDataService from '../services/EmployeesDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "add-device",
    data() {
      return {
        device: {
          id: null,
          deviceTypeSelected:"",
          deviceNameSelected:"",
          deviceNumber:"",
          employeeSelected:"",
          deviceComment:"",
          deviceAccounting:"",
          storePlace:"",
          verificationNeed:false,
          inVerification:false,
          dateMoving:""
        },
        submitted: false,
        devicetypes:[],
        devicenames:[],
        employees:[]
      };
    },
    methods: {
        saveDevice() {
        var data = {
          deviceType: this.device.deviceTypeSelected,
          deviceName: this.device.deviceNameSelected,
          deviceNumber: this.device.deviceNumber,
          employee: this.device.employeeSelected,
          deviceComment: this.device.deviceComment,
          deviceAccounting: this.device.deviceAccounting,
          storePlace: this.device.storePlace,
          verificationNeed: this.device.verificationNeed,
          inVerification: this.device.inVerification,
          dateMoving: this.device.dateMoving
        };
  
        DeviceDataService.create(data)
          .then(response => {
            this.device.id = response.data.id;
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
      
      newDevice() {
        this.submitted = false;
        this.device = {
          id: null,
          deviceTypeSelected:"",
          deviceNameSelected:"",
          deviceNumber:"",
          employeeSelected:"",
          deviceComment:"",
          deviceAccounting:"",
          storePlace:"",
          verificationNeed:false,
          inVerification:false,
          dateMoving:""
        };
      },

      retrieveDeviceTypes(){
        DeviceTypesDataService.getAll().
            then(response=>{
                this.devicetypes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
       },
       retrieveDeviceNames(){
        DeviceNamesDataService.getAll().
            then(response=>{
                this.devicenames=response.data;
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
      this.retrieveDeviceTypes();
      this.retrieveDeviceNames();
      this.retrieveEmployees()
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>
  
 