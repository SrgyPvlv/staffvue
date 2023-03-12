import http from '../http-common';

class CarModelsDataService{

    get(id){
        return http.get(`/carmodels/${id}`);
    }

    getAll(){
        return http.get("/carmodels");
    }

    create(data){
        return http.post('/carmodels', data);
    }

    update(id, data){
        return http.put(`/carmodels/${id}`, data);
    }

    delete(id){
        return http.delete(`/carmodels/${id}`);
    }
};

export default new CarModelsDataService();