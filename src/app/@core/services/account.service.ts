import { RestfulService } from "./restful.service";



export class AccountService extends RestfulService {





    public async login(password: string): Promise<void> {
        this.get(`/api/login/${password}`);
    }






}