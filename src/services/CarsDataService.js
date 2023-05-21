import api from './api';

class CarsDataService{

    get(id){
        return api.get(`/cars/${id}`);
    }

    getAll(){
        return api.get("/cars");
    }

    create(data){
        return api.post('/cars', data);
    }

    edit(id, data){
        return api.put(`/cars/${id}`, data);
    }

    update(id, data){
        return api.patch(`/cars/${id}`, data);
    }

    delete(id){
        return api.delete(`/cars/${id}`);
    }

    findByNumberModel(filter){
        return api.get(`/cars?filter=${filter}`);
    }
};

export default new CarsDataService();