import {createRouter, createWebHashHistory} from 'vue-router';

const router=createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/', alias:'/employees', name:'employees', component:()=>import("../components/EmployeeList.vue")},
        {path:'/cars', name:'cars', component:()=>import("../components/CarList.vue")},
        {path:'/employees/:id', name:'employee-details', component:()=>import("../components/Employee.vue")},
        {path:'/cars/:id', name:'cars-details', component:()=>import("../components/Car.vue")},
        {path:'/addEmployee', name:'addEmployee', component:()=>import("../components/AddEmployee.vue")},
        {path:'/addCar', name:'addCar', component:()=>import("../components/AddCar.vue")},
        {path: "/profile", name: 'profile',component:()=>import("../components/Profile.vue")},
        {path: "/login", name:'login', component:()=>import("../components/Login.vue")},
        {path: "/register", name:'register', component:()=>import("../components/Register.vue")},
        {path:'/positions', name:'positions', component:()=>import("../components/PositionList.vue")},
        {path:'/departments', name:'departments', component:()=>import("../components/DepartmentList.vue")},
        {path:'/divisions', name:'divisions', component:()=>import("../components/DivisionList.vue")},
        {path:'/groupes', name:'groupes', component:()=>import("../components/GroupeList.vue")},
        {path:'/funcgroupes', name:'funcgroupes', component:()=>import("../components/FunctionGroupList.vue")},
        {path:'/carmodels', name:'carmodels', component:()=>import("../components/CarModelList.vue")},
        {path:'/users', name:'users', component:()=>import("../components/UserList.vue")},
        {path:'/mail', name:'mail', component:()=>import("../components/SendMail.vue")}
    ]
});

export default router;