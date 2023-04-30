import api from './api';

class SertificateNamesDataService{

    get(id){
        return api.get(`/sertificatenames/${id}`);
    }

    getAll(){
        return api.get("/sertificatenames");
    }

    create(data){
        return api.post('/sertificatenames', data);
    }

    update(id, data){
        return api.put(`/sertificatenames/${id}`, data);
    }

    delete(id){
        return api.delete(`/sertificatenames/${id}`);
    }
};

export default new SertificateNamesDataService();