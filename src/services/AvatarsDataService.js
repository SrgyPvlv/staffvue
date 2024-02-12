import api from './api';

class AvatarsDataService{

    /* get(id){
        return api.get(`/cars/${id}`);
    }

    getAll(){
        return api.get("/cars");
    }

    create(data){
        return api.post('/cars', data);
    } */

    create(id, data){
        return api.post(`/avatars/${id}`, data, {headers:{'Content-Type': 'multipart/form-data'}});
    }

    /* update(id, data){
        return api.patch(`/cars/${id}`, data);
    }

    delete(id){
        return api.delete(`/cars/${id}`);
    }

    findByNumberModel(filter){
        return api.get(`/cars?filter=${filter}`);
    } */
};

export default new AvatarsDataService();