import api from './api';

class ToolDataService{

    get(id){
        return api.get(`/tools/${id}`);
    }

    getAll(){
        return api.get("/tools");
    }

    getByEmployeeId(id){
        return api.get(`/tools/employeesid/${id}`);
    }

    create(data){
        return api.post('/tools', data);
    }

    edit(id, data){
        return api.put(`/tools/${id}`, data);
    }

    update(id, data){
        return api.patch(`/tools/${id}`, data);
    }

    delete(id){
        return api.delete(`/tools/${id}`);
    }

    findByNumberTypeNameEmployeeCommentPlace(filter){
        return api.get(`/tools?filter=${filter}`);
    }
};

export default new ToolDataService();