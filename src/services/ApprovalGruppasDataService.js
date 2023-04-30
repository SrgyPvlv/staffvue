import api from './api';

class ApprovalGruppasDataService{

    get(id){
        return api.get(`/approvalgruppas/${id}`);
    }

    getAll(){
        return api.get("/approvalgruppas");
    }

    create(data){
        return api.post('/approvalgruppas', data);
    }

    update(id, data){
        return api.put(`/approvalgruppas/${id}`, data);
    }

    delete(id){
        return api.delete(`/approvalgruppas/${id}`);
    }
};

export default new ApprovalGruppasDataService();