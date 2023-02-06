<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name" class="fw-bold">ФИО сотрудника</label>
          <input type="text" class="form-control mt-1" id="name" required v-model="employee.name" name="name" placeholder="Фамилия Имя Отчество"/>
        </div>

        <div class="form-group mt-3">
          <label for="mobilePhone" class="fw-bold">Мобильный телефон</label>
          <input type="text" class="form-control mt-1" id="mobilePhone" required v-model="employee.mobilePhone" name="mobilePhone" placeholder="Введите номер в формате: +79112223344"/>
        </div>

        <div class="form-group mt-3">
          <label for="birthday" class="fw-bold">Дата рождения</label>
          <input type="date" class="form-control mt-1" id="birthday" required v-model="employee.birthday" name="birthday"/>
        </div>

        <div class="form-group mt-3">
          <label for="localPhone" class="fw-bold">Местный телефон</label>
          <input type="number" class="form-control mt-1" id="localPhone" min="1" v-model="employee.localPhone" name="localPhone"/>
        </div>

        <div class="form-group mt-3">
          <label for="employeeId" class="fw-bold">Табельный номер</label>
          <input type="number" class="form-control mt-1" id="employeeId" min="1" required v-model="employee.employeeId" name="employeeId"/>
        </div>

        <div class="form-group mt-3">
          <label for="login" class="fw-bold">Логин</label>
          <input type="text" class="form-control mt-1" id="login" required v-model="employee.login" name="login"/>
        </div>

        <div class="form-group mt-3">
          <label for="email" class="fw-bold">E-mail</label>
          <input type="email" class="form-control mt-1" id="email" required v-model="employee.email" name="email"/>
        </div>

        <div class="form-group mt-3">
          <label for="employeeComment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="employeeComment" v-model="employee.employeeComment" name="employeeComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="factDepartment" class="fw-bold">Подразделение (факт):</label>
          <select class="form-select mt-1" id="factDepartment" name="factDepartment" v-model="employee.factDepartmentSelected" required>
           <option v-for="(department,index) in departments" :key="index" :value="department">
            {{ department.division!=null? department.division.division:'' }}
            {{ department.groupe!=null? '/'+department.groupe.groupe:'' }}
            {{ department.functionGroup!=null? '/'+department.functionGroup.functionGroup:'' }}
           </option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="staffDepartment" class="fw-bold">Подразделение (по штату):</label>
          <select class="form-select mt-1" id="staffDepartment" name="staffDepartment" v-model="employee.staffDepartmentSelected" required>
           <option v-for="(department,index) in departments" :key="index" :value="department">
            {{ department.division!=null? department.division.division:'' }}
            {{ department.groupe!=null? '/'+department.groupe.groupe:'' }}
            {{ department.functionGroup!=null? '/'+department.functionGroup.functionGroup:'' }}
           </option>
          </select>
        </div>
  
        <div class="form-group mt-3">
          <label for="position" class="fw-bold">Должность</label>
          <select class="form-select mt-1" id="position" name="position" v-model="employee.positionSelected" required>
           <option v-for="(position,index) in positions" :key="index" :value="position">{{position.position}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="car" class="fw-bold">Автомобиль</label>
          <select class="form-select mt-1" id="car" name="car" v-model="employee.carSelected">
           <option v-for="(car,index) in cars" :key="index" :value="car">{{car.carNumber}}</option>
          </select>
        </div>
  
        <button @click="saveEmployee" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newEmployee">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import EmployeesDataService from '../services/EmployeesDataService'
  import CarsDataService from '../services/CarsDataService'
  import PositionsDataService from '../services/PositionsDataService'
  import DepartmentsDataService from '../services/DepartmentsDataService'
  
  export default {
    name: "add-employee",
    data() {
      return {
        employee: {
          id: null,
          name: "",
          mobilePhone:"",
          birthday:"",
          localPhone:"",
          employeeId:"",
          login:"",
          email:"",
          employeeComment:"",
          factDepartmentSelected:"",
          staffDepartmentSelected:"",
          carSelected:null,
          positionSelected: ""
        },
        submitted: false,
        positions:[],
        cars:[],
        departments:[]
      };
    },
    methods: {
      saveEmployee() {
        var data = {
          name: this.employee.name,
          mobilePhone: this.employee.mobilePhone,
          birthday: this.employee.birthday,
          localPhone: this.employee.localPhone,
          employeeId: this.employee.employeeId,
          login: this.employee.login,
          email: this.employee.email,
          employeeComment: this.employee.employeeComment,
          factDepartment: this.employee.factDepartmentSelected,
          staffDepartment: this.employee.staffDepartmentSelected,
          car: this.employee.carSelected,
          position: this.employee.positionSelected
        };
  
        EmployeesDataService.create(data)
          .then(response => {
            this.employee.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newEmployee() {
        this.submitted = false;
        this.employee = {};
      },

      retrievePositions(){
            PositionsDataService.getAll().
            then(response=>{
                this.positions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          },

          retrieveCars(){
            CarsDataService.getAll().
            then(response=>{
                var carz=response.data;
                this.cars = carz.filter(e=>e.employee==null).map(c => {
                var newcar = {id: c.id, carNumber : c.carNumber, carComment : c.carComment, carModel: c.carModel};
                return newcar;});
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
          }
    },
    mounted(){
      this.retrievePositions();
      this.retrieveCars();
      this.retrieveDepartments()
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>
  
 