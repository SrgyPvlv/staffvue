import http from '../http-common';

class FunctionGroupsDataService{

    get(id){
        return http.get(`/function-groups/${id}`);
    }

    getAll(){
        return http.get("/function-groups");
    }

    create(data){
        return http.post('/function-groups', data);
    }

    update(id, data){
        return http.put(`/function-groups/${id}`, data);
    }

    delete(id){
        return http.delete(`/function-groups/${id}`);
    }
};

export default new FunctionGroupsDataService();