<template>
    <div class="list row">
        <div class="col-md-4">
            <h3> Список сотрудников </h3>
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item" 
                :class="{ active: index == currentIndex }"
                v-for="(employee, index) in employees"
                :key="index"
                @click="setActiveEmployee(employee,index)">
                {{ employee.name }}
                </li>
            </ul>
        </div>
        <div class="col-md-8">
            <div v-if="currentEmployee">
                <h3> Сотрудник </h3>
                <div>
                    <label><strong>ФИО:</strong></label> {{ currentEmployee.name }}
                </div>
                <div>
                    <label><strong>Должность:</strong></label> {{ currentEmployee.position }}
                </div>
                <div>
                    <label><strong>Подразделение (факт):</strong></label> {{ currentEmployee.fuctDeparrtment }}
                </div>
                <div>
                    <label><strong>Подразделение (по штату):</strong></label> {{ currentEmployee.staffDepartment }}
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
                    <label><strong>E-mail:</strong></label> {{ currentEmployee.email }}
                </div>
                <div>
                    <label><strong>Табельный номер:</strong></label> {{ currentEmployee.employeeId }}
                </div>
                <div>
                    <label><strong>Дата рождения:</strong></label> {{ currentEmployee.birthday }}
                </div>
                <div>
                    <label><strong>Автомобиль:</strong></label> {{ currentEmployee.car }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentEmployee.employeeComment }}
                </div>

                <RouterLink :to="'/employees/'+currentEmployee.id" class="badge rounded-pill bg-info">Редактировать</RouterLink>

            </div>
            <div v-else>
                <br>
                <p>"Нажмите" на сотрудника...</p>
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
            currentIndex:-1
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
        },
        setActiveEmployee(employee,index){
            this.currentEmployee = employee;
            this.currentIndex = employee ? index : -1;
        }       
    },
    mounted(){
            this.retrieveEmployees();
        }
};
</script>


