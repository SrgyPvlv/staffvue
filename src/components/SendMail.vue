<template>
    <div class="list row">

        <div class="col-md-6 ">
        <h3> Список адресатов </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(department, index) in departments" :key="index">
                    <input type="checkbox" class="me-3" :value="department" v-model="checkedDepartments" />
                    {{department.functionGroup!=null? department.functionGroup.functionGroup: department.groupe!=null?department.groupe.groupe: department.division.division}}  
                </li>
                <li class="list-group-item">
                    <input type="checkbox" class="me-3" :value="true" v-model="boss" />
                    начальник отдела
                </li>
                <li class="list-group-item">
                    <input type="checkbox" class="me-3" :value="true" v-model="head" />
                    руководители групп
                </li>
                <li class="list-group-item">
                    <input type="checkbox" class="me-3" :value="true" v-model="expert" />
                    эксперты
                </li>
            </ul>
            </div>
        </div>
        </div>
    
        <div class="col-md-4">
            <div v-if="checkedDepartments.length!=0 || boss==true || head==true || expert==true">
                <h3> Адресаты </h3>
                <div>
                    <ul>
                      <li  v-for="(checkedDepartment, index) in checkedDepartments" :key="index">
                       {{checkedDepartment.functionGroup!=null? checkedDepartment.functionGroup.functionGroup: checkedDepartment.groupe!=null?checkedDepartment.groupe.groupe: checkedDepartment.division.division}} 
                      </li>
                      <li  v-if="boss == true">
                        начальник отдела 
                      </li>
                      <li  v-if="head == true">
                        руководители групп 
                      </li>
                      <li  v-if="expert == true">
                        эксперты 
                      </li>
                    </ul>   
                </div>

                <div>
                <button @click="sendMail" class="btn btn-outline-success mt-2">Отправить</button>
                </div>
                
                <div v-if="loadMails" class="mt-5">
                <button class="btn btn-outline-primary btn-lg">
                  <span class="spinner-border spinner-border-sm"></span>
                  Загружается...
                </button>
                </div>   
            </div>

            <div v-else>
                <br>
                <p>Выберите адресатов...</p>
            </div>
           
        </div>
    </div>
</template>

<script>
import DepartmentsDataService from '../services/DepartmentsDataService';
import PositionsDataService from '../services/PositionsDataService';
import EmployeesDataService from '../services/EmployeesDataService';

export default{
    name: "mail-send",
    data(){
        return{
            departments:[],
            checkedDepartments:[],
            positions:[],
            bossPositions:[],
            headPositions:[],
            expertPositions:[],
            employees:[],
            loadMails: false,
            boss: false,
            head: false,
            expert: false    
        };
    },
    
    computed:{
        newpositions(){
            if(this.boss){ this.bossPositions = this.positions.filter(e=>e.position.includes('начальник отдела')).map(e=>e.position); } else {this.bossPositions = [];};
            if(this.head){ this.headPositions = this.positions.filter(e=>e.position.includes('руководитель группы')).map(e=>e.position); } else {this.headPositions = [];};
            if(this.expert){ this.expertPositions = this.positions.filter(e=>e.position.includes('эксперт')).map(e=>e.position); } else {this.expertPositions = [];};
            return [...this.bossPositions, ...this.headPositions, ...this.expertPositions];
        }
    },

    methods:{
        refreshList(){
            this.departments="";
            this.checkedDepartments="";
            this.positions="";
            this.bossPositions="",
            this.headPositions="",
            this.expertPositions="",
            this.retrieveDepartments();
            this.retrievePositions();
        },
        retrieveDepartments(){
            DepartmentsDataService.getAll().
            then(response=>{
                this.departments=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        retrievePositions(){
            PositionsDataService.getAll().
            then(response=>{
                this.positions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        selectedEmployees(){
            var newCheckedDepartments=this.checkedDepartments.map(e => e.functionGroup!=null? e.functionGroup.functionGroup: e.groupe!=null? e.groupe.groupe: e.division.division );

            EmployeesDataService.findByFactDepartmentOrPositionIn(newCheckedDepartments,this.newpositions).
            then(response =>{
                this.employees=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)})
        },
        redirectTo(){
            var mails=this.employees.map(e => e.email).join(';');
            window.location.href="mailto:" + mails;
        },
        sendMail(){
            this.loadMails=true;
            this.selectedEmployees();
            setTimeout(() => this.redirectTo(), 1500);
            setTimeout(() => (this.loadMails=false), 2500);
        }
        },       

    mounted(){
            this.retrieveDepartments();
            this.retrievePositions()
        }
};
</script>

<style>
.outdiv{
    overflow-y: auto;
    overflow-x: hidden;
    height: 700px;
    position: relative;
}
.indiv{
    position: absolute   
}
input[type=checkbox] {
    width: 18px;
    height: 18px;
    cursor: pointer;
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


