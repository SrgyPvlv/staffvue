<template>
    <div class="list row">
        <div class="col-md-7">
            <form @submit.prevent="findByNumberTypeNameEmployeeCommentPlace">
            <div class="input-group mb-3"> 
                <input type="text" class="form-control" placeholder="Поиск по номеру,типу,наименованию,сотруднику,комментарию" v-model="filter" />
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-secondary" @click="findByNumberTypeNameEmployeeCommentPlace">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
            </div>
            </form>
        </div>
    </div>
    <div class="list row">
        <div class="col-md-6">
        <h3> Список приборов </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(device, index) in devices"
                :key="index"
                @click="setActiveDevice(device,index)">
                {{ device.deviceType.deviceTypeName }} {{ device.deviceName.deviceName }} s/n: {{ device.deviceNumber }}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-6">
            <div v-if="currentDevice">
                <h3> Прибор </h3>
                <div>
                    <label><strong>Тип:</strong></label> {{ currentDevice.deviceType.deviceTypeName }}
                </div>
                <div>
                    <label><strong>Наименование:</strong></label> {{ currentDevice.deviceName.deviceName }}
                </div>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentDevice.deviceNumber }}
                </div>
                <div>
                    <label><strong>Владелец:</strong></label> {{ currentDevice.employee.name }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentDevice.deviceComment }}
                </div>
                <div>
                    <label><strong>Номер бухучета:</strong></label> {{ currentDevice.deviceAccounting }}
                </div>
                <div>
                    <label><strong>Место хранения:</strong></label> {{ currentDevice.storePlace }}
                </div>
                <div>
                    <label><strong>Подлежит поверке:</strong></label>
                    <span :class="{'text-success fw-bold':currentDevice.verificationNeed==true}">{{currentDevice.verificationNeed==true? ' да': ' нет' }}</span>
                </div>
                <div>
                    <label><strong>Находится в поверке:</strong></label>
                    <span :class="{'text-danger fw-bold':currentDevice.inVerification==true}"> {{currentDevice.inVerification==true? ' да': ' нет' }} </span>
                </div>

                <div v-if="showAdminBoard || showSuperAdminBoard || showTesterBoard">             
                <RouterLink :to="'/devices/'+currentDevice.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>
                <button @click="deleteDevice" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите прибор...</p>
            </div>

        </div>

    </div>
</template>

<script>
import DeviceDataService from '../services/DeviceDataService'
import EventBus from "../common/EventBus"

export default{
    name: "devices-list",
    data(){
        return{
            devices:[],
            currentDevice:null,
            currentIndex:-1,
            filter:""
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
    },
    showSuperAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_SUPERADMIN');
        }
            return false;
        },
        showTesterBoard() {
            if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_TESTER');
        }
            return false;
        }    
  },
    methods:{
        retrieveDevices(){
            DeviceDataService.getAll().
            then(response=>{
                this.devices=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteDevice() {
            let isDeleteDevice=confirm("Вы точно хотите удалить прибор?\nОтменить действие будет нельзя!");
            if(isDeleteDevice===true){
            DeviceDataService.delete(this.currentDevice.id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!");}
            })
            .catch(e => {
            console.log(e);});}
        },
        refreshList(){
            this.retrieveDevices();
            this.currentDevice = null;
            this.currentIndex = -1;
            this.filter=""
        },
        setActiveDevice(device,index){
            this.currentDevice = device;
            this.currentIndex = device ? index : -1;
        }, 
        findByNumberTypeNameEmployeeCommentPlace(){
            DeviceDataService.findByNumberTypeNameEmployeeCommentPlace(this.filter).
            then(response=>{
                this.devices=response.data;
                this.currentDevice = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveDevices();
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
