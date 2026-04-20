import {Injectable} from '@nestjs/common'
import {UserDTO} from './DTO/user.dto'

@Injectable()
export class AppService {
  private users: UserDTO[] = []

  createUser(user: UserDTO) {
    this.users.push(user)
    return user
  }

  getAllUsers() {
    return this.users
  }

  getHello(): string {
    console.log('heat')
    return 'Hello World!'
  }
}
