import {Controller, Get, Req, UseGuards} from '@nestjs/common'
import {UserService} from './user.service'
import {AuthGuard} from '../guards/auth.guard'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  readUsers() {
    console.log('Test')
    return this.userService.getUsers()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getAuthorizedUser(@Req() req:any) {
    const auth = req.key
    const email = this.userService.getUserEmail(auth)
    return {auth, email}
  }
}
