<template>
    <div class="list row">
        <h3> Список сертификатов </h3>
        <p class="fw-bold fst-italic mb-3">Новое удостоверение</p>        

        <div class="list-group list-group-horizontal list-group-flush"> 
        <div class="list-group-item noborder">
           <select class="form-select optwidth" id="newSertificateName" name="newSertificateName" v-model="newSertificateName" required>
             <option selected disabled value="" class="fst-italic">Тип удостоверения</option>
             <option :value="null">Нет</option>
             <option v-for="(sertificateName, index) in sertificateNames" :key="index" :value="sertificateName" class="noborder">
              {{ sertificateName.sertificateName }}
             </option>
            </select>
        </div>
        <div class="list-group-item noborder">
          <input type="text" id="newSertificateNumber" name="newSertificateNumber" class="newSertificateNumber" placeholder="Номер удостоверения" v-model="newSertificateNumber"/>
        </div>
        <div class="list-group-item noborder">
           <select class="form-select optwidth" id="newApprovalGruppa" name="newApprovalGruppa" v-model="newApprovalGruppa" required>
             <option selected disabled value="" class="fst-italic">Группа безопасности</option>
             <option :value="null">Нет</option>
             <option v-for="(approvalGruppa, index) in approvalGruppas" :key="index" :value="approvalGruppa">
               {{ approvalGruppa.approvalGruppa }}
             </option>
           </select>
        </div>
        <div class="list-group-item noborder ms-3">
          <label for="newIssueDate" class="fw-bold fst-italic mb-1">Дата выдачи</label><br>
          <input type="date" id="newIssueDate" name="newIssueDate" class="newIssueDate" v-model="newIssueDate"/>
        </div>
        <div class="list-group-item noborder">
          <label for="newExpirationDate" class="fw-bold fst-italic mb-1">Дата окончания</label><br>
          <input type="date" id="newExpirationDate" name="newExpirationDate" class="newExpirationDate" v-model="newExpirationDate"/>
        </div>
        <div class="list-group-item noborder">
        <button @click="createSertificate()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        </div>
        </div>

        <div class="col-md-12 outdiv shadow mt-3">
          <div class="col-md-12 indiv">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="(sertificate,index) in sertificates" :key="index">
            <ul class="list-group list-group-horizontal list-group-flush">
            <li class="list-group-item noborder">
                <select class="form-select noborder optwidth" id="sertificateName" name="sertificateName" v-model="sertificate.sertificateName" required>
                 <option v-for="(sertificateName, index) in sertificateNames" :key="index" :value="sertificateName">
                   {{ sertificateName.sertificateName }}
                 </option>
                </select>
            </li>
            <li class="list-group-item noborder">
              <input type="text" id="sertificateNumber" name="sertificateNumber" class="sertificateNumber" v-model="sertificate.sertificateNumber"/>
            </li>
            <li class="list-group-item noborder">
                <select class="form-select noborder optwidth" id="approvalGruppa" name="approvalGruppa" v-model="sertificate.approvalGruppa" required>
                  <option :value="null">Нет</option>
                  <option v-for="(approvalGruppa, index) in approvalGruppas" :key="index" :value="approvalGruppa">
                   {{ approvalGruppa.approvalGruppa }}
                 </option>
                </select>
            </li>
            <li class="list-group-item noborder">
              <input type="date" id="issueDate" name="issueDate" class="issueDate" v-model="sertificate.issueDate"/>
            </li>
            <li class="list-group-item noborder">
              <input type="date" id="expirationDate" name="expirationDate" class="expirationDate" v-model="sertificate.expirationDate"/>
            </li>
            <li class="list-group-item noborder">
                <button @click="updateSertificate(sertificate.id,sertificate.sertificateName,sertificate.sertificateNumber,sertificate.approvalGruppa,sertificate.issueDate,sertificate.expirationDate)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteSertificate(sertificate.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
            </li>
            </ul>
            </li>
          </ul>
          </div>
        </div>
        
    </div>
</template>

