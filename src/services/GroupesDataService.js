import http from '../http-common';

class GroupesDataService{

    get(id){
        return http.get(`/groupes/${id}`);
    }

    getAll(){
        return http.get("/groupes");
    }

    create(data){
        return http.post('/groupes', data);
    }

    update(id, data){
        return http.put(`/groupes/${id}`, data);
    }

    delete(id){
        return http.delete(`/groupes/${id}`);
    }
};

export default new GroupesDataService();