import http from '../http-common';
import authHeader from './auth-header';

class DepartmentsDataService{

    get(id){
        return http.get(`/departments/${id}`);
    }

    getAll(){
        return http.get("/departments");
    }

    create(data){
        return http.post('/departments', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/departments/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/departments/${id}`, { headers: authHeader() });
    }
};

export default new DepartmentsDataService();