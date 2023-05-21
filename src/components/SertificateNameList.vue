<template>
    <div class="list row">
        <div class="col-md-8">
        <h3> Список типов удостоверений </h3>
        <label for="newsertificatename" class="fw-bold fst-italic me-3">Новый тип</label>
        <input id="newsertificatename" name="newsertificatename" class="newinputwidth" v-model="newsertificatename"/>
        <button @click="createSertificateName()" class="badge rounded-pill bg-info ms-3 border-0 delete">Создать</button>
        <div class="col-md-8 outdiv shadow mt-3">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush">
                <li class="list-group-item car" v-for="(sertificatename, index) in sertificatenames" :key="index">
                <input id="sertificatename" name="sertificatename" class="inputwidth" v-model="sertificatename.sertificateName"/>
                <button @click="editSertificateName(sertificatename.id,sertificatename.sertificateName)" class="badge rounded-pill bg-success ms-3 border-0 delete">Сохранить</button>
                <button @click="deleteSertificateName(sertificatename.id)" class="badge rounded-pill bg-danger ms-3 border-0 delete">Удалить</button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import SertificateNamesDataService from '../services/SertificateNamesDataService'
import EventBus from "../common/EventBus"

export default{
    name: "sertificatenames-list",
    data(){
        return{
            sertificatenames:[],
            newsertificatename:""
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
        retrieveSertificateNames(){
            SertificateNamesDataService.getAll().
            then(response=>{
                this.sertificatenames=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        deleteSertificateName(id) {
            SertificateNamesDataService.delete(id).
            then(response => {
                console.log(response.data);
                this.refreshList();
            },
            error => {
                if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
                if (error.response && error.response.status === 404) {
                    alert("Ошибка!\nЧто-то пошло не так!\nВозможно Вы пытаетесь удалить используемый тип удостоверения!?");}
            })
            .catch(e => {
            console.log(e);});
        },
        editSertificateName(id,sertificatename) {
            var data = {
                sertificateName: sertificatename
            };
            SertificateNamesDataService.update(id, data).
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
        createSertificateName() {
            var data= {
                sertificateName: this.newsertificatename
            };
            SertificateNamesDataService.create(data).
            then(response => {
                console.log(response.data);
                this.refreshList();
                this.newsertificatename=""
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
            this.retrieveSertificateNames()
        }
    },
    mounted(){
            this.retrieveSertificateNames();
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
