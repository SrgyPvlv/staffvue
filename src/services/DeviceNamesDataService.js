import api from './api';

class DeviceNamesDataService{

    get(id){
        return api.get(`/devicenames/${id}`);
    }

    getAll(){
        return api.get("/devicenames");
    }

    create(data){
        return api.post('/devicenames', data);
    }

    update(id, data){
        return api.put(`/devicenames/${id}`, data);
    }

    delete(id){
        return api.delete(`/devicenames/${id}`);
    }
};

export default new DeviceNamesDataService();