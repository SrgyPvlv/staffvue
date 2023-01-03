import {createRouter, createWebHistory} from 'vue-router';

const router=createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', alias:'/employees', name:'employees', component:()=>import("../components/EmployeeList.vue")},
        {path:'/cars', name:'cars', component:()=>import("../components/CarList.vue")},
        {path:'/employees/:id', name:'employee-details', component:()=>import("../components/Employee.vue")},
        {path:'/cars/:id', name:'cars-details', component:()=>import("../components/Car.vue")},
        {path:'/addEmployee', name:'addEmployee', component:()=>import("../components/AddEmployee.vue")},
        {path:'/addCar', name:'addCar', component:()=>import("../components/AddCar.vue")}
    ]
});

export default router;