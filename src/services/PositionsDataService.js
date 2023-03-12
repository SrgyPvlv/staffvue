import http from '../http-common';

class PositionsDataService{

    get(id){
        return http.get(`/positions/${id}`);
    }

    getAll(){
        return http.get("/positions");
    }

    create(data){
        return http.post('/positions', data);
    }

    update(id, data){
        return http.put(`/positions/${id}`, data);
    }

    delete(id){
        return http.delete(`/positions/${id}`);
    }
};

export default new PositionsDataService();