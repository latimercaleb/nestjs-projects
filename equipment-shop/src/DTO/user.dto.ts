import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class UserDTO {
    constructor(name: string, password: string, createdAt: string) {
        this.name = name
        this.password = password
        this.createdAt = createdAt
    }
    @IsString()
    @IsNotEmpty({message: 'Username is required'})
    @MaxLength(20, {message: 'Username must be less than 20 characters'})
    name: string

    @IsAlphanumeric()
    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    readonly password: string

    createdAt?: string
}