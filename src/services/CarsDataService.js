import http from '../http-common';

class CarsDataService{

    get(id){
        return http.get(`/cars/${id}`);
    }

    getAll(){
        return http.get("/cars");
    }

    create(data){
        return http.post('/cars', data);
    }

    update(id, data){
        return http.put(`/cars/${id}`, data);
    }

    delete(id){
        return http.delete(`/cars/${id}`);
    }
};

export default new CarsDataService();