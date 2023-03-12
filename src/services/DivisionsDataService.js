import http from '../http-common';

class DivisionsDataService{

    get(id){
        return http.get(`/divisions/${id}`);
    }

    getAll(){
        return http.get("/divisions");
    }

    create(data){
        return http.post('/divisions', data);
    }

    update(id, data){
        return http.put(`/divisions/${id}`, data);
    }

    delete(id){
        return http.delete(`/divisions/${id}`);
    }
};

export default new DivisionsDataService();