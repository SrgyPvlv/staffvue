<template>
    <div v-if="currentDevice" class="edit-form">
      <h4>Прибор</h4>
      <form class="was-validated">
        <div class="form-group mt-3">
          <label for="devicetype" class="fw-bold">Тип прибора</label>
          <select class="form-select mt-1" id="devicetype" name="devicetype" v-model="currentDevice.deviceType" required>
           <option v-for="(devicetype,index) in devicetypes" :key="index" :value="devicetype">{{devicetype.deviceTypeName}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="devicetype" class="fw-bold">Наименование прибора</label>
          <select class="form-select mt-1" id="devicetype" name="devicetype" v-model="currentDevice.deviceName" required>
           <option v-for="(devicename,index) in devicenames" :key="index" :value="devicename">{{devicename.deviceName}}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="devicetype" class="fw-bold">Номер прибора</label>
          <input type="text" class="form-control mt-1" id="devicenumber" name="devicenumber" required v-model="currentDevice.deviceNumber"/>
        </div>

        <div class="form-group mt-3">
          <label for="employee" class="fw-bold">Владелец прибора</label>
          <select class="form-select mt-1" id="employee" name="employee" v-model="currentDevice.employee" required>
           <option :value="currentDevice.employee">{{currentDevice.employee.name}}</option> 
           <option v-for="(employee,index) in employees" :key="index" :value="employee">{{employee.name}}</option>
          </select>
        </div>
        
        <div class="form-group mt-3">
          <label for="devicecomment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="devicecomment" name="devicecomment" v-model="currentDevice.deviceComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="deviceaccounting" class="fw-bold">Номер бухучета</label>
          <input type="text" class="form-control mt-1" id="deviceaccounting" name="deviceaccounting" v-model="currentDevice.deviceAccounting"/>
        </div>

        <div class="form-group mt-3">
          <label for="devicestoreplace" class="fw-bold">Место хранения</label>
          <input type="text" class="form-control mt-1" id="devicestoreplace" name="devicestoreplace" v-model="currentDevice.storePlace"/>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Подлежит поверке</p>
          <input type="radio" class="mt-1" id="verificationneed1" name="verificationneed1" value="true" v-model="currentDevice.verificationNeed"/>
          <label for="verificationneed1" class="ms-1 fw-bold">Да</label>
          <input type="radio" class="ms-3" id="verificationneed2" name="verificationneed2" value="false" v-model="currentDevice.verificationNeed"/>
          <label for="verificationneed2" class="ms-1 fw-bold">Нет</label>
        </div>

        <div class="form-group mt-3">
          <p class="fw-bold">Находится в поверке</p>
          <input type="radio" class="mt-1" id="inverification1" name="inverification1" value="true" v-model="currentDevice.inVerification"/>
          <label for="inverification1" class="ms-1 fw-bold">Да</label>
          <input type="radio" class="ms-3" id="inverification2" name="inverification2" value="false" v-model="currentDevice.inVerification"/>
          <label for="inverification2" class="ms-1 fw-bold">Нет</label>
        </div>

        <div class="form-group mt-3">
          <label for="datemoving" class="fw-bold">Дата сдачи/возврата прибора</label>
          <input type="date" class="form-control mt-1" id="datemoving" name="datemoving" v-model="currentDevice.dateMoving"/>
        </div>

      </form>

      <div class="mt-3">
      <button @click="updateDevice" class="btn btn-outline-success me-3">Обновить</button>
      </div>

      <h5 class="mt-3 text-success">{{ message }}</h5>
    </div>

    <div v-else>
      <br>
      <p>Выберите прибор...</p>
    </div>
</template>

<script>
import DeviceTypesDataService from '../services/DeviceTypesDataService'
import DeviceNamesDataService from '../services/DeviceNamesDataService'
import DeviceDataService from '../services/DeviceDataService'
import EmployeesDataService from '../services/EmployeesDataService'
import EventBus from "../common/EventBus"

export default {
  name: "device",
  data() {
    return {
      currentDevice:null,
      message:"",
      devicetypes:[],
      devicenames:[],
      employees:[]
    };
  },
  computed: {
    currentDeviceSomeFieldsEmployee(){
      var newemployee=null;
      return newemployee={id:this.currentDevice.employee.id, name:this.currentDevice.employee.name};
    }
  },
  methods: {
      getDevice(id) {
      DeviceDataService.get(id)
      .then(response => {
        this.currentDevice = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },

  updateDevice() {
    var data = {
      deviceType: this.currentDevice.deviceType,
      deviceName: this.currentDevice.deviceName,
      deviceNumber: this.currentDevice.deviceNumber,
      employee: this.currentDeviceSomeFieldsEmployee,
      deviceComment: this.currentDevice.deviceComment,
      deviceAccounting: this.currentDevice.deviceAccounting,
      storePlace: this.currentDevice.storePlace,
      verificationNeed: this.currentDevice.verificationNeed,
      inVerification: this.currentDevice.inVerification,
      dateMoving: this.currentDevice.dateMoving
    };
    DeviceDataService.update(this.currentDevice.id, data)
      .then(response => {
        console.log(response.data);
        this.message = 'Данные по прибору успешно обновлены!';
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
       }
  },
  mounted(){
    this.message = '';
    this.getDevice(this.$route.params.id);
    this.retrieveDeviceTypes();
    this.retrieveDeviceNames();
    this.retrieveEmployees()

  }
};
</script>

<style>
.edit-form {
max-width: 450px;
}
</style>

