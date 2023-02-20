import http from '../http-common';
import authHeader from './auth-header';

class CarsDataService{

    get(id){
        return http.get(`/cars/${id}`);
    }

    getAll(){
        return http.get("/cars");
    }

    create(data){
        return http.post('/cars', data, { headers: authHeader() });
    }

    edit(id, data){
        return http.put(`/cars/${id}`, data, { headers: authHeader() });
    }

    update(id, data){
        return http.patch(`/cars/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/cars/${id}`,{ headers: authHeader() });
    }

    findByNumberModel(filter){
        return http.get(`/cars?filter=${filter}`);
    }
};

export default new CarsDataService();