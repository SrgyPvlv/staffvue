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
                {{ employee.name }} <sub>{{employee.position.position}}</sub>
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-4">
            <div v-if="currentEmployee">
                <h3> Сотрудник </h3>
                <div>
                    <label><strong>ФИО:</strong></label> {{ currentEmployee.name }}
                </div>
                <div>
                    <label><strong>Должность:</strong></label> {{ currentEmployee.position!=null?currentEmployee.position.position:'' }}
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
                    <label><strong>Автомобиль:</strong></label> 
                    {{ currentEmployee.car!=null? currentEmployee.car.carNumber:'' }}
                    {{ currentEmployee.car!=null? ', '+currentEmployee.car.carModel.carModel:'' }}
                    {{ currentEmployee.car!=null? ', ***Комментарий: '+currentEmployee.car.carComment:'' }}
                </div>
                <div v-if="currentEmployee.employeeComment!=null && currentEmployee.employeeComment.length!=0">
                    <label><strong>Комментарий:</strong></label> {{ currentEmployee.employeeComment }}
                </div>
                <div>
                    <label><strong>Приборы:</strong></label> <button v-if="devices.length!=0" @click="toggle2" class="badge rounded-pill bg-info border-0">{{deviceshow?'скрыть':'показать'}}</button>
                    <ul v-if="deviceshow">
                        <li v-for="(device,index) in devices" key="index">
                        <mark>{{device.deviceType!=null? device.deviceType.deviceTypeName+'. ' : ''}}</mark><br>
                        {{device.deviceName!=null? 'Наименование: '+device.deviceName.deviceName: '' }}<br>
                        {{device.deviceNumber!=null? 'S/n: '+device.deviceNumber: '' }}<br>
                        {{device.deviceComment!=null? 'Комментарий: '+device.deviceComment: '' }}<br v-if="device.deviceComment!=null">
                        Номер бухучета: {{device.deviceAccounting!=null? ' '+device.deviceAccounting: '' }}<br>
                        {{device.storePlace!=null? 'Место хранения: '+device.storePlace: '' }}<br>
                        Подлежит поверке:
                        <span :class="{'text-success fw-bold':device.verificationNeed==true}">{{device.verificationNeed==true? ' да': ' нет' }}</span><br>
                        Находится в поверке:
                        <span :class="{'text-danger fw-bold':device.inVerification==true}"> {{device.inVerification==true? ' да': ' нет' }} </span>
                        <span class="ms-2">{{ device.dateMoving!=null? 'с '+device.dateMoving.split('-').reverse().join('.'):''}}</span>                        
                        </li>
                    </ul>
                </div>
                <div>
                    <label><strong>Инструменты:</strong></label> <button v-if="tools.length!=0" @click="toggle3" class="badge rounded-pill bg-info border-0">{{toolshow?'скрыть':'показать'}}</button>
                    <ul v-if="toolshow">
                        <li v-for="(tool,index) in tools" key="index">
                        <mark>{{tool.toolType!=null? tool.toolType.toolTypeName+'. ' : ''}}</mark><br>
                        {{tool.toolName!=null? 'Наименование: '+tool.toolName.toolName: '' }}<br>
                        {{tool.toolNumber!=null? 'S/n: '+tool.toolNumber: 'S/n:' }}<br>
                        {{tool.toolComment!=null? 'Комментарий: '+tool.toolComment: '' }}<br v-if="tool.toolComment!=null">
                        Номер бухучета: {{tool.toolAccounting!=null? ' '+tool.toolAccounting: '' }}<br>
                        {{tool.storePlace!=null? 'Место хранения: '+tool.storePlace: '' }}                        
                        </li>
                    </ul>
                </div>
                <div>
                    <label><strong>Удостоверения:</strong></label> <button v-if="currentEmployee.sertificates.length!=0" @click="toggle" class="badge rounded-pill bg-info border-0">{{sertshow?'скрыть':'показать'}}</button>
                    <ul v-if="sertshow">
                        <li v-for="(sertificate,index) in sertificates" key="index">
                        <mark>{{sertificate.sertificateName!=null? sertificate.sertificateName.sertificateName+'. ' : ''}}</mark>
                        {{sertificate.sertificateNumber!=null? '№: '+sertificate.sertificateNumber: '' }}
                        {{sertificate.issueDate!=null? 'от '+sertificate.issueDate.split('-').reverse().join('.') : '' }}<br v-if="sertificate.sertificateNumber!=null">
                        {{sertificate.approvalGruppa!=null? 'Группа допуска: '+sertificate.approvalGruppa.approvalGruppa : '' }}<br v-if="sertificate.approvalGruppa!=null">
                        {{sertificate.expirationDate!=null? 'Действительно до: ':''}} 
                        <span :class="{'text-bg-warning':(new Date(sertificate.expirationDate)-new Date())<3888000000,
                        'text-bg-danger':new Date(sertificate.expirationDate)<new Date(),
                        'text-bg-success':new Date(sertificate.expirationDate)>new Date()}">{{sertificate.expirationDate!=null? sertificate.expirationDate.split('-').reverse().join('.') : '' }}</span>
                        </li>
                    </ul>
                </div>
                
                <div v-if="showAdminBoard || showSuperAdminBoard">
                <RouterLink :to="'/employees/'+currentEmployee.id" class="badge rounded-pill bg-info edit">Редактировать</RouterLink>
                <button @click="deleteEmployee" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                <RouterLink :to="'/sertificates/'+currentEmployee.id" class="badge rounded-pill bg-warning ms-3 sertif">Удостоверения</RouterLink>
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
            sertshow:false,
            deviceshow:false,
            toolshow:false
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
        toggle(){
            this.sertshow =! this.sertshow;
        },
        toggle2(){
            this.deviceshow =! this.deviceshow;
        },
        toggle3(){
            this.toolshow =! this.toolshow;
        }
        },       

    mounted(){
            this.retrieveEmployees();
            this.retrieveDepartments();
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
</style>


