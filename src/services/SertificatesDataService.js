import api from './api';

class SertificatesDataService{

    get(id){
        return api.get(`/sertificates/${id}`);
    }

    getAll(){
        return api.get("/sertificates");
    }

    getByEmployeeId(id){
        return api.get(`/sertificates/employeesid/${id}`);
    }

    create(data){
        return api.post('/sertificates', data);
    }

    update(id, data){
        return api.put(`/sertificates/${id}`, data);
    }

    delete(id){
        return api.delete(`/sertificates/${id}`);
    }
};

export default new SertificatesDataService();