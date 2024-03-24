import api from './api';

class WardrobesDataService{

    get(id){
        return api.get(`/wardrobes/${id}`);
    }

    getAll(){
        return api.get("/wardrobes");
    }

    getByEmployeeId(id){
        return api.get(`/wardrobes/employeesid/${id}`);
    }

    create(data){
        return api.post('/wardrobes', data);
    }

    edit(id, data){
        return api.put(`/wardrobes/${id}`, data);
    }

    update(id, data){
        return api.patch(`/wardrobes/${id}`, data);
    }

    delete(id){
        return api.delete(`/wardrobes/${id}`);
    }

    findByNumberEmployeeRoom(filter){
        return api.get(`/wardrobes?filter=${filter}`);
    }
};

export default new WardrobesDataService();