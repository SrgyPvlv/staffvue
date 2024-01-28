import {createRouter, createWebHashHistory} from 'vue-router';

const router=createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/', alias:'/employees', name:'employees', component:()=>import("../components/EmployeeList.vue")},
        {path:'/cars', name:'cars', component:()=>import("../components/CarList.vue")},
        {path:'/devices', name:'devices', component:()=>import("../components/DeviceList.vue")},
        {path:'/tools', name:'tools', component:()=>import("../components/ToolList.vue")},
        {path:'/employees/:id', name:'employee-details', component:()=>import("../components/Employee.vue")},
        {path:'/cars/:id', name:'cars-details', component:()=>import("../components/Car.vue")},
        {path:'/devices/:id', name:'devices-details', component:()=>import("../components/Device.vue")},
        {path:'/tools/:id', name:'tools-details', component:()=>import("../components/Tool.vue")},
        {path:'/addEmployee', name:'addEmployee', component:()=>import("../components/AddEmployee.vue")},
        {path:'/addCar', name:'addCar', component:()=>import("../components/AddCar.vue")},
        {path:'/addDevice', name:'addDevice', component:()=>import("../components/AddDevice.vue")},
        {path:'/addTool', name:'addTool', component:()=>import("../components/AddTool.vue")},
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
        {path:'/mail', name:'mail', component:()=>import("../components/SendMail.vue")},
        {path:'/references', name:'references', component:()=>import("../components/ReferenceList.vue")},
        {path:'/references/:id', name:'references-details', component:()=>import("../components/Reference.vue")},
        {path:'/addReference', name:'addReference', component:()=>import("../components/AddReference.vue")},
        {path:'/sertificatenames', name:'sertificatenames', component:()=>import("../components/SertificateNameList.vue")},
        {path:'/approvalgruppas', name:'approvalgruppas', component:()=>import("../components/ApprovalGruppaList.vue")},
        {path:'/sertificates/:id', name:'sertificate-details', component:()=>import("../components/Sertificate.vue")},
        {path:'/devicetypes', name:'devicetypes', component:()=>import("../components/DeviceTypeList.vue")},
        {path:'/devicenames', name:'devicenames', component:()=>import("../components/DeviceNameList.vue")},
        {path:'/tooltypes', name:'tooltypes', component:()=>import("../components/ToolTypeList.vue")},
        {path:'/toolnames', name:'toolnames', component:()=>import("../components/ToolNameList.vue")}      
    ]
});

export default router;