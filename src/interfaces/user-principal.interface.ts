import { RoleType } from "src/shared/enum/role.type.enum";

export interface UserPrincipal {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly photoUrl: string;
  readonly roles: RoleType[];
}