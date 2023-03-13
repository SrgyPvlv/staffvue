import api from './api';

class CarModelsDataService{

    get(id){
        return api.get(`/carmodels/${id}`);
    }

    getAll(){
        return api.get("/carmodels");
    }

    create(data){
        return api.post('/carmodels', data);
    }

    update(id, data){
        return api.put(`/carmodels/${id}`, data);
    }

    delete(id){
        return api.delete(`/carmodels/${id}`);
    }
};

export default new CarModelsDataService();