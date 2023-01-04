<template>
    <div class="list row">
        <div class="col-md-6">
            <h3> Список автомобилей </h3>
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item" 
                :class="{ active: index == currentIndex }"
                v-for="(car, index) in cars"
                :key="index"
                @click="setActiveCar(car,index)">
                {{ car.carNumber }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentCar">
                <h3> Автомобиль </h3>
                <div>
                    <label><strong>Номер:</strong></label> {{ currentCar.carNumber }}
                </div>
                <div>
                    <label><strong>Модель:</strong></label> {{ currentCar.carModel.carModel }}
                </div>
                <div>
                    <label><strong>Водитель:</strong></label> {{ currentCar.employee.name }}
                </div>
                <div>
                    <label><strong>Комментарий:</strong></label> {{ currentCar.carComment }}
                </div>
                

                <RouterLink :to="'/cars/'+currentCar.id" class="badge rounded-pill bg-info">Редактировать</RouterLink>

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
            currentIndex:-1
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
            this.retrieveCar();
            this.currentCar = null;
            this.currentIndex = -1;
        },
        setActiveCar(car,index){
            this.currentCar = car;
            this.currentIndex = car ? index : -1;
        }       
    },
    mounted(){
            this.retrieveCars();
        }
};
</script>
