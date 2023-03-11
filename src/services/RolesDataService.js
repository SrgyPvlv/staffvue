import http from '../http-common'

class RolesDataService{

    getAll(){
        return http.get("/roles");
    }

};

export default new RolesDataService();