import api from './api';

class UsersDataService{

    get(id){
        return api.get(`/users/${id}`);
    }

    getAll(){
        return api.get("/users");
    }

    create(data){
        return api.post('/users', data);
    }

    update(id, data){
        return api.put(`/users/${id}`, data);
    }

    delete(id){
        return api.delete(`/users/${id}`);
    }
};

export default new UsersDataService();