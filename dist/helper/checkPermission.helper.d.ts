import { User } from 'src/modules/user/user.model';
export declare class Permission {
    static check(id: string, currentUser: User): void;
}
