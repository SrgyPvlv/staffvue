<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Поиск по ФИО, мобильному, должности" v-model="filter" />
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
                      <option value="Отдел эксплуатации радиоподсистемы">Отдел эксплуатации радиоподсистемы</option>
                      <option value="Аварийно-профилактическая группа">Аварийно-профилактическая группа</option>
                      <option value="ФГ Север">Функциональная группа Север</option>
                      <option value="ФГ Юг">Функциональная группа Юг</option>
                      <option value="ФГ Запад">Функциональная группа Запад</option>
                      <option value="ФГ Восток">Функциональная группа Восток</option>
                      <option value="Группа модернизации и расширения">Группа модернизации и расширения</option>
                      <option value="ФГ эксплуатации локальных радиоподсистем">Функциональная группа эксплуатации локальных радиоподсистем</option>
                      <option value="Группа эксплуатации РРЛ">Группа эксплуатации РРЛ</option>
                      <option value="Группа эксплуатации инфраструктуры объектов радиоподсистемы">Группа эксплуатации инфраструктуры объектов радиоподсистемы</option>
                      </select>
                      </li>
                      <li>
                      <select class="form-select" @change="findByStaffDepartment" v-model="staffSelected">
                      <option disabled style="font-weight: bold">Подразделение (штат)</option>
                      <option value="Отдел эксплуатации радиоподсистемы">Отдел эксплуатации радиоподсистемы</option>
                      <option value="Аварийно-профилактическая группа">Аварийно-профилактическая группа</option>
                      <option value="ФГ Север">Функциональная группа Север</option>
                      <option value="ФГ Юг">Функциональная группа Юг</option>
                      <option value="ФГ Запад">Функциональная группа Запад</option>
                      <option value="ФГ Восток">Функциональная группа Восток</option>
                      <option value="Группа модернизации и расширения">Группа модернизации и расширения</option>
                      <option value="ФГ эксплуатации локальных радиоподсистем">Функциональная группа эксплуатации локальных радиоподсистем</option>
                      <option value="Группа эксплуатации РРЛ">Группа эксплуатации РРЛ</option>
                      <option value="Группа эксплуатации инфраструктуры объектов радиоподсистемы">Группа эксплуатации инфраструктуры объектов радиоподсистемы</option>
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
        <div class="col-md-7">
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
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentEmployee.employeeComment }}
                </div>

                <RouterLink :to="'/employees/'+currentEmployee.id" class="badge rounded-pill bg-info edit">Редактировать</RouterLink>

            </div>
            <div v-else>
                <br>
                <p>Выберите сотрудника...</p>
            </div>

        </div>

    </div>
</template>

<script>
import EmployeesDataService from '../services/EmployeesDataService';

export default{
    name: "employees-list",
    data(){
        return{
            employees:[],
            currentEmployee:null,
            currentIndex:-1,
            filter:"",
            factSelected:"Подразделение (факт)",
            staffSelected:"Подразделение (штат)"
        };
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
        setActiveEmployee(employee,index){
            this.currentEmployee = employee;
            this.currentIndex = employee ? index : -1;
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
        }
        },       

    mounted(){
            this.retrieveEmployees();
        }
};
</script>

<style>
.edit{
    margin-top:10px;
    text-decoration:none
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
</style>


