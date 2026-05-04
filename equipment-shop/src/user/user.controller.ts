import {Controller, Get, Req, SetMetadata, UseGuards} from '@nestjs/common'
import {UserService} from './user.service'
import {AuthGuard} from '../guards/auth.guard'
import { RoleGuard } from '../guards/role.guard'
import { Roles } from './role.decorator'
import { Role } from './user.model'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  readUsers() {
    console.log('Test')
    return this.userService.getUsers()
  }

  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard) // Can use multiple guards
  @SetMetadata('roles', ['admin'])
  // @Roles(Role.ADMIN)
  getAuthorizedUser(@Req() req:any) {
    const auth = req.key
    const email = this.userService.getUserEmail(auth)
    return {auth, email}
  }
}
