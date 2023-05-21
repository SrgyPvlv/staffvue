import api from './api';

class DivisionsDataService{

    get(id){
        return api.get(`/divisions/${id}`);
    }

    getAll(){
        return api.get("/divisions");
    }

    create(data){
        return api.post('/divisions', data);
    }

    update(id, data){
        return api.put(`/divisions/${id}`, data);
    }

    delete(id){
        return api.delete(`/divisions/${id}`);
    }
};

export default new DivisionsDataService();