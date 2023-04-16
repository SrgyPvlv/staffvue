import api from './api';

class EmployeesDataService{

    get(id){
        return api.get(`/employees/${id}`);
    }

    getAll(){
        return api.get("/employees");
    }

    create(data){
        return api.post('/employees', data);
    }

    update(id, data){
        return api.put(`/employees/${id}`, data);
    }

    delete(id){
        return api.delete(`/employees/${id}`);
    }

    findByNameMobilePosition(filter){
        return api.get(`/employees?filter=${filter}`);
    }

    findByFactDivisionOrGroupeOrFunctionGroupOrderByNameAsc(selected){
        return api.get(`/employees/factdepartment?filter=${selected}`);
    }

    findByStaffDivisionOrGroupeOrFunctionGroupOrderByNameAsc(selected){
        return api.get(`/employees/staffdepartment?filter=${selected}`);
    }

    findByFactDepartmentOrPositionIn(checkedDepartments,checkedPositions){
        return api.get(`/employees/factDepartmentOrPosition?filterDepartment=${checkedDepartments}&filterPosition=${checkedPositions}`);
    }    
};

export default new EmployeesDataService();