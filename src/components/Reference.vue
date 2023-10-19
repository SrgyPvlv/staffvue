<template>
  <div v-if="currentReference" class="edit-form">
    <h4>Ссылка</h4>
    <form class="was-validated">
    <div class="form-group mt-3">
      <label for="name" class="fw-bold">Название</label>
      <input type="text" class="form-control mt-1" id="name" required v-model="currentReference.referenceName" name="name"/>
    </div>

    <div class="form-group mt-3">
      <label for="address" class="fw-bold">Адрес:</label>
      <input class="form-control mt-1" id="address" v-model="currentReference.referenceAddress" name="address"/>
    </div>

    <div class="form-group mt-3">
      <label for="overview" class="fw-bold">Описание:</label>
      <input class="form-control mt-1" id="overview" v-model="currentReference.referenceOverview" name="overview"/>
    </div>

    <div class="form-group mt-3">
      <label for="theme" class="fw-bold">Тема:</label>
      <input class="form-control mt-1" id="theme" v-model="currentReference.referenceTheme" name="theme"/>
    </div>
    </form>

    <div class="mt-3">
    <button @click="updateReference" class="btn btn-outline-success me-3">Обновить</button>
    </div>

    <h5 class="mt-3 text-success">{{ message }}</h5>
  </div>

  <div v-else>
    <br>
    <p>Выберите ссылку...</p>
  </div>
</template>

<script>
import ReferenceDataService from '../services/ReferenceDataService'
import EventBus from "../common/EventBus"

export default {
name: "reference",
data() {
  return {
    currentReference:null,
    message:"",
    references:[]
  };
},
methods: {
    getReference(id) {
    ReferenceDataService.get(id)
    .then(response => {
      this.currentReference = response.data;
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
},

updateReference() {
  var data = {
    referenceName: this.currentReference.referenceName,
    referenceAddress: this.currentReference.referenceAddress,
    referenceOverview: this.currentReference.referenceOverview,
    referenceTheme: this.currentReference.referenceTheme
  };
  ReferenceDataService.update(this.currentReference.id, data)
    .then(response => {
      console.log(response.data);
      this.message = 'Данные по ссылке успешно обновлены!';
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
}
},
mounted(){
  this.message = '';
  this.getReference(this.$route.params.id);
}
};
</script>

<style>
.edit-form {
max-width: 450px;
}
</style>