<script>
import SertificatesDataService from '../services/SertificatesDataService'
import SertificateNamesDataService from '../services/SertificateNamesDataService'
import ApprovalGruppasDataService from '../services/ApprovalGruppasDataService'
import EmployeesDataService from '../services/EmployeesDataService'
import EventBus from "../common/EventBus"

export default {
  name: "sertificates",
  data() {
    return {
      sertificates:[],
      sertificateNames:[],
      approvalGruppas:[],
      newSertificateName:"",
      newSertificateNumber:"",
      newApprovalGruppa:"",
      newIssueDate:"",
      newExpirationDate:"",
      currentEmployee:null,
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

  methods: {
      getSertificatesByEmployeesId(id) {
        SertificatesDataService.getByEmployeeId(id)
      .then(response => {
        this.sertificates = response.data;
        console.log(response.data)
      })
      .catch(e => {console.log(e);});
  },
  updateSertificate(id,sertificateName,sertificateNumber,approvalGruppa,issueDate,expirationDate) {
    var data= {
              sertificateName: sertificateName,
              sertificateNumber: sertificateNumber,
              approvalGruppa: approvalGruppa,
              issueDate: issueDate,
              expirationDate: expirationDate,
              employee: this.currentEmployee
            };
    SertificatesDataService.update(id, data)
      .then(response => {
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
        console.log(e);
      });
  },
  deleteSertificate(id) {
    SertificatesDataService.delete(id).
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
            console.log(e);});
        },
  createSertificate() {
            var data= {
              sertificateName: this.newSertificateName,
              sertificateNumber: this.newSertificateNumber,
              approvalGruppa: this.newApprovalGruppa,
              issueDate: this.newIssueDate,
              expirationDate: this.newExpirationDate,
              employee: this.currentEmployee
            };
            SertificatesDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newSertificateName="",
                this.newSertificateNumber="",
                this.newApprovalGruppa="",
                this.newIssueDate="",
                this.newExpirationDate=""
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
  retrieveSertificateNames(){
    SertificateNamesDataService.getAll().
            then(response=>{
                this.sertificateNames=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
  },
  retrieveApprovalGruppas(){
    ApprovalGruppasDataService.getAll().
            then(response=>{
                this.approvalGruppas=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
  },
  retrieveCurrentEmployee(id){
    EmployeesDataService.get(id)
    .then(response => {
        var currentEmployeeResponse = response.data;
        var currentEmployeeCar=null;
        if(currentEmployeeResponse.car!=null){
        currentEmployeeCar = {id: currentEmployeeResponse.car.id, carNumber : currentEmployeeResponse.car.carNumber, carComment : currentEmployeeResponse.car.carComment, carModel: currentEmployeeResponse.car.carModel};};
        this.currentEmployee = {
          id: currentEmployeeResponse.id,
          name: currentEmployeeResponse.name,
          mobilePhone: currentEmployeeResponse.mobilePhone,
          birthday: currentEmployeeResponse.birthday,
          localPhone: currentEmployeeResponse.localPhone,
          employeeId: currentEmployeeResponse.employeeId,
          login: currentEmployeeResponse.login,
          email: currentEmployeeResponse.email,
          employeeComment: currentEmployeeResponse.employeeComment,
          factDepartment: currentEmployeeResponse.factDepartment,
          staffDepartment: currentEmployeeResponse.staffDepartment,
          car: currentEmployeeCar,
          position: currentEmployeeResponse.position
        };
        console.log(response.data)
      })
      .catch(e=>{console.log(e)});
  },
  refreshList(){
    this.getSertificatesByEmployeesId(this.$route.params.id)
  }
  },

  mounted(){
    this.getSertificatesByEmployeesId(this.$route.params.id);
    this.retrieveSertificateNames();
    this.retrieveApprovalGruppas();
    this.retrieveCurrentEmployee(this.$route.params.id)
  }
}
</script>

<style>
.edit-form {
max-width: 450px;
}
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
.optwidth{
    width:225px
}
.noborder{
    border:0px
}
.newSertificateNumber,.sertificateNumber{
  width:180px
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

