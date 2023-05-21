import api from './api';

class FunctionGroupsDataService{

    get(id){
        return api.get(`/function-groups/${id}`);
    }

    getAll(){
        return api.get("/function-groups");
    }

    create(data){
        return api.post('/function-groups', data);
    }

    update(id, data){
        return api.put(`/function-groups/${id}`, data);
    }

    delete(id){
        return api.delete(`/function-groups/${id}`);
    }
};

export default new FunctionGroupsDataService();