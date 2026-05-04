import {Controller, Get, UseGuards} from '@nestjs/common'
import {UserService} from './user.service'
import {AuthGuard} from '../guards/auth.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  @UseGuards(AuthGuard)
  readUsers() {
    return this.userService.getUsers()
  }
}
