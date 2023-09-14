import api from './api';

class DeviceTypesDataService{

    get(id){
        return api.get(`/devicetypes/${id}`);
    }

    getAll(){
        return api.get("/devicetypes");
    }

    create(data){
        return api.post('/devicetypes', data);
    }

    update(id, data){
        return api.put(`/devicetypes/${id}`, data);
    }

    delete(id){
        return api.delete(`/devicetypes/${id}`);
    }
};

export default new DeviceTypesDataService();