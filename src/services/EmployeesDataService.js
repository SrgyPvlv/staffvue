import http from '../http-common';

class EmployeesDataService{

    get(id){
        return http.get(`/employees/${id}`);
    }

    getAll(){
        return http.get("/employees");
    }

    create(data){
        return http.post('/employees', data);
    }

    update(id, data){
        return http.put(`/employees/${id}`, data);
    }

    delete(id){
        return http.delete(`/employees/${id}`);
    }

    findByNameMobilePosition(filter){
        return http.get(`/employees?filter=${filter}`);
    }
};

export default new EmployeesDataService();