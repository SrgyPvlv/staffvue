import api from './api';

class AvatarsDataService{

    create(id, data){
        return api.post(`/avatars/${id}`, data, {headers:{'Content-Type': 'multipart/form-data'}});
    }

};

export default new AvatarsDataService();