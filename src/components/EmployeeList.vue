<template>
    <div class="list row">
        <div class="col-md-8">
            
            <div class="input-group mb-3">
                <form @submit.prevent="findByNameMobilePosition">
                <input type="text" class="form-control inputform" placeholder="Поиск по ФИО, мобильному, должности" v-model="filter" />
                </form>
                <div class="input-group-append ms-2">
                <button type="button" class="btn btn-outline-secondary" @click="findByNameMobilePosition">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
                <div class="input-group-append ms-3">                                         
                <div class="dropdown">
                <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">Подразделение</button>
                   <ul class="dropdown-menu customselect">
                      <li>
                        <select class="form-select" @change="findByFactDepartment" v-model="factSelected">
                          <option disabled style="font-weight: bold">Подразделение (факт)</option>  
                          <option v-for="(department, index) in departments" :key="index">
                            {{department.functionGroup!=null? department.functionGroup.functionGroup: department.groupe!=null?department.groupe.groupe: department.division.division}}
                          </option>
                        </select>
                      </li>
                      <li>
                        <select class="form-select" @change="findByStaffDepartment" v-model="staffSelected">
                          <option disabled style="font-weight: bold">Подразделение (штат)</option>  
                          <option v-for="(department, index) in departments" :key="index">
                            {{department.functionGroup!=null? department.functionGroup.functionGroup: department.groupe!=null?department.groupe.groupe: department.division.division}}
                          </option>
                        </select>
                      </li>
                    </ul>
                </div>
                </div>                                              
            </div>
            
        </div>
    </div>
    <div class="list row">
        <div class="col-md-5 ">
        <h3> Список сотрудников </h3>
        <p class="text-primary" v-if="factSelected!='Подразделение (факт)'"> {{factSelected}}</p>
        <p class="text-primary" v-if="staffSelected!='Подразделение (штат)'"> {{staffSelected}}</p>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item employee" 
                :class="{ active: index == currentIndex }"
                v-for="(employee, index) in employees"
                :key="index"
                @click="setActiveEmployee(employee,index)">
                {{ employee.name }} <sub>{{employee.position.position.split('.')[0]}}</sub>
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-4 currentEmpl">
            <div v-if="currentEmployee">
                <h3> Сотрудник </h3>
                <img v-bind:src="avatarImage" alt="Фото" class="avatar mb-3 img-thumbnail">
                <div>
                    <label><strong>ФИО:</strong></label> {{ currentEmployee.name }}
                </div>
                <div>
                    <label><strong>Должность:</strong></label> {{ currentEmployee.position!=null?currentEmployee.position.position.split('.')[0]:'' }}
                </div>
                <div>
                    <label><strong>ШЕ:</strong></label> {{ currentEmployee.position!=null?currentEmployee.position.position:'' }}
                </div>
                <div>
                    <label><strong>Подразделение (факт):</strong></label> 
                    {{ currentEmployee.factDepartment!=null & currentEmployee.factDepartment.division!=null? currentEmployee.factDepartment.division.division:'' }}
                    {{ currentEmployee.factDepartment!=null & currentEmployee.factDepartment.groupe!=null? '/ '+currentEmployee.factDepartment.groupe.groupe:'' }}
                    {{ currentEmployee.factDepartment!=null & currentEmployee.factDepartment.functionGroup!=null? '/ '+currentEmployee.factDepartment.functionGroup.functionGroup:'' }}

                </div>
                <div>
                    <label><strong>Подразделение (по штату):</strong></label> 
                    {{ currentEmployee.staffDepartment!=null & currentEmployee.staffDepartment.division!=null? currentEmployee.staffDepartment.division.division:'' }}
                    {{ currentEmployee.staffDepartment!=null & currentEmployee.staffDepartment.groupe!=null? '/ '+currentEmployee.staffDepartment.groupe.groupe:'' }}
                    {{ currentEmployee.staffDepartment!=null & currentEmployee.staffDepartment.functionGroup!=null? '/ '+currentEmployee.staffDepartment.functionGroup.functionGroup:'' }}
                </div>
                <div>
                    <label><strong>Мобильный телефон:</strong></label> {{ currentEmployee.mobilePhone }}
                </div>
                <div>
                    <label><strong>Местный телефон:</strong></label> {{ currentEmployee.localPhone }}
                </div>
                <div>
                    <label><strong>Логин:</strong></label> {{ currentEmployee.login }}
                </div>
                <div>
                    <label><strong>E-mail:</strong></label> <a :href= "`mailto:${ currentEmployee.email }`">{{ currentEmployee.email }}</a>
                </div>
                <div>
                    <label><strong>Табельный номер:</strong></label> {{ currentEmployee.employeeId }}
                </div>
                <div>
                    <label><strong>Дата рождения:</strong></label> {{ currentEmployee.birthday!=null?currentEmployee.birthday.split('-').reverse().join('.'):'' }}
                </div>
                <div>
                    <label><strong>Шкафчик: </strong></label> {{ wardrobes!=null? wardrobes.map(wardrobe=>wardrobe.number).join(', '):'' }}
                </div>
                <div>
                    <label><strong>Автомобиль:</strong></label> 
                    {{ currentEmployee.car!=null? currentEmployee.car.carNumber:'' }}
                    {{ currentEmployee.car!=null? ', '+currentEmployee.car.carModel.carModel:'' }}
                    {{ currentEmployee.car!=null && currentEmployee.car.carParking!=null? ', Место стоянки: '+currentEmployee.car.carParking.parkingName:'' }}
                    {{ currentEmployee.car!=null? ', ***Комментарий: '+currentEmployee.car.carComment:'' }}
                </div>
                <div v-if="currentEmployee.employeeComment!=null && currentEmployee.employeeComment.length!=0">
                    <label><strong>Комментарий:</strong></label> {{ currentEmployee.employeeComment }}
                </div>
                
                <div>
                    <label><strong>Приборы:</strong></label> <button v-if="devices.length!=0" @click="showDevices" class="badge rounded-pill bg-info border-0">показать</button>
                </div>
                <div id="myModal1" class="modal">
                    <div class="modal-content">
                      <span @click="hideDevices" class="text-end close">&times;</span>
                      <span class="text-center h4 text-primary">Приборы</span>
                        <table class="mt-3 mb-3">
                          <tr>
                            <th style="width:16%">Тип</th><th style="width:14%">Наименование</th><th style="width:12%">Номер s/n</th>
                            <th style="width:14%">Комментарий</th><th style="width:12%">Номер бухучета</th>
                            <th style="width:13%">Место хранения</th><th style="width:8%">Подлежит поверке</th><th style="width:11%">Находится в поверке</th>
                          </tr>
                          <tr v-for="(device,index) in devices" key="index">
                            <td style="width:16%;font-weight: bold;">{{device.deviceType!=null? device.deviceType.deviceTypeName : ''}}</td>
                            <td style="width:14%">{{device.deviceName!=null? device.deviceName.deviceName: '' }}</td>
                            <td style="width:12%">{{device.deviceNumber!=null? device.deviceNumber: '' }}</td>
                            <td style="width:14%">{{device.deviceComment!=null? device.deviceComment: '' }}</td>
                            <td style="width:12%">{{device.deviceAccounting!=null? device.deviceAccounting: '' }}</td>
                            <td style="width:13%">{{device.storePlace!=null? device.storePlace: '' }}</td>
                            <td style="width:8%" :class="{'text-success fw-bold':device.verificationNeed==true}">{{device.verificationNeed==true? 'да': 'нет' }}</td>
                            <td style="width:11%">
                            <p :class="{'text-danger fw-bold':device.inVerification==true}"> {{device.inVerification==true? 'да': 'нет' }} </p>
                            <p>{{ device.dateMoving!=null? 'с '+device.dateMoving.split('-').reverse().join('.'):''}}</p>
                            </td>
                           </tr> 
                        </table>
                    </div>
                </div>
                
                <div>
                    <label><strong>Инструменты:</strong></label> <button v-if="tools.length!=0" @click="showTools" class="badge rounded-pill bg-info border-0">показать</button>
                </div>
                <div id="myModal2" class="modal">
                    <div class="modal-content">
                      <span @click="hideTools" class="text-end close">&times;</span>
                      <span class="text-center h4 text-primary">Инструменты</span>
                        <table class="mt-3 mb-3">
                          <tr>
                            <th style="width:16%">Тип</th><th style="width:16%">Наименование</th><th style="width:11%">Номер s/n</th>
                            <th style="width:16%">Комментарий</th><th style="width:11%">Номер бухучета</th>
                            <th style="width:16%">Место хранения</th><th style="width:14%">Временно передан</th>
                          </tr>
                          <tr v-for="(tool,index) in tools" key="index">
                            <td style="width:16%;font-weight: bold;">{{tool.toolType!=null? tool.toolType.toolTypeName : ''}}</td>
                            <td style="width:16%">{{tool.toolName!=null? tool.toolName.toolName: '' }}</td>
                            <td style="width:11%">{{tool.toolNumber!=null? tool.toolNumber: '' }}</td>
                            <td style="width:16%">{{tool.toolComment!=null? tool.toolComment: '' }}</td>
                            <td style="width:11%">{{tool.toolAccounting!=null? tool.toolAccounting: '' }}</td>
                            <td style="width:16%">{{tool.storePlace!=null? tool.storePlace: '' }}</td>
                            <td style="width:14%">
                            <p :class="{'text-danger fw-bold':tool.inMoving==true}"> {{tool.inMoving==true? 'да': 'нет' }} </p>
                            <p>{{ tool.dateMoving!=null? 'с '+tool.dateMoving.split('-').reverse().join('.'):''}}</p>
                            <p>{{ tool.commentMoving!=null? tool.commentMoving :'' }}</p>
                            </td>
                           </tr> 
                        </table>
                    </div>
                </div>

                <div>
                    <label><strong>Удостоверения:</strong></label> <button v-if="currentEmployee.sertificates.length!=0" @click="showSertificates" class="badge rounded-pill bg-info border-0">показать</button>
                </div>
                <div id="myModal3" class="modal">
                    <div class="modal-content">
                      <span @click="hideSertificates" class="text-end close">&times;</span>
                      <span class="text-center h4 text-primary">Удостоверения</span>
                        <table class="mt-3 mb-3">
                          <tr>
                            <th style="width:18%">Название</th><th style="width:12%">Номер</th><th style="width:11%">Дата выдачи</th>
                            <th style="width:27%">Группа допуска</th><th style="width:11%">Действителен до</th>
                          </tr>
                          <tr v-for="(sertificate,index) in sertificates" key="index">
                            <td style="width:18%;font-weight: bold;">{{sertificate.sertificateName!=null? sertificate.sertificateName.sertificateName : ''}}</td>
                            <td style="width:12%">{{sertificate.sertificateNumber!=null? sertificate.sertificateNumber: '' }}</td>
                            <td style="width:11%">{{sertificate.issueDate!=null? sertificate.issueDate.split('-').reverse().join('.') : '' }}</td>
                            <td style="width:27%">{{sertificate.approvalGruppa!=null? sertificate.approvalGruppa.approvalGruppa : '' }}</td>
                            <td style="width:11%" :class="{'text-bg-warning':(new Date(sertificate.expirationDate)-new Date())<3888000000,
                            'text-bg-danger':new Date(sertificate.expirationDate)<new Date(),
                            'text-bg-success':new Date(sertificate.expirationDate)>new Date()}">{{sertificate.expirationDate!=null? sertificate.expirationDate.split('-').reverse().join('.') : '' }}</td>
                           </tr> 
                        </table>
                    </div>
                </div>
                
                <div v-if="showAdminBoard || showSuperAdminBoard" class="mt-3">
                <RouterLink :to="'/employees/'+currentEmployee.id" class="badge rounded-pill bg-info edit">Редактировать</RouterLink>
                <RouterLink :to="'/avatars/'+currentEmployee.id" class="badge rounded-pill bg-success ms-3 sertif">Аватарка</RouterLink>
                <button @click="deleteEmployee" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button><br>
                <RouterLink :to="'/sertificates/'+currentEmployee.id" class="badge rounded-pill bg-warning mt-3 sertif">Удостоверения</RouterLink>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите сотрудника...</p>
            </div>

        </div>
        <div class="col-md-3 text-end">
            <div class="col-md-12">
            <h5 class="text-danger">Дни Рождения</h5>
                <h6>В этом месяце</h6>
                <ul>
                <li v-for="(birthdayBoy, index) in birthdayBoys" :key="index" class="listyle" :class="{'text-danger':new Date(birthdayBoy.birthday).getMonth()==new Date().getMonth() && new Date(birthdayBoy.birthday).getDate()==new Date().getDate()}">
                {{ birthdayBoy.name.split(' ')[0]}} {{ birthdayBoy.name.split(' ')[1]}} {{ birthdayBoy.birthday.split('-').reverse().join('.').slice(0,5)}}
                </li>
                </ul>
                <h6>В следующем месяце</h6>
                <ul>
                <li v-for="(nextMonthBirthdayBoy, index) in nextMonthBirthdayBoys" :key="index" class="listyle">
                {{ nextMonthBirthdayBoy.name.split(' ')[0]}} {{ nextMonthBirthdayBoy.name.split(' ')[1]}} {{ nextMonthBirthdayBoy.birthday.split('-').reverse().join('.').slice(0,5)}}
                </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import EmployeesDataService from '../services/EmployeesDataService';
