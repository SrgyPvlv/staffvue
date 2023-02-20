import http from '../http-common';
import authHeader from './auth-header';

class EmployeesDataService{

    get(id){
        return http.get(`/employees/${id}`);
    }

    getAll(){
        return http.get("/employees");
    }

    create(data){
        return http.post('/employees', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/employees/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/employees/${id}`, { headers: authHeader() });
    }

    findByNameMobilePosition(filter){
        return http.get(`/employees?filter=${filter}`);
    }

    findByFactDivisionOrGroupeOrFunctionGroupOrderByNameAsc(selected){
        return http.get(`/employees/factdepartment?filter=${selected}`);
    }

    findByStaffDivisionOrGroupeOrFunctionGroupOrderByNameAsc(selected){
        return http.get(`/employees/staffdepartment?filter=${selected}`);
    }
};

export default new EmployeesDataService();