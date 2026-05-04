import {Injectable} from '@nestjs/common'

@Injectable()
export class UserService {
  private users: string[] = ['Exia', 'Legna', 'Zeztz']

  getUsers(): string[] {
    return this.users
  }
}
