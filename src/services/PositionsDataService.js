import http from '../http-common';
import authHeader from './auth-header';

class PositionsDataService{

    get(id){
        return http.get(`/positions/${id}`);
    }

    getAll(){
        return http.get("/positions");
    }

    create(data){
        return http.post('/positions', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/positions/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/positions/${id}`, { headers: authHeader() });
    }
};

export default new PositionsDataService();