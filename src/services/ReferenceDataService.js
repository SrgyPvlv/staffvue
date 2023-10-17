import api from './api';

class ReferenceDataService{

    get(id){
        return api.get(`/references/${id}`);
    }

    getAll(){
        return api.get("/references");
    }

    create(data){
        return api.post('/references', data);
    }

    update(id, data){
        return api.put(`/references/${id}`, data);
    }

    delete(id){
        return api.delete(`/references/${id}`);
    }
};

export default new ReferenceDataService();