<template>   
    <div class="container">
      <div v-if="!submitted">
        <div class="large-12 medium-12 small-12 cell">
          <label for="avatar" class="fw-bold">Выберите фото для загрузки</label>
          <input type="file" class="form-control mt-2" id="avatar" name="avatar" ref="file" accept="image/*" @change="handleFileUpload" />
        </div>

        <img class="mt-3 me-3" v-bind:src="imagePreview" v-show="showPreview"/>
        <button @click="submitFile" class="btn btn-success mt-3">Загрузить фото</button>
      </div>
  
      <div v-else>
        <h4 class="mt-3 text-success">Фото успешно загружено!</h4>
      </div>
    </div>
</template>

<script>
import AvatarsDataService from '../services/AvatarsDataService'

export default{
    name:"avatar",
    data(){
        return{
          file:'',
          showPreview:false,
          imagePreview:'',
          submitted:false
        };
    },
    methods: {
      submitFile(){
            let formData = new FormData();
            formData.append('avatar', this.file);
            AvatarsDataService.create(this.$route.params.id, formData)
            .then(response =>{
          console.log(response.data);
          this.submitted=true;
        })
        .catch(e => {console.log(e);});
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        let reader  = new FileReader();
        reader.addEventListener("load", function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this), false);
        if( this.file ){
          if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            reader.readAsDataURL( this.file );
          }
        }
      }
    }
}

</script>

<style>
div.container img{
    max-width: 300px;
    max-height: 300px;
  }
div.container input{
  width: 500px;
}  
</style>