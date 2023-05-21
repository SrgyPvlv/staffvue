import api from './api';

class DepartmentsDataService{

    get(id){
        return api.get(`/departments/${id}`);
    }

    getAll(){
        return api.get("/departments");
    }

    create(data){
        return api.post('/departments', data);
    }

    update(id, data){
        return api.put(`/departments/${id}`, data);
    }

    delete(id){
        return api.delete(`/departments/${id}`);
    }
};

export default new DepartmentsDataService();