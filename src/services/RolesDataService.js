import api from './api';

class RolesDataService{

    getAll(){
        return api.get("/roles");
    }

};

export default new RolesDataService();