import DepartmentsDataService from '../services/DepartmentsDataService';
import SertificatesDataService from '../services/SertificatesDataService';
import DeviceDataService from '../services/DeviceDataService';
import ToolDataService from '../services/ToolDataService';
import WardrobesDataService from '../services/WardrobesDataService'
//import AvatarsDataService from '../services/AvatarsDataService';
import EventBus from "../common/EventBus"

export default{
    name: "employees-list",
    data(){
        return{
            employees:[],
            currentEmployee:null,
            currentIndex:-1,
            filter:"",
            factSelected:"Подразделение (факт)",
            staffSelected:"Подразделение (штат)",
            departments:[],
            sertificates:[],
            devices:[],
            tools:[],
            wardrobes:[],
            avatarImage:''
        };
    },
    computed:{
        birthdayBoys(){
            return this.employees.filter((e)=> e.birthday!=null).filter((e) => new Date(e.birthday).getMonth()==new Date().getMonth()).sort((a,b)=>new Date(a.birthday).getDate()-new Date(b.birthday).getDate());
        },
        nextMonthBirthdayBoys(){
            return this.employees.filter((e)=> e.birthday!=null).filter((e) => new Date(e.birthday).getMonth()==new Date().getMonth()+1).sort((a,b)=>new Date(a.birthday).getDate()-new Date(b.birthday).getDate());
        },
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
        }
    },

    methods:{
        retrieveEmployees(){
            EmployeesDataService.getAll().
            then(response=>{
                this.employees=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        refreshList(){
            this.retrieveEmployees();
            this.currentEmployee = null;
            this.currentIndex = -1;
            this.filter="";
            this.factSelected="Подразделение (факт)";
            this.staffSelected="Подразделение (штат)";
        },
        deleteEmployee() {
            let isDeleteEmployee=confirm("Вы точно хотите удалить сотрудника?\nОтменить действие будет нельзя!");
            if(isDeleteEmployee===true){
            EmployeesDataService.delete(this.currentEmployee.id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка! Что-то пошло не так!");}
            })
            .catch(e => {console.log(e);});}
        },
        setActiveEmployee(employee,index){
            this.currentEmployee = employee;
            this.currentIndex = employee ? index : -1;
            SertificatesDataService.getByEmployeeId(this.currentEmployee.id)
            .then(response => {
                this.sertificates = response.data;
                console.log(response.data)})
                .catch(e => {console.log(e);});
            DeviceDataService.getByEmployeeId(this.currentEmployee.id)
            .then(response => {
                this.devices = response.data;
                console.log(response.data)})
                .catch(e => {console.log(e);});
            ToolDataService.getByEmployeeId(this.currentEmployee.id)
            .then(response => {
                this.tools = response.data;
                console.log(response.data)})
                .catch(e => {console.log(e);});
            WardrobesDataService.getByEmployeeId(this.currentEmployee.id)
            .then(response => {
                this.wardrobes = response.data;
                console.log(response.data)})
                .catch(e => {console.log(e);});    
            this.getAvatarByEmployeeId(this.currentEmployee.id)            
        },
        findByNameMobilePosition(){
            EmployeesDataService.findByNameMobilePosition(this.filter).
            then(response=>{
                this.employees=response.data;
                this.currentEmployee = null;
                this.currentIndex = -1;
                this.factSelected="Подразделение (факт)";
                this.staffSelected="Подразделение (штат)";
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        findByFactDepartment (){
            EmployeesDataService.findByFactDivisionOrGroupeOrFunctionGroupOrderByNameAsc(this.factSelected).
            then(response=>{
                this.employees=response.data;
                this.currentEmployee = null;
                this.currentIndex = -1;
                this.staffSelected="Подразделение (штат)";
                console.log(response.data);
                })
                .catch(e=>{console.log(e)});
        },
        findByStaffDepartment (){
            EmployeesDataService.findByStaffDivisionOrGroupeOrFunctionGroupOrderByNameAsc(this.staffSelected).
            then(response=>{
                this.employees=response.data;
                this.currentEmployee = null;
                this.currentIndex = -1;
                this.factSelected="Подразделение (факт)";
                console.log(response.data);
                })
                .catch(e=>{console.log(e)});
        },
        retrieveDepartments(){
            DepartmentsDataService.getAll().
            then(response=>{
                this.departments=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getAvatarByEmployeeId(id){
        this.avatarImage=`http://10.232.3.49:8083/api/v1/avatars/${id}`
        },
        showDevices(){
            var modal = document.getElementById("myModal1");
            modal.style.display = "block";
        },
        hideDevices(){
            var modal = document.getElementById("myModal1");
            modal.style.display = "none";
        },
        showTools(){
            var modal = document.getElementById("myModal2");
            modal.style.display = "block";
        },
        hideTools(){
            var modal = document.getElementById("myModal2");
            modal.style.display = "none";
        },
        showSertificates(){
            var modal = document.getElementById("myModal3");
            modal.style.display = "block";
        },
        hideSertificates(){
            var modal = document.getElementById("myModal3");
            modal.style.display = "none";
        }
        },       

    mounted(){
            this.retrieveEmployees();
            this.retrieveDepartments()
        }
};
</script>

<style>
.edit{
    margin-top:10px;
    text-decoration:none
}
.delete,.sertif{
    text-decoration: none
}
.employee{
    cursor:pointer
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
.inputform{
    width:450px;
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
.customselect{
    border:none;
    width:215px
}
.listyle{
    list-style-type: none;
}
.avatar{
    width: 200px;
    height: 200px;
    transition: transform .2s;
}
.avatar:hover{
    transform: scale(2.0);
    z-index:10
}
.currentEmpl{
    z-index:10
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 12% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.6s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}

/* The Close Button */
.close {
  color: red;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

th, td {
  border: 1px solid black;
}
th, td {
  text-align: center;
}
th {
    background-color: #96D4D4;
}
</style>


