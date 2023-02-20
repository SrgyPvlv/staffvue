import http from '../http-common';
import authHeader from './auth-header';

class CarModelsDataService{

    get(id){
        return http.get(`/carmodels/${id}`);
    }

    getAll(){
        return http.get("/carmodels");
    }

    create(data){
        return http.post('/carmodels', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/carmodels/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/carmodels/${id}`, { headers: authHeader() });
    }
};

export default new CarModelsDataService();