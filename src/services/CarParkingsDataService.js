import api from './api';

class CarParkingsDataService{

    get(id){
        return api.get(`/carparkings/${id}`);
    }

    getAll(){
        return api.get("/carparkings");
    }

    create(data){
        return api.post('/carparkings', data);
    }

    update(id, data){
        return api.put(`/carparkings/${id}`, data);
    }

    delete(id){
        return api.delete(`/carparkings/${id}`);
    }
};

export default new CarParkingsDataService();