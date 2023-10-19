<template>
    <div class="submit-form was-validated">
      <div v-if="!submitted">

        <div class="form-group">
          <label for="referencename" class="fw-bold">Название ссылки</label>
          <input type="text" class="form-control mt-1" id="referencename" name="referencename" required v-model="reference.referenceName"/>
        </div>

        <div class="form-group">
          <label for="referenceaddress" class="fw-bold">Адресс ссылки</label>
          <input type="text" class="form-control mt-1" id="referenceaddress" name="referenceaddress" required v-model="reference.referenceAddress"/>
        </div>

        <div class="form-group">
          <label for="referenceoverview" class="fw-bold">Описание ссылки</label>
          <input type="text" class="form-control mt-1" id="referenceoverview" name="referenceoverview" required v-model="reference.referenceOverview"/>
        </div>

        <div class="form-group">
          <label for="referencetheme" class="fw-bold">Тема ссылки</label>
          <input type="text" class="form-control mt-1" id="referencetheme" name="referencetheme" v-model="reference.referenceTheme"/>
        </div>
  
        <button @click="saveReference" class="btn btn-success mt-3">Сохранить</button>
      </div>
  
      <div v-else>
        <h4>Данные успешно сохранены!</h4>
        <button class="btn btn-outline-success mt-3" @click="newReference">Добавить еще</button>
      </div>
    </div>
  </template>
  
  <script>
  import ReferenceDataService from '../services/ReferenceDataService'
  import EventBus from "../common/EventBus"
  
  export default {
    name: "add-reference",
    data() {
      return {
        reference: {
          id: null,
          referenceName:"",
          referenceAddress:"",
          referenceOverview:"",
          referenceTheme:""
        },
        submitted: false
      };
    },
    methods: {
        saveReference() {
        var data = {
            referenceName: this.reference.referenceName,
            referenceAddress: this.reference.referenceAddress,
            referenceOverview: this.reference.referenceOverview,
            referenceTheme: this.reference.referenceTheme
        };
  
        ReferenceDataService.create(data)
          .then(response => {
            this.reference.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          },
          error => {
            if (error.response && error.response.status === 410) {
                    EventBus.dispatch("logout");};
            if (error.response && error.response.status === 501) {
                    alert("Ошибка! Что-то пошло не так!");}
          }
          )
          .catch(e => {
            console.log(e);
          });
      },
      
      newReference() {
        this.submitted = false;
        this.reference = {};
      }
    }
  };
  </script>

<style>
.submit-form {
  max-width: 450px;
}
</style>
  
 