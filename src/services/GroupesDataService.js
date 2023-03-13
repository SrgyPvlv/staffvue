import api from './api';

class GroupesDataService{

    get(id){
        return api.get(`/groupes/${id}`);
    }

    getAll(){
        return api.get("/groupes");
    }

    create(data){
        return api.post('/groupes', data);
    }

    update(id, data){
        return api.put(`/groupes/${id}`, data);
    }

    delete(id){
        return api.delete(`/groupes/${id}`);
    }
};

export default new GroupesDataService();