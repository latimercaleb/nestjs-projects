import { SetMetadata } from "@nestjs/common";
import { Role } from "./user.model";

export const Roles = (roles: Role) => SetMetadata('roles', roles) // This can be used instead of setMetaData() same functionality