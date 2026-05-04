export interface User {
  key: string
  user: string
  id: number
  email: string
}

export enum Role {
    USER = 'user',
    ADMIN =  'admin'
}
