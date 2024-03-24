import api from './api';

class ToolNamesDataService{

    get(id){
        return api.get(`/toolnames/${id}`);
    }

    getAll(){
        return api.get("/toolnames");
    }

    create(data){
        return api.post('/toolnames', data);
    }

    update(id, data){
        return api.put(`/toolnames/${id}`, data);
    }

    delete(id){
        return api.delete(`/toolnames/${id}`);
    }
};

export default new ToolNamesDataService();