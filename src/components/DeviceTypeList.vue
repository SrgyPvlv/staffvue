<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список типов приборов </h3>
        <label for="newdevicetype" class="fw-bold fst-italic me-3">Новый тип</label>
        <input id="newdevicetype" name="newdevicetype" class="newinputwidth" v-model="newdevicetype"/>
        <button @click="createDeviceType()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(devicetype, index) in devicetypes" :key="index">
                <input id="devicetype" name="devicetype" class="inputwidth" v-model="devicetype.deviceTypeName"/>
                <button @click="editDeviceType(devicetype.id,devicetype.deviceTypeName)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteDeviceType(devicetype.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DeviceTypesDataService from '../services/DeviceTypesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "devicetypes-list",
    data(){
        return{
            devicetypes:[],
            newdevicetype:""
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
        retrieveDeviceTypes(){
            DeviceTypesDataService.getAll().
            then(response=>{
                this.devicetypes=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteDeviceType(id) {
            DeviceTypesDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить используемый тип прибора!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editDeviceType(id,devicetype) {
            var data = {
                deviceTypeName: devicetype
            };
            DeviceTypesDataService.update(id, data).
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
        createDeviceType() {
            var data= {
                deviceTypeName: this.newdevicetype
            };
            DeviceTypesDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newdevicetype=""
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
            this.retrieveDeviceTypes()
        }
    },
    mounted(){
            this.retrieveDeviceTypes();
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
