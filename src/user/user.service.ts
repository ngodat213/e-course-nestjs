import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getListUser(){
        return "GET USER";
    }
}
