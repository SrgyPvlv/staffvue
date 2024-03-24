import api from './api';

class ToolTypesDataService{

    get(id){
        return api.get(`/tooltypes/${id}`);
    }

    getAll(){
        return api.get("/tooltypes");
    }

    create(data){
        return api.post('/tooltypes', data);
    }

    update(id, data){
        return api.put(`/tooltypes/${id}`, data);
    }

    delete(id){
        return api.delete(`/tooltypes/${id}`);
    }
};

export default new ToolTypesDataService();