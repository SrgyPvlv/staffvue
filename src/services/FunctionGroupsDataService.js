import http from '../http-common';
import authHeader from './auth-header';

class FunctionGroupsDataService{

    get(id){
        return http.get(`/function-groups/${id}`);
    }

    getAll(){
        return http.get("/function-groups");
    }

    create(data){
        return http.post('/function-groups', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/function-groups/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/function-groups/${id}`, { headers: authHeader() });
    }
};

export default new FunctionGroupsDataService();