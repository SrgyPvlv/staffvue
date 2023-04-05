<template>
    <div class="list row">

        <div class="col-md-6 ">
        <h3> Список адресатов </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(department, index) in departments" :key="index">
                    {{department.functionGroup!=null? department.functionGroup.functionGroup: department.groupe!=null?department.groupe.groupe: department.division.division}}
                    <input type="checkbox" :value="department" v-model="checkedDepartments" />
                </li>
            </ul>
            </div>
        </div>
        </div>
    
        <div class="col-md-4">
            <div v-if="checkedDepartments.length!=0">
                <h3> Адресаты </h3>
                <div>
                    <ul>
                      <li  v-for="(checkedDepartment, index) in checkedDepartments" :key="index">
                       {{checkedDepartment.functionGroup!=null? checkedDepartment.functionGroup.functionGroup: checkedDepartment.groupe!=null?checkedDepartment.groupe.groupe: checkedDepartment.division.division}} 
                      </li>
                    </ul>   
                </div>

                <div>
                <button @click="sendMail" class="btn btn-outline-success mt-3">Отправить</button>
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
import EventBus from "../common/EventBus"

export default{
    name: "mail-send",
    data(){
        return{
            departments:[],
            checkedDepartments:[]
        };
    },

    methods:{
        refreshList(){
            this.retrieveDepartments();
            this.departments="";
            this.checkedDepartments=""
        },
        retrieveDepartments(){
            DepartmentsDataService.getAll().
            then(response=>{
                this.departments=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        sendMail(){}
        },       

    mounted(){
            this.retrieveDepartments();
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


