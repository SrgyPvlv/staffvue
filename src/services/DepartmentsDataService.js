import http from '../http-common';

class DepartmentsDataService{

    get(id){
        return http.get(`/departments/${id}`);
    }

    getAll(){
        return http.get("/departments");
    }

    create(data){
        return http.post('/departments', data);
    }

    update(id, data){
        return http.put(`/departments/${id}`, data);
    }

    delete(id){
        return http.delete(`/departments/${id}`);
    }
};

export default new DepartmentsDataService();