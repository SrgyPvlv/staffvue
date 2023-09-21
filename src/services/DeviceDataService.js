import api from './api';

class DeviceDataService{

    get(id){
        return api.get(`/devices/${id}`);
    }

    getAll(){
        return api.get("/devices");
    }

    create(data){
        return api.post('/devices', data);
    }

    edit(id, data){
        return api.put(`/devices/${id}`, data);
    }

    update(id, data){
        return api.patch(`/devices/${id}`, data);
    }

    delete(id){
        return api.delete(`/devices/${id}`);
    }

    findByNumberTypeNameEmployeeCommentPlace(filter){
        return api.get(`/devices?filter=${filter}`);
    }
};

export default new DeviceDataService();