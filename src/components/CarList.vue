<template>
    <div class="list row">
        <div class="col-md-6">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Поиск по номеру, модели" v-model="filter" />
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-secondary" @click="findByNumberModel">Поиск</button>
                </div>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
            </div>
        </div>
    </div>
    <div class="list row">
        <div class="col-md-4">
        <h3> Список автомобилей </h3>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item car" 
                :class="{ active: index == currentIndex }"
                v-for="(car, index) in cars"
                :key="index"
                @click="setActiveCar(car,index)">
                {{ car.carNumber }}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-8">
            <div v-if="currentCar">
                <h3> Автомобиль </h3>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentCar.carNumber }}
                </div>
                <div>
                    <label><strong>Модель:</strong></label> {{ currentCar.carModel!=null?currentCar.carModel.carModel:'' }}
                </div>
                <div>
                    <label><strong>Водитель:</strong></label> {{ currentCar.employee!=null?currentCar.employee.name+', '+currentCar.employee.mobilePhone:'' }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentCar.carComment }}
                </div>
                

                <RouterLink :to="'/cars/'+currentCar.id" class="badge rounded-pill bg-info edit" style="margin-top:15px">Редактировать</RouterLink>

            </div>
            <div v-else>
                <br>
                <p>"Нажмите" на машину...</p>
            </div>

        </div>

    </div>
</template>

<script>
import CarsDataService from '../services/CarsDataService'

export default{
    name: "cars-list",
    data(){
        return{
            cars:[],
            currentCar:null,
            currentIndex:-1,
            filter:""
        };
    },
    methods:{
        retrieveCars(){
            CarsDataService.getAll().
            then(response=>{
                this.cars=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        refreshList(){
            this.retrieveCars();
            this.currentCar = null;
            this.currentIndex = -1;
            this.filter=""
        },
        setActiveCar(car,index){
            this.currentCar = car;
            this.currentIndex = car ? index : -1;
        }, 
        findByNumberModel(){
            CarsDataService.findByNumberModel(this.filter).
            then(response=>{
                this.cars=response.data;
                this.currentCar = null;
                this.currentIndex = -1;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }      
    },
    mounted(){
            this.retrieveCars();
        }
};
</script>

<style>
.edit{
    margin-top: 10px;
    text-decoration: none
}
.car{
    cursor: pointer
}
.outdiv{
    overflow-y: auto;
    overflow-x: hidden;
    height: 500px;
    position: relative;
}
.indiv{
    position: absolute   
}
.outdiv::-webkit-scrollbar{
    display: none
}
</style>
