import http from '../http-common';
import authHeader from './auth-header';

class DivisionsDataService{

    get(id){
        return http.get(`/divisions/${id}`);
    }

    getAll(){
        return http.get("/divisions");
    }

    create(data){
        return http.post('/divisions', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/divisions/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/divisions/${id}`, { headers: authHeader() });
    }
};

export default new DivisionsDataService();