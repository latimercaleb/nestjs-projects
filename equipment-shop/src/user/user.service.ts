import {Injectable, NotFoundException} from '@nestjs/common'
import {User} from './user.model'

@Injectable()
export class UserService {
  private users: User[] = []
  constructor() {
    this.users.push({
      key: 'X01AG-401',
      user: 'Exia',
      id: 1,
      email: 'X@X.com'
    })
    this.users.push({
      key: 'X02AG-402',
      user: 'Legna',
      id: 2,
      email: 'y@y.com'
    })
    this.users.push({
      key: 'X03AG-403',
      user: 'Zeztz',
      id: 3,
      email: 'z@z.com'
    })
    this.users.push({
      key: 'X04AG-404',
      user: 'Bisha',
      id: 4,
      email: 'a@a.com'
    })
    this.users.push({
      key: 'X05AG-405',
      user: 'Geo',
      id: 5,
      email: 'b@b.com'
    })
  }
  getUsers(): User[] {
    return this.users
  }
  getUserKey(id: number): string | NotFoundException {
    const user = this.getUserById(id)
    if (!user) throw new NotFoundException('Invalid User ID, Key not found')
    else {
      return user.key
    }
  }
  getUserName(id: number): string | NotFoundException {
    const user = this.getUserById(id)
    if (!user) throw new NotFoundException('Invalid User ID, Name not found')
    else {
      return user.user
    }
  }
  getUserEmail(key: string): string | NotFoundException {
    const user = this.users.find((x) => x.key === key)
    if (!user) throw new NotFoundException('Invalid User ID, email not found')
    else {
      return user.email
    }
  }

  private getUserById(id: number): User | undefined {
    return this.users.find((x) => x.id == id)
  }
}
