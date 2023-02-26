import http from '../http-common';
import authHeader from './auth-header';

class GroupesDataService{

    get(id){
        return http.get(`/groupes/${id}`);
    }

    getAll(){
        return http.get("/groupes");
    }

    create(data){
        return http.post('/groupes', data, { headers: authHeader() });
    }

    update(id, data){
        return http.put(`/groupes/${id}`, data, { headers: authHeader() });
    }

    delete(id){
        return http.delete(`/groupes/${id}`, { headers: authHeader() });
    }
};

export default new GroupesDataService();